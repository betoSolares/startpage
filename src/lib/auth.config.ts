import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';

import { SignInSchema } from '@/schemas/auth';
import { getUserByEmail } from '@/server/data/users';

import { db } from './db';

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
  },
};
