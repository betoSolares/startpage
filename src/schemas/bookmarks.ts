import { BookmarkType } from '@prisma/client';
import { z } from 'zod';

const urlValidation = new RegExp(
  '^(https?:\\/\\/)?' +
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    '(\\#[-a-z\\d_]*)?$',
  'i'
);

export const CreateBookmarkSchema = z
  .object({
    title: z.string().trim().min(1),
    type: z.nativeEnum(BookmarkType),
    link: z.string().optional(),
    parentId: z.string().cuid().optional(),
  })
  .refine(
    (values) => {
      if (
        values.type === 'Link' &&
        (values.link === undefined || !urlValidation.test(values.link))
      ) {
        return false;
      }

      return true;
    },
    {
      message: 'Invalid link',
      path: ['link'],
    }
  )
  .transform((values) => {
    if (values.type === 'Directory') {
      values.link = undefined;
    }

    return values;
  });
