import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';

import { SignUpSchema } from '@/schemas/auth';
import { createUser, getUserByEmail } from '@/server/data/users';

import { createTRPCRouter, publicProcedure } from '../trpc';

const signUp = publicProcedure
  .input(SignUpSchema)
  .mutation(async ({ input }) => {
    const validatedFields = SignUpSchema.safeParse(input);

    if (!validatedFields.success) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Failed to validate input',
      });
    }

    const { email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);
    if (existingUser.isErr()) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred. Try again later',
      });
    }

    if (existingUser.value) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Invalid email or already taken',
      });
    }

    const createdUser = await createUser(email, hashedPassword);
    if (createdUser.isErr()) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred. Try again later',
      });
    }

    return createdUser.value;
  });

export const authRouter = createTRPCRouter({
  signUp: signUp,
});
