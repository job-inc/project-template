import { getNotificationKeyMap, NotificationNamespaces } from '../components/NotificationsHub/NotificationHub.map';

import { NotificationsEventPromiseData, dispatchPromisedNotificationsEvent } from './dispatchNotification';

interface NotifyPromise {
    <T>(
        promise: Promise<T>,
        events: NotificationsEventPromiseData['events'],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        errorHandler?: (error: any) => string | void,
    ): PromiseLike<[T, null] | [null, T]>;
    <T>(
        promise: Promise<T>,
        namespace: NotificationNamespaces,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        errorHandler?: (error: any) => string | void,
    ): PromiseLike<[T, null] | [null, T]>;
}

export const notifyPromise: NotifyPromise = (promise, eventsOrNamespace, errorHandler) => {
    let events: NotificationsEventPromiseData['events'];

    if (typeof eventsOrNamespace === 'string') {
        const notifyMap = getNotificationKeyMap(eventsOrNamespace);

        events = {
            onSuccess: notifyMap.onSuccess,
            onPending: notifyMap.onPending,
            onError: notifyMap.onError ?? getNotificationKeyMap('error').onError,
        };
    } else {
        events = eventsOrNamespace;
    }

    dispatchPromisedNotificationsEvent(promise, events, errorHandler);

    return promise.then(
        (data) => [data, null],
        (error) => [null, error],
    );
};
