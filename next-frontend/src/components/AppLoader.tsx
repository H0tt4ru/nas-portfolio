'use client';

import { useState, useEffect, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useTheme } from 'next-themes';

// Central configuration for easy tweaking
const LOADER_CONFIG = {
    minLoadTime: 2000, // Minimum loading time (ms) - ensures users see the coffee
    maxLoadTime: 4000, // Maximum loading time (ms) - prevents infinite loading
    exitDuration: 0.8, // Exit animation duration (seconds)
    textDelay: 0.8, // Delay before text appears (seconds)
} as const;

interface AppLoaderProps {
    children: ReactNode;
}

// Animation variants for better performance and type safety
const containerVariants: Variants = {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: {
        opacity: 0,
        transition: {
            duration: LOADER_CONFIG.exitDuration,
            ease: 'easeInOut',
        },
    },
};

const coffeeVariants: Variants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
};

const textVariants: Variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
};

const contentVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
};

export default function AppLoader({ children }: AppLoaderProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);
    const hasMountedRef = useRef<boolean>(false);
    const timeoutsRef = useRef<{
        loading?: NodeJS.Timeout;
        safety?: NodeJS.Timeout;
    }>({});

    // Get current theme
    const { theme, resolvedTheme } = useTheme();

    // Handle hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        // Prevent double execution in development
        if (hasMountedRef.current) return;
        hasMountedRef.current = true;

        try {
            // Simple loading timer
            timeoutsRef.current.loading = setTimeout(() => {
                setLoading(false);
            }, LOADER_CONFIG.minLoadTime);

            // Safety net - never load longer than max time
            timeoutsRef.current.safety = setTimeout(() => {
                setLoading(false);
            }, LOADER_CONFIG.maxLoadTime);
        } catch (err) {
            // Fallback if timers fail
            console.warn('AppLoader: Timer setup failed, loading immediately');
            console.log(err);
            setError(true);
            setLoading(false);
        }

        // Copy ref value to local variable for cleanup
        const timeouts = timeoutsRef.current;

        // Cleanup function
        return () => {
            if (timeouts.loading) {
                clearTimeout(timeouts.loading);
            }
            if (timeouts.safety) {
                clearTimeout(timeouts.safety);
            }
        };
    }, []);

    // Error fallback - show content immediately
    if (error) {
        return <>{children}</>;
    }

    // Determine theme for styling (fallback to light during hydration)
    const currentTheme = mounted ? resolvedTheme || theme : 'light';
    const isDark = currentTheme === 'dark';

    // Theme-aware background classes
    const backgroundClasses = isDark
        ? 'bg-gradient-to-br from-gray-900 to-black'
        : 'bg-gradient-to-br from-zinc-50 to-zinc-100';

    // Theme-aware text classes
    const titleClasses = isDark
        ? 'text-zinc-50 font-mono font-light text-lg mb-2'
        : 'text-gray-900 font-mono font-light text-lg mb-2';

    const subtitleClasses = isDark
        ? 'text-gray-400 font-mono text-sm'
        : 'text-gray-600 font-mono text-sm';

    return (
        <>
            <AnimatePresence mode="wait">
                {loading && (
                    <motion.div
                        variants={containerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className={`fixed inset-0 z-50 ${backgroundClasses} flex flex-col items-center justify-center transition-colors duration-300`}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="loading-title"
                        aria-describedby="loading-description"
                    >
                        {/* Screen reader announcement */}
                        <div className="sr-only" aria-live="polite" aria-atomic="true">
                            Portfolio is loading, please wait...
                        </div>

                        {/* Coffee Animation - EXACTLY AS YOU PROVIDED - UNTOUCHED */}
                        <motion.div
                            className="coffee relative"
                            variants={coffeeVariants}
                            initial="initial"
                            animate="animate"
                            transition={{
                                duration: 0.6,
                                ease: 'easeOut',
                                delay: 0.2,
                            }}
                            aria-hidden="true"
                        >
                            <div></div>
                            <div></div>
                            <div></div>
                        </motion.div>

                        {/* Text Below Coffee - Updated for theme support */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-10 transform text-center"
                            variants={textVariants}
                            initial="initial"
                            animate="animate"
                            transition={{
                                duration: 0.8,
                                ease: 'easeOut',
                                delay: LOADER_CONFIG.textDelay,
                            }}
                        >
                            <h1 id="loading-title" className={titleClasses}>
                                Loading Portfolio
                            </h1>
                            <p id="loading-description" className={subtitleClasses}>
                                Brewing something amazings
                            </p>
                        </motion.div>

                        {/* Loading progress indicator for screen readers */}
                        <div className="sr-only" role="status" aria-live="polite">
                            <span className="sr-only">Loading in progress</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main App Content */}
            <AnimatePresence>
                {!loading && (
                    <motion.div
                        variants={contentVariants}
                        initial="initial"
                        animate="animate"
                        transition={{
                            duration: 0.5,
                            ease: 'easeOut',
                        }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
