'use client';

import { useEffect, useState } from 'react';

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showButton, setShowButton] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window));
        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
    }, []);

    useEffect(() => {
        const handler = (e: Event) => {
            console.log('beforeinstallprompt captured');
            e.preventDefault();
            setDeferredPrompt(e);
            setShowButton(true);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
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
                    iOS төхөөрөмж дээр суулгахын тулд Share → "Add to Home Screen" дээр дарна уу.
                </p>
            )}
        </div>
    );
}