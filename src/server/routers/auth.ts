import { createTRPCRouter, publicProcedure } from '../trpc';

const test = publicProcedure.query(async () => {
  return [1, 2, 3];
});

export const authRouter = createTRPCRouter({
  test: test,
});
