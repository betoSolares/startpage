import { BookmarkType } from '@prisma/client';
import { z } from 'zod';

export const CreateBookmarkSchema = z
  .object({
    type: z.nativeEnum(BookmarkType),
    title: z.string(),
    link: z.string().url().optional(),
    parentId: z.string().cuid().optional(),
  })
  .refine(
    (values) => {
      if (values.type === 'Link') return !!values.link;
    },
    {
      message: 'Link is missing',
      path: ['link'],
    }
  );
