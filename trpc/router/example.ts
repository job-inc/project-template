import { protectedProcedure, router } from '../trpcBackend';

export const example = router({
    getHello: protectedProcedure.query(async () => {
        const todos = await fetch('https://jsonplaceholder.typicode.com/todos/1').then((res) => res.json());

        return todos;
    }),
});
