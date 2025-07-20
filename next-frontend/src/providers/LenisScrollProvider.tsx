"use client";

import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cancelFrame, frame } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

type Props = {
	children: React.ReactNode;
};

const ScrollProvider = ({ children }: Props) => {
	const lenisRef = useRef<LenisRef>(null);

	useEffect(() => {
		const updateGSAP = (time: number) => {
			lenisRef.current?.lenis?.raf(time * 1000);
		};

		gsap.ticker.add(updateGSAP);
		gsap.ticker.lagSmoothing(0);

		const updateFramer = ({ timestamp }: { timestamp: number }) => {
			lenisRef.current?.lenis?.raf(timestamp);
		};

		frame.update(updateFramer, true);

		return () => {
			gsap.ticker.remove(updateGSAP);
			cancelFrame(updateFramer);
		};
	}, []);

	return (
		<ReactLenis
			root
			ref={lenisRef}
			options={{
				autoRaf: false,
				lerp: 0.1,
				duration: 1.2,
				smoothWheel: true,
			}}
		>
			{children}
		</ReactLenis>
	);
};

export default ScrollProvider;
