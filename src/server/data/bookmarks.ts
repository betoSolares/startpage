import { BookmarkType } from '@prisma/client';
import { fromPromise } from 'neverthrow';

import { db } from '@/lib/db';

import { PrismaError } from './error';

export const createBookmark = async (
  type: BookmarkType,
  title: string,
  userId: string,
  link: string | undefined,
  parentId: string | undefined,
  order: string
) => {
  const result = await fromPromise(
    db.bookmark.create({
      data: { type, title, userId, link, parentId, order },
    }),
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

export const getTopLevelBookmarks = async (userId: string) => {
  const result = await fromPromise(
    db.bookmark.findMany({
      where: { userId, parentId: null },
      orderBy: { order: 'asc' },
    }),
    (e) => new PrismaError(e)
  );

  return result;
};

export const getChildrenBookmarks = async (id: string) => {
  const result = await fromPromise(
    db.bookmark.findUnique({
      where: { id },
      include: { children: { orderBy: { order: 'asc' } } },
    }),
    (e) => new PrismaError(e)
  );

  return result;
};

export const updateBookmark = async (
  id: string,
  title: string,
  link: string | undefined
) => {
  const result = await fromPromise(
    db.bookmark.update({ where: { id }, data: { title: title, link: link } }),
    (e) => new PrismaError(e)
  );

  return result;
};

export const deleteBookmark = async (id: string) => {
  const result = await fromPromise(
    db.bookmark.delete({ where: { id } }),
    (e) => new PrismaError(e)
  );

  return result;
};

export const getLastBookmark = async (
  parentId: string | undefined,
  userId: string
) => {
  if (parentId !== undefined) {
    parentId = parentId;
  }

  const result = await fromPromise(
    db.bookmark.findMany({
      where: { AND: [{ parentId }, { userId }] },
      orderBy: { order: 'desc' },
      take: 1,
    }),
    (e) => new PrismaError(e)
  );

  return result;
};

export const updateBookmarkOrder = async (id: string, order: string) => {
  const result = await fromPromise(
    db.bookmark.update({ where: { id }, data: { order } }),
    (e) => new PrismaError(e)
  );

  return result;
};
