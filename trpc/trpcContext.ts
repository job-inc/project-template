import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

export const createContext = async (opts: trpcNext.CreateNextContextOptions) => {
    return { session: { authorized: true }, headers: opts.req.headers };
};

export type TrpcContext = inferAsyncReturnType<typeof createContext>;
