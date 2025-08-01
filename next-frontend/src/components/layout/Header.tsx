'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export default function Header() {
    const navItems = ['Projects', 'About', 'Blog', 'Contact'];
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mounted, setMounted] = useState(false);

    // Theme hook - GET RESOLVED THEME
    const { theme, setTheme, resolvedTheme } = useTheme();

    // Smooth scroll hook
    const { scrollTo, scrollToTop } = useSmoothScroll();

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 0) {
                setShowHeader(false);
            } else if (currentScrollY < lastScrollY) {
                setShowHeader(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // Scroll to section
    const handleScrollToSection = (id: string) => {
        scrollTo(id);
    };

    // Toggle theme
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    // GET ACTUAL THEME - THIS IS THE FIX!
    const getActualTheme = () => {
        if (!mounted) return 'light'; // Fallback during hydration

        // If theme is 'system', use resolvedTheme
        // Otherwise use the selected theme
        return theme === 'system' ? resolvedTheme : theme;
    };

    // Get icon based on ACTUAL theme (not just theme setting)
    const getThemeIcon = () => {
        if (!mounted) return <Sun className="h-5 w-5" />;

        const actualTheme = getActualTheme();
        return actualTheme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />;
    };

    // Get accessible label
    const getThemeLabel = () => {
        if (!mounted) return 'Toggle theme';

        const actualTheme = getActualTheme();
        return actualTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    };

    return (
        <AnimatePresence>
            {showHeader && (
                <motion.header
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    exit={{ y: -100 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="fixed top-0 right-0 left-0 z-40 border-b border-gray-200 bg-zinc-50/80 font-mono backdrop-blur-md transition-colors duration-300 dark:border-gray-800 dark:bg-black/80"
                >
                    <div className="mx-auto max-w-6xl px-6 py-4">
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="cursor-pointer text-xl font-bold text-gray-900 dark:text-zinc-50"
                                onClick={() => scrollToTop()}
                            >
                                <span className="text-blue-600 dark:text-blue-400">NAS</span>
                            </motion.div>

                            {/* Desktop Navigation */}
                            <nav className="hidden items-center space-x-8 md:flex">
                                {navItems.map((item, index) => (
                                    <motion.button
                                        key={item}
                                        className="text-sm text-gray-900 transition-colors duration-200 hover:text-blue-600 dark:text-zinc-50 dark:hover:text-blue-400"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 + 0.3 }}
                                        whileHover={{ y: -2 }}
                                        onClick={() => handleScrollToSection(item.toLowerCase())}
                                    >
                                        {item}
                                    </motion.button>
                                ))}
                            </nav>

                            {/* Theme Toggle Button - FIXED SYSTEM DETECTION */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="ml-4 text-gray-900 transition-colors duration-200 hover:bg-gray-100 dark:text-zinc-50 dark:hover:bg-gray-800"
                                onClick={toggleTheme}
                                aria-label={getThemeLabel()}
                                title={getThemeLabel()}
                            >
                                <motion.div
                                    key={`${theme}-${resolvedTheme}`} // Re-animate when either changes
                                    initial={{ scale: 0.8, rotate: -90 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {getThemeIcon()}
                                </motion.div>
                            </Button>
                        </div>
                    </div>
                </motion.header>
            )}
        </AnimatePresence>
    );
}
