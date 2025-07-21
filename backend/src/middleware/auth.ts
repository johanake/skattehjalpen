import { TRPCError } from '@trpc/server';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { env } from '../config/env.js';
import type { AuthContext } from '../types/index.js';
import type { Request } from 'express';

export const createAuthMiddleware = () => {
  return async (req?: Request): Promise<AuthContext> => {
    if (!req) {
      return {
        isAuthenticated: false,
        user: undefined,
      };
    }

    try {
      const token = extractTokenFromRequest(req);
      if (!token) {
        return {
          isAuthenticated: false,
          user: undefined,
        };
      }

      if (!env.JWT_SECRET) {
        throw new Error('JWT_SECRET not configured');
      }

      const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string };
      const user = await User.findById(decoded.userId).select('-password');
      
      if (!user) {
        return {
          isAuthenticated: false,
          user: undefined,
        };
      }

      return {
        isAuthenticated: true,
        user: {
          id: (user._id as any).toString(),
          username: user.username,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      };
    } catch (error) {
      return {
        isAuthenticated: false,
        user: undefined,
      };
    }
  };
};

function extractTokenFromRequest(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}

export const requireAuth = (ctx: AuthContext) => {
  if (!ctx.isAuthenticated || !ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Authentication required',
    });
  }
  return ctx;
};