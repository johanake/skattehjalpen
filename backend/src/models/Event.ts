import mongoose, { Document, Schema } from 'mongoose';
import crypto from 'crypto';
import { env } from '../config/env.js';

export interface IEvent extends Document {
  ipHash: string;
  sessionId?: string;
  eventType: string;
  eventCategory: string;
  eventData?: Record<string, any>;
  pagePath: string;
  userAgent: string;
  timestamp: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    ipHash: {
      type: String,
      required: true,
      index: true,
    },
    sessionId: {
      type: String,
      index: true,
    },
    eventType: {
      type: String,
      required: true,
      enum: [
        'button_click',
        'form_start',
        'form_step',
        'form_complete',
        'form_abandon',
        'page_interaction',
        'download',
        'external_link'
      ],
      index: true,
    },
    eventCategory: {
      type: String,
      required: true,
      enum: [
        'navigation',
        'tax_declaration',
        'authentication',
        'payment',
        'general'
      ],
      index: true,
    },
    eventData: {
      type: Schema.Types.Mixed,
      default: {},
    },
    pagePath: {
      type: String,
      required: true,
      index: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: false, // Using custom timestamp field
  }
);

// Indexes for analytics queries
eventSchema.index({ timestamp: -1, eventType: 1 });
eventSchema.index({ eventCategory: 1, eventType: 1, timestamp: -1 });
eventSchema.index({ ipHash: 1, sessionId: 1, timestamp: -1 });

// Static method to hash IP address for privacy
eventSchema.statics.hashIp = function(ip: string): string {
  return crypto.createHash('sha256').update(ip + env.IP_SALT).digest('hex');
};

export const Event = mongoose.model<IEvent>('Event', eventSchema);