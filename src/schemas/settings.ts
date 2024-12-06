import { BookmarkType } from '@prisma/client';
import { z } from 'zod';

const baseBookmark = z.object({
  title: z.string().trim().min(1),
  type: z.nativeEnum(BookmarkType),
  link: z.string().optional(),
});

export type bookmark = z.infer<typeof baseBookmark> & {
  children: bookmark[];
};

const completeBookmark: z.ZodType<bookmark> = baseBookmark.extend({
  children: z.lazy(() => completeBookmark.array()),
});

export const ImportBookmarkSchema = completeBookmark.array();
