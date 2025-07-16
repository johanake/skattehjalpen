import { userService } from '../services/userService';
import { createUserSchema, getUserSchema } from '../validators/userValidators';
import { publicProcedure, protectedProcedure } from '../trpc';

export const userController = {
  getUsers: publicProcedure
    .query(async () => {
      return await userService.getUsers();
    }),

  getUserById: publicProcedure
    .input(getUserSchema)
    .query(async ({ input }) => {
      return await userService.getUserById(input.id);
    }),

  createUser: protectedProcedure
    .input(createUserSchema)
    .mutation(async ({ input }) => {
      return await userService.createUser(input);
    }),
};