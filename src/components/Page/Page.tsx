import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { Toaster } from 'react-hot-toast';

import { PageContext } from '../../context/PageContext';

const NotificationsHub = dynamic(() => import('../NotificationsHub/NotificationsHub'));

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
    ssrTime: number;
    title?: string;
    header: React.ReactNode;
    children?: React.ReactNode;
}

// Toaster can not get className, only style
const toastOptions = {
    style: {
        background: 'transparent',
        color: '#fff',
    },
};

export const Page: React.FC<PageProps> = ({ ssrTime, title = 'Untitled', children, header }) => {
    const { resolvedTheme } = useTheme();
    const theme = (resolvedTheme as 'dark' | 'light') || 'dark';

    return (
        <PageContext.Provider value={{ theme, ssrTime }}>
            <Head>
                <link rel="icon" href="/favicon.png" />
                <title>{title}</title>
                <link rel="stylesheet" id="themeVariables" href={`/theme/${theme}.css`} />
            </Head>

            <Toaster toastOptions={toastOptions} position="bottom-right" />

            <div>
                <aside>aside</aside>

                <div>
                    {header}
                    <main>{children}</main>
                </div>
                <footer>footer</footer>
            </div>

            <NotificationsHub />
        </PageContext.Provider>
    );
};
