"use client";

import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cancelFrame, frame } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface LenisOptions {
	duration?: number;
	easing?: (t: number) => number;
	wheelMultiplier?: number;
	touchMultiplier?: number;
	infinite?: boolean;
	smoothWheel?: boolean;
	autoRaf?: boolean;
}

interface LenisProviderProps {
	children: ReactNode;
	options?: LenisOptions;
}

// Optimized default options for smooth scrolling
const defaultOptions = {
	duration: 1.2, // Scroll animation duration
	easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
	wheelMultiplier: 1, // Mouse wheel sensitivity
	touchMultiplier: 2, // Touch scroll sensitivity (better mobile UX)
	infinite: false, // Disable infinite scroll
	smoothWheel: true, // Enable smooth wheel scrolling
} as const;

export function LenisProvider({ children, options = {} }: LenisProviderProps) {
	const lenisRef = useRef<LenisRef>(null);

	useEffect(() => {
		// Skip in SSR or test environments
		if (typeof window === "undefined") return;

		function update(data: { timestamp: number }) {
			try {
				const time = data.timestamp;
				const lenis = lenisRef.current?.lenis;

				if (lenis) {
					lenis.raf(time);
					ScrollTrigger.update();
				}
			} catch (error) {
				if (process.env.NODE_ENV === "development") {
					console.warn("Lenis update error:", error);
				}
			}
		}

		frame.update(update, true);

		return () => {
			try {
				cancelFrame(update);
			} catch (error) {
				if (process.env.NODE_ENV === "development") {
					console.warn("Lenis cleanup error:", error);
				}
			}
		};
	}, []);

	return (
		<ReactLenis
			root
			options={{
				...defaultOptions,
				...options,
				autoRaf: false, // Always override - we control RAF
			}}
			ref={lenisRef}
		>
			{children}
		</ReactLenis>
	);
}
