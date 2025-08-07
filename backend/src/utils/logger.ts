import winston from 'winston';
import { env } from '../config/env.js';

const isProduction = env.NODE_ENV === 'production';
const isDevelopment = env.NODE_ENV === 'development';

const logger = winston.createLogger({
  level: isDevelopment ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    // Only colorize in development, use JSON in production for better Railway log parsing
    isProduction 
      ? winston.format.json()
      : winston.format.combine(
          winston.format.colorize({ all: true }),
          winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
            const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
            const stackStr = stack ? `\n${stack}` : '';
            return `${timestamp} [${level}]: ${message}${stackStr}${metaStr ? `\n${metaStr}` : ''}`;
          })
        )
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error']
    })
  ],
});

// Railway captures stdout/stderr automatically - no need for file logging

export { logger };