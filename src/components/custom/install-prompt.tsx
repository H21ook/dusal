'use client';

import { useIsClient } from '@/hooks/use-is-client';
import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
}

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showButton, setShowButton] = useState(false);

    const isClient = useIsClient();
    const isIOS = isClient && /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
    const isStandalone = isClient && window.matchMedia('(display-mode: standalone)').matches;

    useEffect(() => {
        const handler = (e: BeforeInstallPromptEvent) => {
            console.log('beforeinstallprompt captured');
            e.preventDefault();
            setDeferredPrompt(e);
            setShowButton(true);
        };
        window.addEventListener('beforeinstallprompt', handler as EventListener);
        return () => window.removeEventListener('beforeinstallprompt', handler as EventListener);
    }, []);

    const handleInstall = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((result: { outcome: string }) => {
                if (result.outcome === 'accepted') {
                    console.log('User accepted install');
                } else {
                    console.log('User dismissed');
                }
                setDeferredPrompt(null);
                setShowButton(false);
            });
        }
    };

    if (isStandalone) return null; // Already installed

    return (
        <div style={{ marginTop: 20, padding: 10, border: '1px solid #ccc' }}>
            <h3>Install App</h3>
            {showButton && !isIOS && (
                <button onClick={handleInstall}>📱 Суулгах</button>
            )}
            {!showButton && !isIOS && (
                <p style={{ color: 'gray' }}>Хөтөлбөр суулгах боломжгүй байна (beforeinstallprompt event ирээгүй). Манифестээ шалгана уу.</p>
            )}
            {isIOS && (
                <p>
                    iOS төхөөрөмж дээр суулгахын тулд Share → &quot;Add to Home Screen&quot; дээр дарна уу.
                </p>
            )}
        </div>
    );
}