import { TRPCError } from '@trpc/server';

import {
  CreateBookmarkSchema,
  GetBookmarksSchema,
  UpdateBookmarkSchema,
} from '@/schemas/bookmarks';
import {
  createBookmark,
  getBookmarkById,
  getChildrenBookmarks,
  getTopLevelBookmarks,
  updateBookmark,
} from '@/server/data/bookmarks';

import { createTRPCRouter, protectedProcedure } from '../trpc';

const create = protectedProcedure
  .input(CreateBookmarkSchema)
  .mutation(async ({ ctx, input }) => {
    const validatedFields = CreateBookmarkSchema.safeParse(input);
    if (!validatedFields.success) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Failed to validate input',
      });
    }

    const { type, title, link, parentId } = validatedFields.data;

    const parentBookmark = await getBookmarkById(parentId ?? '');
    if (parentBookmark.isErr()) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'An unexpected error occurred creating the bookmark. Try again later',
      });
    }

    if (parentBookmark.value) {
      const { userId, type } = parentBookmark.value;

      if (userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'No access to this bookmark',
        });
      }

      if (type !== 'Directory') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Only directories can have children',
        });
      }
    }

    const createdBookmark = await createBookmark(
      type,
      title,
      ctx.session.user.id,
      link,
      parentId
    );
    if (createdBookmark.isErr()) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'An unexpected error occurred creating the bookmark. Try again later',
      });
    }

    return {
      id: createdBookmark.value.id,
      type: createdBookmark.value.type,
      title: createdBookmark.value.title,
      link: createdBookmark.value.link,
    };
  });

const getTopLevel = protectedProcedure.query(async ({ ctx }) => {
  const bookmarks = await getTopLevelBookmarks(ctx.session.user.id);
  if (bookmarks.isErr()) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message:
        'An unexpected error occurred while getting the bookmarks. Try again later',
    });
  }

  return { bookmarks: bookmarks.value };
});

const getBookmarkWithChilds = protectedProcedure
  .input(GetBookmarksSchema)
  .query(async ({ ctx, input }) => {
    const validatedFields = GetBookmarksSchema.safeParse(input);
    if (!validatedFields.success) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Failed to validate input',
      });
    }

    const bookmarks = await getChildrenBookmarks(validatedFields.data.id);
    if (bookmarks.isErr()) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'An unexpected error occurred creating the bookmark. Try again later',
      });
    }

    if (bookmarks.value) {
      const { userId, type } = bookmarks.value;

      if (userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'No access to this bookmark',
        });
      }

      if (type !== 'Directory') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Only directories can have children',
        });
      }
    }

    return { parentBookmark: bookmarks.value };
  });

const update = protectedProcedure
  .input(UpdateBookmarkSchema)
  .mutation(async ({ ctx, input }) => {
    const validatedFields = UpdateBookmarkSchema.safeParse(input);
    if (!validatedFields.success) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Failed to validate input',
      });
    }

    const { id, title, link } = validatedFields.data;

    const bookmark = await getBookmarkById(id);
    if (bookmark.isErr()) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'An unexpected error occurred updating the bookmark. Try again later',
      });
    }

    if (!bookmark.value) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: "The bookmark doesn't exist",
      });
    }

    const { userId } = bookmark.value;

    if (userId !== ctx.session.user.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'No access to this bookmark',
      });
    }

    const updatedBookmark = await updateBookmark(id, title, link);
    if (updatedBookmark.isErr()) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'An unexpected error occurred updating the bookmark. Try again later',
      });
    }

    return {
      id: updatedBookmark.value.id,
      type: updatedBookmark.value.type,
      title: updatedBookmark.value.title,
      link: updatedBookmark.value.link,
    };
  });

export const bookmarksRouter = createTRPCRouter({
  create: create,
  getTopLevel: getTopLevel,
  getBookmarkWithChilds: getBookmarkWithChilds,
  update: update,
});
