/* NamespacedAction<'example', 'Transform'> -> exampleTransform */
// type NamespacedAction<T extends string, A extends string> = `${T}${A}`;

/* CUDNamespacedAction<'example'> -> exampleCreate / exampleUpdate / exampleDelete */
// type CUDNamespacedAction<T extends string> = NamespacedAction<T, 'Create' | 'Update' | 'Delete'>;

type Namespaces =
    // CUDNamespacedAction<'example'>
    'copy' | 'error';

export type { Namespaces as NotificationNamespaces };

export type NotificationMap = Record<
    Namespaces,
    {
        onPending?: string;
        onSuccess?: string;
        onError?: string;
    }
>;

export const getNotificationKeyMap = (key: keyof NotificationMap) => {
    const notification: NotificationMap = {
        error: {
            onError: 'Something went wrong 😿',
        },
        copy: {
            onSuccess: 'Successfully copied',
            onPending: 'Copying...',
            onError: 'An error occurred while copying',
        },
    };

    return notification[key];
};
