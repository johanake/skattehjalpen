import { TRPCError } from '@trpc/server';
import type { AuthContext } from '../types/index.js';

export const createAuthMiddleware = () => {
  return async (): Promise<AuthContext> => {
    // This is where you'd implement JWT validation, session checks, etc.
    // For now, returning a mock context
    return {
      isAuthenticated: false,
      user: undefined,
    };
  };
};

export const requireAuth = (ctx: AuthContext) => {
  if (!ctx.isAuthenticated || !ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Authentication required',
    });
  }
  return ctx;
};