import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';

import { trpc } from '../../trpc/trpcClient';
import { TLocale, setSSRLocale } from '../utils/getLang';

import './_app.css';

const defaultThemes = ['light', 'dark'];

function App({ Component, pageProps, router }: AppProps) {
    setSSRLocale(router.locale as TLocale);

    return (
        <SessionProvider session={pageProps.session} refetchOnWindowFocus={true}>
            <ThemeProvider themes={defaultThemes}>
                <Component {...pageProps} />
            </ThemeProvider>
        </SessionProvider>
    );
}

export default trpc.withTRPC(App);
