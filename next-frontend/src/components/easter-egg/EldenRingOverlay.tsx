'use client';

import { useEffect } from 'react';
import { useEasterEggStore } from '@/stores/easterEgg';
import GoldenLeafParticles from './GoldenLeafParticles';
import ErTexture from './ErTexture';

export default function EldenRingOverlay() {
    const { easterEgg } = useEasterEggStore();

    useEffect(() => {
        const html = document.documentElement;

        const sections = document.querySelectorAll<HTMLElement>('section');
        const ER_BG = 'oklch(0.08 0.02 65)';

        if (easterEgg) {
            document.body.classList.add('elden-ring');
            if (!html.classList.contains('dark')) {
                html.dataset.erForcedDark = 'true';
                html.classList.add('dark');
            }
            sections.forEach((s) => (s.style.backgroundColor = ER_BG));
        } else {
            document.body.classList.remove('elden-ring');
            if (html.dataset.erForcedDark === 'true') {
                html.classList.remove('dark');
                delete html.dataset.erForcedDark;
            }
            sections.forEach((s) => (s.style.backgroundColor = ''));
        }

        return () => {
            document.body.classList.remove('elden-ring');
            sections.forEach((s) => (s.style.backgroundColor = ''));
            if (html.dataset.erForcedDark === 'true') {
                html.classList.remove('dark');
                delete html.dataset.erForcedDark;
            }
        };
    }, [easterEgg]);

    return easterEgg ? (
        <>
            <ErTexture />
            <GoldenLeafParticles />
        </>
    ) : null;
}
