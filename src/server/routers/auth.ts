import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';

import { SignUpSchema } from '@/schemas/auth';

import { createTRPCRouter, publicProcedure } from '../trpc';

const signUp = publicProcedure
  .input(SignUpSchema)
  .mutation(async ({ ctx, input }) => {
    const validatedFields = SignUpSchema.safeParse(input);

    if (!validatedFields.success) {
      throw new TRPCError({ code: 'BAD_REQUEST' });
    }

    const { email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await ctx.db.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new TRPCError({ code: 'BAD_REQUEST' });
    }

    return await ctx.db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  });

export const authRouter = createTRPCRouter({
  signUp: signUp,
});
