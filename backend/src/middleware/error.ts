import { TRPCError } from '@trpc/server';

export const handleError = (error: unknown) => {
  console.error('TRPC Error:', error);
  
  if (error instanceof TRPCError) {
    return error;
  }
  
  // Log unexpected errors
  if (process.env.NODE_ENV === 'development') {
    console.error('Unexpected error:', error);
  }
  
  return new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Something went wrong',
  });
};