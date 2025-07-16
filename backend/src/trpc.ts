import { initTRPC } from '@trpc/server';
import { createAuthMiddleware, requireAuth } from './middleware/auth';
import type { AuthContext } from './types';

const t = initTRPC.context<AuthContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

// Protected procedure that requires authentication
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  const authCtx = requireAuth(ctx);
  return next({
    ctx: authCtx,
  });
});

// Middleware to add auth context to all procedures
export const authMiddleware = t.middleware(async ({ next }) => {
  const authContext = await createAuthMiddleware()();
  return next({
    ctx: authContext,
  });
});

// Base procedure with auth context
export const baseProcedure = t.procedure.use(authMiddleware);