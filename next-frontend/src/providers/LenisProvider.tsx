"use client";

import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cancelFrame, frame } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface LenisProviderProps {
	children: ReactNode;
	options?: Record<string, unknown>;
}

export function LenisProvider({ children, options = {} }: LenisProviderProps) {
	const lenisRef = useRef<LenisRef>(null);

	useEffect(() => {
		// Use Framer Motion's frame system for RAF
		function update(data: { timestamp: number }) {
			const time = data.timestamp;
			lenisRef.current?.lenis?.raf(time);

			// Update GSAP ScrollTrigger on each frame
			ScrollTrigger.update();
		}

		frame.update(update, true);
		return () => cancelFrame(update);
	}, []);

	return (
		<ReactLenis
			root
			options={{ ...options, autoRaf: false }}
			ref={lenisRef}
		>
			{children}
		</ReactLenis>
	);
}
