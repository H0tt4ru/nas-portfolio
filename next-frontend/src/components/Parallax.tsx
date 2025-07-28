"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxBackground() {
	const layerRefs = useRef<(HTMLImageElement | null)[]>([]);

	useEffect(() => {
		const totalLayers = layerRefs.current.length;
		layerRefs.current.forEach((layer, i) => {
			if (!layer) return;
			const depth = -(totalLayers - i) * 50; // 👈 negative makes image scroll **down** with you
			gsap.to(layer, {
				y: `${depth}px`,
				ease: "none",
				scrollTrigger: {
					trigger: document.body,
					start: "top top",
					end: "bottom bottom",
					scrub: true,
				},
			});
		});
	}, []);

	return (
		<div className="fixed top-0 left-0 w-full h-full z-50 pointer-events-none">
			{[...Array(9)].map((_, i) => (
				<Image
					key={i}
					ref={(el) => {
						layerRefs.current[i] = el;
					}}
					src={`/parallax/sunny/layer-${i + 1}-sunny.webp`}
					alt=""
					fill
					className="absolute w-full h-full object-cover"
					style={{ zIndex: 100 - i }} // 👈 100 = front, 91 = back
					sizes="100vw"
					priority={i === 0}
				/>
			))}
		</div>
	);
}
