"use client";

import { useState, useEffect, useRef } from 'react';
import { subscribeUser, unsubscribeUser, sendNotification } from '@/actions';
import { urlBase64ToUint8Array, arrayBufferToBase64 } from '@/lib/client-utils';
import { useIsClient } from '@/hooks/use-is-client';

function PushNotificationManager() {
    const isClient = useIsClient();
    const [subscription, setSubscription] = useState<PushSubscription | null>(null);
    const [message, setMessage] = useState('');
    const isSubscribingRef = useRef(false);

    const isSupported = isClient &&
        "serviceWorker" in navigator &&
        "PushManager" in window;

    useEffect(() => {
        if (!isSupported) return;

        async function registerServiceWorker() {
            if (isSubscribingRef.current) return;
            isSubscribingRef.current = true;

            try {
                const registration = await navigator.serviceWorker.register('/sw.js', {
                    scope: '/',
                    updateViaCache: 'none',
                });
                const sub = await registration.pushManager.getSubscription();
                setSubscription(sub);
            } catch (error) {
                console.error('Service Worker registration failed:', error);
            } finally {
                isSubscribingRef.current = false;
            }
        }

        registerServiceWorker();
    }, [isSupported]);

    async function subscribeToPush() {
        try {
            const registration = await navigator.serviceWorker.ready;
            const sub = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
                ),
            });
            setSubscription(sub);
            const serializedSub = {
                endpoint: sub.endpoint,
                keys: {
                    p256dh: arrayBufferToBase64(sub.getKey('p256dh')!),
                    auth: arrayBufferToBase64(sub.getKey('auth')!),
                }
            };
            await subscribeUser(serializedSub);
        } catch (error) {
            console.error('Failed to subscribe to push:', error);
        }
    }

    async function unsubscribeFromPush() {
        try {
            await subscription?.unsubscribe();
            setSubscription(null);
            await unsubscribeUser();
        } catch (error) {
            console.error('Failed to unsubscribe:', error);
        }
    }

    async function sendTestNotification() {
        if (subscription && message.trim()) {
            await sendNotification(message);
            setMessage('');
        }
    }

    if (!isSupported) {
        return <p>Push notifications are not supported in this browser.</p>;
    }

    return (
        <div>
            <h3>Push Notifications</h3>
            {subscription ? (
                <>
                    <p>You are subscribed to push notifications.</p>
                    <button onClick={unsubscribeFromPush}>Unsubscribe</button>
                    <input
                        type="text"
                        placeholder="Enter notification message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={sendTestNotification}>Send Test</button>
                </>
            ) : (
                <>
                    <p>You are not subscribed to push notifications.</p>
                    <button onClick={subscribeToPush}>Subscribe</button>
                </>
            )}
        </div>
    )
}
export default PushNotificationManager