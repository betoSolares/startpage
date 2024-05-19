import { authRouter } from './routers/auth';
import { bookmarksRouter } from './routers/bookmarks';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  bookmarks: bookmarksRouter,
});

export type AppRouter = typeof appRouter;
