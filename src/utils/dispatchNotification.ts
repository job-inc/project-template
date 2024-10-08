import { getNotificationKeyMap, NotificationMap } from '../components/NotificationsHub/NotificationHub.map';

export interface NotificationsEventPromiseData {
    promise: Promise<unknown>;
    events: {
        onPending?: string;
        onSuccess?: string;
        onError?: string;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorHandler?: (error: any) => string | void;
}

export const dispatchPromisedNotificationsEvent = (
    promise: NotificationsEventPromiseData['promise'],
    events: NotificationsEventPromiseData['events'],
    errorHandler: NotificationsEventPromiseData['errorHandler'],
) => {
    window.dispatchEvent(new CustomEvent('notifyPromise', { detail: { promise, events, errorHandler } }));
};

export const dispatchErrorNotification = (key: keyof NotificationMap) => {
    window.dispatchEvent(
        new CustomEvent('notifyError', {
            detail: {
                events: getNotificationKeyMap(key),
            },
        }),
    );
};

export const dispatchSuccessNotification = (key: keyof NotificationMap) => {
    window.dispatchEvent(
        new CustomEvent('notifySuccess', {
            detail: {
                events: getNotificationKeyMap(key),
            },
        }),
    );
};
