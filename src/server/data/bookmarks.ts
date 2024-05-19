import { BookmarkType } from '@prisma/client';
import { fromPromise } from 'neverthrow';

import { db } from '@/lib/db';

import { PrismaError } from './error';

export const createBookmark = async (
  type: BookmarkType,
  title: string,
  userId: string,
  link: string | undefined,
  parentId: string | undefined
) => {
  const result = await fromPromise(
    db.bookmark.create({ data: { type, title, userId, link, parentId } }),
    (e) => new PrismaError(e)
  );

  return result;
};

export const getBookmarkById = async (id: string) => {
  const result = await fromPromise(
    db.bookmark.findUnique({ where: { id } }),
    (e) => new PrismaError(e)
  );

  return result;
};
