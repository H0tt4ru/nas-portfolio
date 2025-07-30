import { useLenis } from 'lenis/react';

/**
 * Custom hook for smooth scrolling using Lenis
 * Provides easy-to-use scroll functions for navigation and interactions
 */
export const useSmoothScroll = () => {
    const lenis = useLenis();

    /**
     * Scroll to a specific target
     * @param target - CSS selector string, element, or scroll position
     * @param options - Optional scroll options
     */
    const scrollTo = (
        target: string | HTMLElement | number,
        options?: {
            offset?: number;
            duration?: number;
            easing?: (t: number) => number;
        }
    ) => {
        if (!lenis) {
            console.warn('Lenis not initialized');
            return;
        }

        try {
            if (typeof target === 'string') {
                // Handle ID selector (e.g., "projects" or "#projects")
                const id = target.startsWith('#') ? target.slice(1) : target;
                const element = document.getElementById(id);

                if (element) {
                    // PURE CALL - just like your Header function
                    if (options) {
                        lenis.scrollTo(element, options);
                    } else {
                        lenis.scrollTo(element); // ← NO OPTIONS = PURE LENIS BEHAVIOR
                    }
                } else {
                    console.warn(`Element with id "${id}" not found`);
                }
            } else if (target instanceof HTMLElement) {
                // Handle direct element reference
                if (options) {
                    lenis.scrollTo(target, options);
                } else {
                    lenis.scrollTo(target); // ← PURE CALL
                }
            } else if (typeof target === 'number') {
                // Handle scroll position
                if (options) {
                    lenis.scrollTo(target, options);
                } else {
                    lenis.scrollTo(target); // ← PURE CALL
                }
            }
        } catch (error) {
            console.error('Scroll error:', error);
        }
    };

    /**
     * Scroll to the top of the page
     */
    const scrollToTop = (options?: { duration?: number }) => {
        if (!lenis) return;

        try {
            if (options) {
                lenis.scrollTo(0, options);
            } else {
                lenis.scrollTo(0); // ← PURE CALL
            }
        } catch (error) {
            console.error('Scroll to top error:', error);
        }
    };

    /**
     * Scroll to the bottom of the page
     */
    const scrollToBottom = (options?: { duration?: number }) => {
        if (!lenis) return;

        try {
            if (options) {
                lenis.scrollTo(document.body.scrollHeight, options);
            } else {
                lenis.scrollTo(document.body.scrollHeight); // ← PURE CALL
            }
        } catch (error) {
            console.error('Scroll to bottom error:', error);
        }
    };

    /**
     * Scroll by a specific amount
     * @param delta - Amount to scroll (positive = down, negative = up)
     */
    const scrollBy = (delta: number, options?: { duration?: number }) => {
        if (!lenis) return;

        try {
            const currentScroll = window.scrollY;
            if (options) {
                lenis.scrollTo(currentScroll + delta, options);
            } else {
                lenis.scrollTo(currentScroll + delta); // ← PURE CALL
            }
        } catch (error) {
            console.error('Scroll by error:', error);
        }
    };

    /**
     * Start/stop smooth scrolling
     */
    const start = () => {
        if (lenis) {
            lenis.start();
        }
    };

    const stop = () => {
        if (lenis) {
            lenis.stop();
        }
    };

    /**
     * Get current scroll position
     */
    const getScrollPosition = () => {
        return {
            x: window.scrollX || 0,
            y: window.scrollY || 0,
        };
    };

    return {
        scrollTo,
        scrollToTop,
        scrollToBottom,
        scrollBy,
        start,
        stop,
        getScrollPosition,
        lenis, // Expose lenis instance for advanced usage
        isReady: !!lenis, // Boolean to check if Lenis is ready
    };
};
