'use client';

import { useEffect } from 'react';

const TARGETS = ['p', 'h1', 'h2', 'h3', 'h4', 'span', 'li', 'a', 'button'];
const BATCH = 3;

export default function WatchDogsTextGlitch() {
    useEffect(() => {
        const glitch = () => {
            const pool: HTMLElement[] = [];
            TARGETS.forEach((sel) =>
                document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
                    if (
                        el.textContent?.trim() &&
                        !el.closest('header') &&
                        !el.closest('nav') &&
                        !el.dataset.wdGlitching
                    ) {
                        pool.push(el);
                    }
                })
            );
            if (!pool.length) return;

            const count = Math.min(BATCH, pool.length);
            const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, count);
            shuffled.forEach((el) => {
                el.dataset.wdGlitching = '1';
                el.classList.add('wd-text-glitch');
                setTimeout(() => {
                    el.classList.remove('wd-text-glitch');
                    delete el.dataset.wdGlitching;
                }, 400);
            });
        };

        const interval = setInterval(glitch, 250);
        return () => clearInterval(interval);
    }, []);

    return null;
}
