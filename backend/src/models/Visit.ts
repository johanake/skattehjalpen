import mongoose, { Document, Schema } from 'mongoose';
import crypto from 'crypto';
import { env } from '../config/env.js';

export interface IVisit extends Document {
  ipHash: string;
  userAgent: string;
  pagePath: string;
  referrer?: string;
  timestamp: Date;
  sessionId?: string;
}

const visitSchema = new Schema<IVisit>(
  {
    ipHash: {
      type: String,
      required: true,
      index: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    pagePath: {
      type: String,
      required: true,
      index: true,
    },
    referrer: {
      type: String,
      default: null,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
    sessionId: {
      type: String,
      index: true,
    },
  },
  {
    timestamps: false, // Using custom timestamp field
  }
);

// Index for analytics queries
visitSchema.index({ timestamp: -1, pagePath: 1 });
visitSchema.index({ ipHash: 1, timestamp: -1 });

// Static method to hash IP address for privacy
visitSchema.statics.hashIp = function(ip: string): string {
  return crypto.createHash('sha256').update(ip + env.IP_SALT).digest('hex');
};

export const Visit = mongoose.model<IVisit>('Visit', visitSchema);