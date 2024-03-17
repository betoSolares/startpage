import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import superjson from 'superjson';

import { AppRouter } from '@/server/api';

function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getUrl() {
  return getBaseUrl() + '/api/trpc';
}

export const transformer = superjson;

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
