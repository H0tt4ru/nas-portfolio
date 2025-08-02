'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function AppLoader({ children }: Readonly<{ children: React.ReactNode }>) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const text = 'Brewing something amazing';
    const textLength = text.length;
    const totalAnimationTime = 1.2;
    const calculateDelay = () => {
        const minDelay = 0.025;
        const maxDelay = 0.05;
        const calculatedDelay = totalAnimationTime / textLength;
        return Math.max(minDelay, Math.min(maxDelay, calculatedDelay));
    };
    const smartDelay = calculateDelay();

    return (
        <>
            <AnimatePresence
                mode="wait"
                onExitComplete={() => console.log('Exit animation complete')}
            >
                {isLoading && (
                    <motion.div
                        key="loader" // Add unique key
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            scale: 1, // Optional: slight scale for better effect
                        }}
                        transition={{
                            duration: 0.5, // Longer duration for smoother exit
                            ease: 'easeInOut',
                        }}
                        className="fixed z-50 flex h-screen w-screen items-center justify-center overflow-hidden bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50"
                    >
                        <div className="coffee relative">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <h1 className="absolute top-1/2 left-1/2 flex -translate-x-1/2 translate-y-10">
                            {text.split('').map((char, idx) => (
                                <motion.span
                                    key={idx}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: 'backInOut',
                                        delay: idx * smartDelay,
                                    }}
                                >
                                    {char === ' ' ? '\u00A0' : char}
                                </motion.span>
                            ))}
                        </h1>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Render children outside AnimatePresence for immediate display */}
            {!isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {children}
                </motion.div>
            )}
        </>
    );
}
