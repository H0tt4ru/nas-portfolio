'use client';

import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

// Register GSAP plugins immediately
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const { resolvedTheme } = useTheme();
    const heroRef = useRef<HTMLDivElement>(null);
    const layerRefs = useRef<(HTMLImageElement | null)[]>([]);

    // Determine theme folder and layer IDs
    const themeFolder = resolvedTheme === 'dark' ? 'night' : 'sunny';
    const themeSuffix = resolvedTheme === 'dark' ? 'night' : 'sunny';

    useEffect(() => {
        // Wait for GSAP to be ready and DOM elements to be available
        const initializeAnimations = () => {
            if (!heroRef.current || layerRefs.current.some((r) => !r)) {
                // Retry if elements aren't ready
                requestAnimationFrame(initializeAnimations);
                return;
            }

            // GSAP is ready and elements are available
            console.log('GSAP ready, initializing animations...');

            gsap.set(layerRefs.current[0], {
                yPercent: +50,
            });
            gsap.set(layerRefs.current[1], {
                yPercent: +50,
            });
            gsap.set(layerRefs.current[2], {
                yPercent: +50,
            });
            gsap.set(layerRefs.current[3], {
                yPercent: +50,
            });
            gsap.set(layerRefs.current[4], {
                yPercent: +50,
            });
            gsap.set(layerRefs.current[5], {
                yPercent: +50,
            });
            gsap.set(layerRefs.current[6], {
                yPercent: +50,
            });
            gsap.set(layerRefs.current[7], {
                yPercent: +50,
            });
            gsap.set(layerRefs.current[8], {
                yPercent: 0,
            });

            gsap.to('#hero-text', {
                scrollTrigger: {
                    trigger: '#hero',
                    start: 'top top',
                    end: '50% top',
                    scrub: true,
                },
                ease: 'none',
                yPercent: +100,
            });

            // GSAP animations - Dynamic IDs based on theme
            gsap.to(`#layer-1-${themeSuffix}`, {
                scrollTrigger: {
                    trigger: '#hero',
                    start: 'top top',
                    end: '50% top',
                    scrub: true,
                },
                ease: 'none',
                yPercent: +100,
            });

            gsap.to(`#layer-2-${themeSuffix}`, {
                scrollTrigger: {
                    trigger: '#hero',
                    start: 'top top',
                    end: '50% top',
                    scrub: true,
                },
                ease: 'none',
                yPercent: +101,
            });

            gsap.to(`#layer-3-${themeSuffix}`, {
                scrollTrigger: {
                    trigger: '#hero',
                    start: 'top top',
                    end: '50% top',
                    scrub: true,
                },
                ease: 'none',
                yPercent: +103,
            });

            gsap.to(`#layer-4-${themeSuffix}`, {
                scrollTrigger: {
                    trigger: '#hero',
                    start: 'top top',
                    end: '50% top',
                    scrub: true,
                },
                ease: 'none',
                yPercent: +106,
            });

            gsap.to(`#layer-5-${themeSuffix}`, {
                scrollTrigger: {
                    trigger: '#hero',
                    start: 'top top',
                    end: '50% top',
                    scrub: true,
                },
                ease: 'none',
                yPercent: +110,
            });

            gsap.to(`#layer-6-${themeSuffix}`, {
                scrollTrigger: {
                    trigger: '#hero',
                    start: 'top top',
                    end: '50% top',
                    scrub: true,
                },
                ease: 'none',
                yPercent: +115,
            });

            gsap.to(`#layer-7-${themeSuffix}`, {
                scrollTrigger: {
                    trigger: '#hero',
                    start: 'top top',
                    end: '50% top',
                    scrub: true,
                },
                ease: 'none',
                yPercent: +121,
            });

            gsap.to(`#layer-8-${themeSuffix}`, {
                scrollTrigger: {
                    trigger: '#hero',
                    start: 'top top',
                    end: '50% top',
                    scrub: true,
                },
                ease: 'none',
                yPercent: +128,
            });

            gsap.to(`#layer-9-${themeSuffix}`, {
                scrollTrigger: {
                    trigger: '#hero',
                    start: 'top top',
                    end: '50% top',
                    scrub: true,
                },
                ease: 'none',
                yPercent: +85,
            });
        };

        // Start initialization after a frame to ensure DOM is ready
        requestAnimationFrame(initializeAnimations);

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [themeSuffix]); // Re-run when theme changes

    return (
        <section id="hero" className="relative h-[200vh] overflow-hidden" ref={heroRef}>
            <div className="sticky top-0 h-screen">
                <Image
                    src={`/parallax/${themeFolder}/layer-9-${themeSuffix}.webp`}
                    alt={`layer 9 ${themeSuffix}`}
                    fill
                    className="object-cover"
                    id={`layer-9-${themeSuffix}`}
                    ref={(el) => {
                        layerRefs.current[8] = el;
                    }}
                    quality={100}
                />
                <Image
                    src={`/parallax/${themeFolder}/layer-8-${themeSuffix}.webp`}
                    alt={`layer 8 ${themeSuffix}`}
                    fill
                    className="object-cover"
                    id={`layer-8-${themeSuffix}`}
                    ref={(el) => {
                        layerRefs.current[7] = el;
                    }}
                    quality={100}
                />
                <Image
                    src={`/parallax/${themeFolder}/layer-7-${themeSuffix}.webp`}
                    alt={`layer 7 ${themeSuffix}`}
                    fill
                    className="object-cover"
                    id={`layer-7-${themeSuffix}`}
                    ref={(el) => {
                        layerRefs.current[6] = el;
                    }}
                    quality={100}
                />
                <Image
                    src={`/parallax/${themeFolder}/layer-6-${themeSuffix}.webp`}
                    alt={`layer 6 ${themeSuffix}`}
                    fill
                    className="object-cover"
                    id={`layer-6-${themeSuffix}`}
                    ref={(el) => {
                        layerRefs.current[5] = el;
                    }}
                    quality={100}
                />
                <Image
                    src={`/parallax/${themeFolder}/layer-5-${themeSuffix}.webp`}
                    alt={`layer 5 ${themeSuffix}`}
                    fill
                    className="object-cover"
                    id={`layer-5-${themeSuffix}`}
                    ref={(el) => {
                        layerRefs.current[4] = el;
                    }}
                    quality={100}
                />
                <Image
                    src={`/parallax/${themeFolder}/layer-4-${themeSuffix}.webp`}
                    alt={`layer 4 ${themeSuffix}`}
                    fill
                    className="object-cover"
                    id={`layer-4-${themeSuffix}`}
                    ref={(el) => {
                        layerRefs.current[3] = el;
                    }}
                    quality={100}
                />
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center"
                    id="hero-text"
                >
                    <div className="mb-6">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            Hello, I&apos;m
                        </span>
                    </div>

                    <h1 className="mb-6 text-4xl leading-tight font-bold text-gray-900 md:text-6xl lg:text-7xl dark:text-white">
                        Nathan Angelo Stenlie
                    </h1>

                    <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 md:text-2xl dark:text-gray-400">
                        I build for the web. Full-stack developer crafting digital experiences with
                        modern technologies.
                    </p>
                </div>
                <Image
                    src={`/parallax/${themeFolder}/layer-3-${themeSuffix}.webp`}
                    alt={`layer 3 ${themeSuffix}`}
                    fill
                    className="object-cover"
                    id={`layer-3-${themeSuffix}`}
                    ref={(el) => {
                        layerRefs.current[2] = el;
                    }}
                    quality={100}
                    unoptimized={true}
                />

                <Image
                    src={`/parallax/${themeFolder}/layer-2-${themeSuffix}.webp`}
                    alt={`layer 2 ${themeSuffix}`}
                    fill
                    className="object-cover"
                    id={`layer-2-${themeSuffix}`}
                    ref={(el) => {
                        layerRefs.current[1] = el;
                    }}
                    quality={100}
                    unoptimized={true}
                />
                <Image
                    src={`/parallax/${themeFolder}/layer-1-${themeSuffix}.webp`}
                    alt={`layer 1 ${themeSuffix}`}
                    fill
                    className="object-cover"
                    id={`layer-1-${themeSuffix}`}
                    ref={(el) => {
                        layerRefs.current[0] = el;
                    }}
                    quality={100}
                    unoptimized={true}
                />
            </div>
        </section>
    );
}
