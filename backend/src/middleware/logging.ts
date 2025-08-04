import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';

export interface LoggingRequest extends Request {
  startTime?: number;
}

export const requestLoggingMiddleware = (req: LoggingRequest, res: Response, next: NextFunction) => {
  req.startTime = Date.now();
  
  const { method, originalUrl, ip } = req;
  const userAgent = req.get('User-Agent');
  
  logger.info('Incoming request', {
    method,
    url: originalUrl,
    ip,
    userAgent,
    timestamp: new Date().toISOString()
  });

  const originalSend = res.send;
  res.send = function(body) {
    const responseTime = req.startTime ? Date.now() - req.startTime : 0;
    
    logger.info('Request completed', {
      method,
      url: originalUrl,
      statusCode: res.statusCode,
      responseTimeMs: responseTime,
      ip,
      contentLength: res.get('Content-Length') || body?.length || 0
    });
    
    return originalSend.call(this, body);
  };

  next();
};

export const errorLoggingMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Request error', {
    error: error.message,
    stack: error.stack,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    body: req.body,
    params: req.params,
    query: req.query
  });
  
  next(error);
};