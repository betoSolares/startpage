import { fromPromise } from 'neverthrow';

import { db } from '@/lib/db';

import { PrismaError } from './error';

export const getUserByEmail = async (email: string) => {
  const result = await fromPromise(
    db.user.findUnique({ where: { email } }),
    (e) => new PrismaError(e)
  );

  return result;
};

export const createUser = async (email: string, password: string) => {
  const result = await fromPromise(
    db.user.create({ data: { email, password } }),
    (e) => new PrismaError(e)
  );

  return result;
};

export const verifyUser = async (id: string, email: string) => {
  const result = await fromPromise(
    db.user.update({
      where: { id },
      data: { email: email, emailVerified: new Date() },
    }),
    (e) => new PrismaError(e)
  );

  return result;
};

export const resetUserPassword = async (id: string, password: string) => {
  const result = await fromPromise(
    db.user.update({ where: { id }, data: { password } }),
    (e) => new PrismaError(e)
  );

  return result;
};
