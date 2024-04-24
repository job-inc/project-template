import { router } from '../trpcBackend';

import { example } from './example';

export const trpcRouter = router({
    example,
});

export type TrpcRouter = typeof trpcRouter;
