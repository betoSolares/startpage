import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';

import {
  sendResetPasswordInstructionsEmail,
  sendVerificationEmail,
} from '@/lib/emails';
import { decodeToken, encodeToken } from '@/lib/tokens';
import {
  AccountConfirmationSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  SignUpSchema,
} from '@/schemas/auth';
import {
  createUser,
  getUserByEmail,
  resetUserPassword,
  verifyUser,
} from '@/server/data/users';

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
        message:
          'An unexpected error occurred creating the user. Try again later',
      });
    }

    const token = encodeToken('account', createdUser.value.email);
    if (token.isErr()) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'An unexpected error occurred sending the confirmation token. Try again later',
      });
    }

    await sendVerificationEmail(createdUser.value.email, token.value);

    return {
      id: createdUser.value.id,
      email: createdUser.value.email,
    };
  });

const verifyAccount = publicProcedure
  .input(AccountConfirmationSchema)
  .mutation(async ({ input }) => {
    const validatedFields = AccountConfirmationSchema.safeParse(input);
    if (!validatedFields.success) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Failed to validate input',
      });
    }

    const payload = decodeToken(validatedFields.data.token);
    if (payload.isErr()) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'An unexpected error occurred while verifying the account. Try again later',
      });
    }

    if (payload.value.type !== 'account') {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'The token is invalid',
      });
    }

    if (new Date(payload.value.expiration) < new Date()) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'The token has expired',
      });
    }

    const existingUser = await getUserByEmail(payload.value.email);
    if (existingUser.isErr()) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'An unexpected error occurred while verifying the account. Try again later',
      });
    }

    if (!existingUser.value) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'The token is for an invalid email',
      });
    }

    const verifiedUser = await verifyUser(
      existingUser.value.id,
      existingUser.value.email
    );
    if (verifiedUser.isErr()) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'An unexpected error occurred while verifying the account. Try again later',
      });
    }

    return {
      id: verifiedUser.value.id,
      email: verifiedUser.value.email,
    };
  });

const forgotPassword = publicProcedure
  .input(ForgotPasswordSchema)
  .mutation(async ({ input }) => {
    const validatedFields = ForgotPasswordSchema.safeParse(input);
    if (!validatedFields.success) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Failed to validate input',
      });
    }

    const existingUser = await getUserByEmail(validatedFields.data.email);
    if (existingUser.isErr()) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred. Try again later',
      });
    }

    if (!existingUser.value) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Invalid email',
      });
    }

    const token = encodeToken('password', existingUser.value.email);
    if (token.isErr()) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred. Try again later',
      });
    }

    await sendResetPasswordInstructionsEmail(
      existingUser.value.email,
      token.value
    );

    return {
      id: existingUser.value.id,
      email: existingUser.value.email,
    };
  });

const resetPassword = publicProcedure
  .input(ResetPasswordSchema)
  .mutation(async ({ input }) => {
    const validatedFields = ResetPasswordSchema.safeParse(input);
    if (!validatedFields.success) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Failed to validate input',
      });
    }

    const payload = decodeToken(validatedFields.data.token);
    if (payload.isErr()) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred. Try again later',
      });
    }

    if (payload.value.type !== 'password') {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'The token is invalid',
      });
    }

    if (new Date(payload.value.expiration) < new Date()) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'The token has expired',
      });
    }

    const existingUser = await getUserByEmail(payload.value.email);
    if (existingUser.isErr()) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred. Try again later',
      });
    }

    if (!existingUser.value) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Invalid email',
      });
    }

    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);
    const updatedUser = await resetUserPassword(
      existingUser.value.id,
      hashedPassword
    );

    if (updatedUser.isErr()) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred. Try again later',
      });
    }
  });

export const authRouter = createTRPCRouter({
  signUp: signUp,
  verufyAccount: verifyAccount,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
});
