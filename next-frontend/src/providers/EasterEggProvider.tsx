'use client';

import { useEffect, useState } from 'react';
import { useEasterEggStore } from '@/stores/easterEgg';
import EldenRingOverlay from '@/components/easter-egg/EldenRingOverlay';
import WatchDogsOverlay from '@/components/watchdogs/WatchDogsOverlay';

export default function EasterEggProvider({ children }: { children: React.ReactNode }) {
    const [inputBuffer, setInputBuffer] = useState('');
    const secretCode = 'eldenring';
    const { toggleEasterEgg, setEasterEgg, setWatchdogs, watchdogs } = useEasterEggStore();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setEasterEgg(false);
                setWatchdogs(false);
                return;
            }

            if (watchdogs) return;

            const next = (inputBuffer + e.key.toLowerCase()).slice(-secretCode.length);
            setInputBuffer(next);

            if (next === secretCode) {
                toggleEasterEgg();
                setInputBuffer('');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [inputBuffer, toggleEasterEgg, setEasterEgg, setWatchdogs, watchdogs]);

    return (
        <>
            <EldenRingOverlay />
            <WatchDogsOverlay />
            {children}
        </>
    );
}
