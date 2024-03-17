import {
  TRPCClientError,
  createTRPCProxyClient,
  loggerLink,
} from '@trpc/client';
import { callProcedure } from '@trpc/server';
import { observable } from '@trpc/server/observable';
import { TRPCErrorResponse } from '@trpc/server/rpc';
import { cache } from 'react';

import { appRouter } from '@/server/api';
import { createTRPCContext } from '@/server/api/trpc';

import { transformer } from './trpc';

const createContext = cache(() => {
  return createTRPCContext({
    headers: new Headers({
      'x-trpc-source': 'rsc',
    }),
  });
});

export const api = createTRPCProxyClient<typeof appRouter>({
  transformer,
  links: [
    loggerLink({
      enabled: (op) =>
        (process.env.NODE_ENV === 'development' &&
          typeof window !== 'undefined') ||
        (op.direction === 'down' && op.result instanceof Error),
    }),
    () =>
      ({ op }) =>
        observable((observer) => {
          createContext()
            .then((ctx) => {
              return callProcedure({
                procedures: appRouter._def.procedures,
                path: op.path,
                rawInput: op.input,
                ctx,
                type: op.type,
              });
            })
            .then((data) => {
              observer.next({ result: { data } });
              observer.complete();
            })
            .catch((cause: TRPCErrorResponse) => {
              observer.error(TRPCClientError.from(cause));
            });
        }),
  ],
});
