import { TRPCError } from '@trpc/server';
import { LexoRank } from 'lexorank';

import {
  CreateBookmarkSchema,
  DeleteBookmarkSchema,
  GetBookmarksSchema,
  UpdateBookmarkOrderSchema,
  UpdateBookmarkSchema,
} from '@/schemas/bookmarks';
import {
  createBookmark,
  deleteBookmark,
  getBookmarkById,
  getChildrenBookmarks,
  getLastBookmark,
  getTopLevelBookmarks,
  updateBookmark,
  updateBookmarkOrder,
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

    let order = LexoRank.middle().format();

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

    const lastBookmark = await getLastBookmark(parentId, ctx.session.user.id);
    if (lastBookmark.isErr()) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'An unexpected error occurred creating the bookmark. Try again later',
      });
    }

    if (lastBookmark.value.length !== 0) {
      const lastOrder = lastBookmark.value.at(0)?.order;
      const lastOrderParsed = LexoRank.parse(lastOrder!);
      order = lastOrderParsed.genNext().format();
    }

    const createdBookmark = await createBookmark(
      type,
      title,
      ctx.session.user.id,
      link,
      parentId,
      order
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

const remove = protectedProcedure
  .input(DeleteBookmarkSchema)
  .mutation(async ({ ctx, input }) => {
    const validatedFields = DeleteBookmarkSchema.safeParse(input);
    if (!validatedFields.success) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Failed to validate input',
      });
    }

    const { id } = validatedFields.data;

    const bookmark = await getBookmarkById(id);
    if (bookmark.isErr()) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'An unexpected error occurred deleting the bookmark. Try again later',
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

    const deletedBookmark = await deleteBookmark(id);
    if (deletedBookmark.isErr()) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'An unexpected error occurred deleting the bookmark. Try again later',
      });
    }

    return {
      id: deletedBookmark.value.id,
    };
  });

const updateOrder = protectedProcedure
  .input(UpdateBookmarkOrderSchema)
  .mutation(async ({ ctx, input }) => {
    const validatedFields = UpdateBookmarkOrderSchema.safeParse(input);
    if (!validatedFields.success) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Failed to validate input',
      });
    }

    const { currentId, prevId, nextId } = validatedFields.data;

    const currentBookmark = await getBookmarkById(currentId);
    if (currentBookmark.isErr()) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'An unexpected error occurred updating the bookmark order. Try again later',
      });
    }

    if (!currentBookmark.value) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: "The bookmark doesn't exist",
      });
    }

    if (currentBookmark.value.userId !== ctx.session.user.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'No access to this bookmark',
      });
    }

    const prevBookmark = await getBookmarkById(prevId ?? '');
    if (prevBookmark.isErr()) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'An unexpected error occurred updating the bookmark order. Try again later',
      });
    }

    const nextBookmark = await getBookmarkById(nextId ?? '');
    if (nextBookmark.isErr()) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'An unexpected error occurred updating the bookmark order. Try again later',
      });
    }

    let order = '';

    if (!prevBookmark.value && !nextBookmark.value) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'An unexpected error occurred updating the bookmark order. Try again later',
      });
    }

    if (!prevBookmark.value) {
      if (nextBookmark.value?.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'No access to this bookmark',
        });
      }

      const nextOrder: string = nextBookmark.value.order;
      const nextOrderParsed = LexoRank.parse(nextOrder);
      order = nextOrderParsed.genPrev().format();
    }

    if (!nextBookmark.value) {
      if (prevBookmark.value?.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'No access to this bookmark',
        });
      }

      const prevOrder = prevBookmark.value.order;
      const prevOrderParsed = LexoRank.parse(prevOrder);
      order = prevOrderParsed.genNext().format();
    }

    if (prevBookmark.value && nextBookmark.value) {
      if (
        prevBookmark.value.userId !== ctx.session.user.id ||
        nextBookmark.value.userId !== ctx.session.user.id
      ) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'No access to this bookmark',
        });
      }

      const prevOrder = prevBookmark.value.order;
      const prevOrderParsed = LexoRank.parse(prevOrder);

      const nextOrder = nextBookmark.value.order;
      const nextOrderParsed = LexoRank.parse(nextOrder);

      order = prevOrderParsed.between(nextOrderParsed).format();
    }

    const updatedBookmark = await updateBookmarkOrder(currentId, order);
    if (updatedBookmark.isErr()) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'An unexpected error occurred updating the bookmark order. Try again later',
      });
    }

    return {
      id: updatedBookmark.value.id,
      order: updatedBookmark.value.order,
    };
  });

export const bookmarksRouter = createTRPCRouter({
  create: create,
  getTopLevel: getTopLevel,
  getBookmarkWithChilds: getBookmarkWithChilds,
  update: update,
  remove: remove,
  updateOrder: updateOrder,
});
