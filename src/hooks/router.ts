import { useRouter as NextRouter } from 'next/router';

export const routes = {
    index: () => '/',

    signIn: () => '/api/auth/signin',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useRouter = () => {
    const router = NextRouter();

    return {
        index: () => router.push(routes.index()),

        signIn: () => router.push(routes.signIn()),
    };
};
