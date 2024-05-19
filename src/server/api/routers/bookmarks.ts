import { TRPCError } from '@trpc/server';

import { CreateBookmarkSchema } from '@/schemas/bookmarks';
import { createBookmark, getBookmarkById } from '@/server/data/bookmarks';

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

export const bookmarksRouter = createTRPCRouter({
  create: create,
});
