'use client';

import { useEffect, useState, useCallback } from 'react';
import { PowerGlitch } from 'powerglitch';
import { useEasterEggStore } from '@/stores/easterEgg';

interface LogoInstance {
    id: number;
    x: number;
    y: number;
}

const GLITCH_OPTIONS = {
    playMode: 'always' as const,
    createContainers: false as const,
    timing: { duration: 2000, iterations: Infinity },
    glitchTimeSpan: { start: 0, end: 1 },
    shake: { velocity: 5, amplitudeX: 0.6, amplitudeY: 0.2 },
    slice: { count: 12, velocity: 5, minHeight: 0.1, maxHeight: 0.5, hueRotate: true },
    pulse: false as const,
};

export default function GlitchEffect() {
    const { easterEgg, watchdogs, setWatchdogs } = useEasterEggStore();
    const [logos, setLogos] = useState<LogoInstance[]>([]);

    const spawn = useCallback(() => {
        const size = 48;
        const id = Date.now() + Math.random();
        const x = Math.random() * (window.innerWidth - size);
        const y = window.scrollY + Math.random() * (window.innerHeight - size);

        setLogos((prev) => [...prev, { id, x, y }]);
        setTimeout(() => setLogos((prev) => prev.filter((l) => l.id !== id)), 2000);
    }, []);

    useEffect(() => {
        if (easterEgg) setLogos([]);
    }, [easterEgg]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!easterEgg && !watchdogs && Math.random() < 0.08) spawn();
        }, 1000);
        return () => clearInterval(interval);
    }, [spawn, easterEgg, watchdogs]);

    return (
        <>
            {logos.map((l) => (
                <div
                    key={l.id}
                    ref={(el) => {
                        if (el) PowerGlitch.glitch(el, GLITCH_OPTIONS);
                    }}
                    onClick={() => setWatchdogs(true)}
                    style={{
                        position: 'absolute',
                        left: l.x,
                        top: l.y,
                        width: 48,
                        height: 48,
                        zIndex: 99999,
                        cursor: 'pointer',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            background: '#00ffff',
                            WebkitMaskImage: 'url(/logo.png)',
                            maskImage: 'url(/logo.png)',
                            WebkitMaskSize: 'contain',
                            maskSize: 'contain',
                            WebkitMaskRepeat: 'no-repeat',
                            maskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center',
                            maskPosition: 'center',
                        }}
                    />
                </div>
            ))}
        </>
    );
}
