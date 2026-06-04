'use client';

import { useEffect, useState } from 'react';
import { useEasterEggStore } from '@/stores/easterEgg';
import WatchDogsNetwork from './WatchDogsNetwork';
import WatchDogsTextGlitch from './WatchDogsTextGlitch';

const WD_BG = 'rgba(0, 8, 16, 0.82)';

interface GlitchBar {
    top: number;
    height: number;
    color: string;
    opacity: number;
    scaleX: number;
    translateX: number;
}

function randomBars(): GlitchBar[] {
    const colors = ['#00d4ff', '#ff0044', '#ffffff', '#00d4ff', '#00d4ff'];
    return Array.from({ length: Math.floor(Math.random() * 9) + 4 }, () => ({
        top: Math.random() * 100,
        height: Math.random() * 6 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.85 + 0.15,
        scaleX: 0.3 + Math.random() * 0.7,
        translateX: (Math.random() - 0.5) * 120,
    }));
}

export default function WatchDogsOverlay() {
    const { watchdogs } = useEasterEggStore();
    const [flashing, setFlashing] = useState(false);
    const [active, setActive] = useState(false);
    const [bars, setBars] = useState<GlitchBar[]>([]);

    useEffect(() => {
        const html = document.documentElement;

        if (watchdogs) {
            setFlashing(true);
            setBars(randomBars());

            const barInterval = setInterval(() => setBars(randomBars()), 40);

            // phase 1 ends: glitch cuts to black
            const glitchEnd = setTimeout(() => {
                clearInterval(barInterval);
                setBars([]);
            }, 400);

            // phase 2 ends: BSOD holds 200ms then watchdogs snaps in
            const activateTimer = setTimeout(() => {
                document.body.classList.add('wd-instant');
                document.body.classList.add('watchdogs');
                document.body.classList.remove('wd-transitioning');
                if (!html.classList.contains('dark')) {
                    html.dataset.wdForcedDark = 'true';
                    html.classList.add('dark');
                }
                document.querySelectorAll<HTMLElement>('section').forEach(
                    (s) => (s.style.backgroundColor = WD_BG),
                );
                document.querySelectorAll<HTMLElement>('[id^="layer-"]').forEach(
                    (el) => (el.style.opacity = '0'),
                );
                setFlashing(false);
                setActive(true);
                requestAnimationFrame(() =>
                    requestAnimationFrame(() =>
                        document.body.classList.remove('wd-instant'),
                    ),
                );
            }, 600);

            return () => {
                clearInterval(barInterval);
                clearTimeout(glitchEnd);
                clearTimeout(activateTimer);
            };
        } else {
            setActive(false);
            setFlashing(false);
            setBars([]);
            document.body.classList.remove('watchdogs');
            if (html.dataset.wdForcedDark === 'true') {
                html.classList.remove('dark');
                delete html.dataset.wdForcedDark;
            }
            document.querySelectorAll<HTMLElement>('section').forEach(
                (s) => (s.style.backgroundColor = ''),
            );
            document.querySelectorAll<HTMLElement>('[id^="layer-"]').forEach(
                (el) => (el.style.opacity = ''),
            );
        }

        return () => {
            document.body.classList.remove('watchdogs');
            document.querySelectorAll<HTMLElement>('section').forEach(
                (s) => (s.style.backgroundColor = ''),
            );
            document.querySelectorAll<HTMLElement>('[id^="layer-"]').forEach(
                (el) => (el.style.opacity = ''),
            );
            if (html.dataset.wdForcedDark === 'true') {
                html.classList.remove('dark');
                delete html.dataset.wdForcedDark;
            }
        };
    }, [watchdogs]);

    if (!watchdogs && !flashing) return null;

    return (
        <>
            {flashing && (
                <>
                    {/* Main flash layer */}
                    <div
                        className="pointer-events-none fixed inset-0"
                        style={{ zIndex: 99990, animation: 'watchdogs-flash 0.6s steps(1, end) forwards' }}
                    />
                    {/* Random glitch bars */}
                    {bars.map((b, i) => (
                        <div
                            key={i}
                            className="pointer-events-none fixed left-0 right-0"
                            style={{
                                zIndex: 99992,
                                top: `${b.top}vh`,
                                height: `${b.height}px`,
                                background: b.color,
                                opacity: b.opacity,
                                transform: `scaleX(${b.scaleX}) translateX(${b.translateX}px)`,
                                transformOrigin: 'left center',
                            }}
                        />
                    ))}
                    {/* Scanline sweep */}
                    <div
                        className="pointer-events-none fixed left-0 right-0"
                        style={{
                            zIndex: 99993,
                            height: '4px',
                            background: 'linear-gradient(90deg, transparent, #00d4ff, #ffffff, #00d4ff, transparent)',
                            boxShadow: '0 0 14px 5px #00d4ff, 0 0 35px 10px rgba(0,212,255,0.35)',
                            animation: 'wd-scanline 0.4s cubic-bezier(0.4, 0, 1, 1) forwards',
                        }}
                    />
                </>
            )}
            {active && (
                <>
                    <WatchDogsNetwork />
                    <WatchDogsTextGlitch />
                </>
            )}
        </>
    );
}
