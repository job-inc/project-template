import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';

interface AuthResponse {
    success: boolean;
    data: {
        token: string;
    };
}

const providers: NextAuthOptions['providers'] = [];

if (process.env.CREDENTIALS_AUTH) {
    providers.push(
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'text', placeholder: 'email@example.com' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(creds) {
                if (!creds) return null;

                const url = `${process.env.EXTERNAL_API_SERVICE}/sign/in`;
                const response: AuthResponse | null = await fetch(url, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: creds.email,
                        password: creds.password,
                    }),
                }).then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return null;
                });

                if (!response?.success) return null;

                return {
                    // TODO: id ???
                    id: Math.random().toString(),
                    email: creds?.email,
                    token: response.data.token,
                };
            },
        }),
    );
}

// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt', // required for CredentialsProvider
    },
    providers,
    callbacks: {
        // @ts-ignore — black magic of adding user data to session
        async session({ session }) {
            return session;
        },
        async jwt({ token, user }) {
            // console.log('jwt: ', user, token);
            return user
                ? {
                      ...token,
                      ...user,
                  }
                : token;
        },
    },
};

declare module 'next-auth' {
    interface Session {
        user: {
            email: string;
            token: string;
        };
    }

    interface User {
        email: string;
        token: string;
    }
}
