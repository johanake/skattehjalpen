import { publicProcedure, protectedProcedure } from "../trpc.js";
import { Visit } from "../models/Visit.js";
import { Event } from "../models/Event.js";
import { env } from "../config/env.js";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const logVisitSchema = z.object({
  pagePath: z.string(),
  referrer: z.string().optional(),
  sessionId: z.string().optional(),
});

const logEventSchema = z.object({
  eventType: z.enum([
    'button_click',
    'form_start',
    'form_step',
    'form_complete',
    'form_abandon',
    'page_interaction',
    'download',
    'external_link'
  ]),
  eventCategory: z.enum([
    'navigation',
    'tax_declaration',
    'authentication',
    'payment',
    'general'
  ]),
  eventData: z.record(z.any()).optional(),
  pagePath: z.string(),
  sessionId: z.string().optional(),
});

const getAnalyticsSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  adminKey: z.string(),
});

export const analyticsController = {
  // Log page visits
  logVisit: publicProcedure
    .input(logVisitSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const ipAddress = ctx.req?.ip || 
                         ctx.req?.socket?.remoteAddress || 
                         ctx.req?.connection?.remoteAddress || 
                         'unknown';
        const userAgent = ctx.req?.get('User-Agent') || 'unknown';
        
        // Hash IP for privacy
        const ipHash = (Visit as any).hashIp(ipAddress);
        
        const visit = new Visit({
          ipHash,
          userAgent,
          pagePath: input.pagePath,
          referrer: input.referrer,
          sessionId: input.sessionId,
        });
        
        await visit.save();
        
        return { success: true };
      } catch (error) {
        console.error('Error logging visit:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to log visit',
        });
      }
    }),

  // Log user events
  logEvent: publicProcedure
    .input(logEventSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const ipAddress = ctx.req?.ip || 
                         ctx.req?.socket?.remoteAddress || 
                         ctx.req?.connection?.remoteAddress || 
                         'unknown';
        const userAgent = ctx.req?.get('User-Agent') || 'unknown';
        
        // Hash IP for privacy
        const ipHash = (Event as any).hashIp(ipAddress);
        
        const event = new Event({
          ipHash,
          sessionId: input.sessionId,
          eventType: input.eventType,
          eventCategory: input.eventCategory,
          eventData: input.eventData || {},
          pagePath: input.pagePath,
          userAgent,
        });
        
        await event.save();
        
        return { success: true };
      } catch (error) {
        console.error('Error logging event:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to log event',
        });
      }
    }),

  // Get analytics data (admin only)
  getAnalytics: publicProcedure
    .input(getAnalyticsSchema)
    .query(async ({ input }) => {
      try {
        // Simple admin key check (you should use proper authentication)
        if (input.adminKey !== env.ADMIN_ANALYTICS_KEY) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Invalid admin key',
          });
        }

        const startDate = input.startDate ? new Date(input.startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
        const endDate = input.endDate ? new Date(input.endDate) : new Date();

        // Get visit statistics
        const totalVisits = await Visit.countDocuments({
          timestamp: { $gte: startDate, $lte: endDate }
        });

        const uniqueVisitors = await Visit.distinct('ipHash', {
          timestamp: { $gte: startDate, $lte: endDate }
        });

        const pageViews = await Visit.aggregate([
          { $match: { timestamp: { $gte: startDate, $lte: endDate } } },
          { $group: { _id: '$pagePath', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 10 }
        ]);

        // Get event statistics
        const buttonClicks = await Event.countDocuments({
          timestamp: { $gte: startDate, $lte: endDate },
          eventType: 'button_click'
        });

        const taxFormStarts = await Event.countDocuments({
          timestamp: { $gte: startDate, $lte: endDate },
          eventType: 'form_start',
          eventCategory: 'tax_declaration'
        });

        const taxFormCompletes = await Event.countDocuments({
          timestamp: { $gte: startDate, $lte: endDate },
          eventType: 'form_complete',
          eventCategory: 'tax_declaration'
        });

        // Get main page visits
        const mainPageVisits = await Visit.countDocuments({
          timestamp: { $gte: startDate, $lte: endDate },
          pagePath: '/'
        });

        // Recent activity
        const recentVisits = await Visit.find({
          timestamp: { $gte: startDate, $lte: endDate }
        })
        .sort({ timestamp: -1 })
        .limit(50)
        .select('pagePath timestamp')
        .lean();

        const recentEvents = await Event.find({
          timestamp: { $gte: startDate, $lte: endDate }
        })
        .sort({ timestamp: -1 })
        .limit(50)
        .select('eventType eventCategory pagePath timestamp eventData')
        .lean();

        return {
          summary: {
            totalVisits,
            uniqueVisitors: uniqueVisitors.length,
            pageViews: pageViews.map(pv => ({ page: pv._id, views: pv.count })),
            buttonClicks,
            taxFormStarts,
            taxFormCompletes,
            mainPageVisits,
          },
          conversions: {
            mainPageToButton: mainPageVisits > 0 ? ((buttonClicks / mainPageVisits) * 100).toFixed(2) : '0',
            buttonToFormStart: buttonClicks > 0 ? ((taxFormStarts / buttonClicks) * 100).toFixed(2) : '0',
            formStartToComplete: taxFormStarts > 0 ? ((taxFormCompletes / taxFormStarts) * 100).toFixed(2) : '0',
          },
          recentActivity: {
            visits: recentVisits,
            events: recentEvents,
          },
        };
      } catch (error) {
        console.error('Error getting analytics:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to get analytics data',
        });
      }
    }),
};