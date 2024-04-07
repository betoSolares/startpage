import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';

import { SignInSchema } from '@/schemas/auth';
import { getUserByEmail } from '@/server/data/users';

import { db } from './db';
import { encodeToken } from './tokens';

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  providers: [
    credentials({
      name: 'credentials',
      authorize: async (credentials) => {
        const validatedFields = SignInSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;
        const user = await getUserByEmail(email);
        if (!user.isOk() || !user.value) {
          return null;
        }

        const matches = await bcrypt.compare(password, user.value.password);
        if (!matches) {
          return null;
        }

        return {
          id: user.value.id,
          email: user.value.email,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token }) => {
      return token;
    },
    session: async ({ session, token }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session;
    },
    signIn: async ({ user }) => {
      const email = user.email ?? '';
      const existingUser = await getUserByEmail(email);
      if (!existingUser.isOk() || !existingUser.value) {
        return false;
      }

      if (existingUser.value.emailVerified) {
        return true;
      }

      const token = encodeToken('account', email);
      if (token.isErr()) {
        return false;
      }

      console.log('token: ', token.value);

      return false;
    },
  },
};
