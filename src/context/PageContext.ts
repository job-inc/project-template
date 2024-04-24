import React from 'react';

export interface PageContext {
    theme: 'light' | 'dark';
    ssrTime: number;
}

export const PageContext = React.createContext<PageContext>({ theme: 'dark', ssrTime: 0 });
