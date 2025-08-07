export interface User {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

import { Request, Response } from 'express';

export interface AuthContext {
  user?: User;
  isAuthenticated: boolean;
  req?: Request;
  res?: Response;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}