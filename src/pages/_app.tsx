import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import './_app.css';

import { trpc } from '../../trpc/trpcClient';
import { TLocale, setSSRLocale } from '../utils/getLang';

const defaultThemes = ['light', 'dark'];

function App({ Component, pageProps, router }: AppProps) {
    setSSRLocale(router.locale as TLocale);

    return (
        <ThemeProvider themes={defaultThemes}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default trpc.withTRPC(App);
