import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().email('Username must be a valid email address').max(255),
});

export const getUserSchema = z.object({
  id: z.string(),
});

export const updateUserSchema = z.object({
  id: z.string(),
  username: z.string().email('Username must be a valid email address').max(255).optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type GetUserInput = z.infer<typeof getUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;