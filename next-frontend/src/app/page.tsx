"use client";
import axios from "axios";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const getAiResponse = async (prompt: string) => {
	try {
		const res = await axios.post("/api/gemini", {
			contents: [
				{
					parts: [
						{
							text: prompt,
						},
					],
				},
			],
		});
		console.log("Gemini Response:", res.data);
		return res.data;
	} catch (err) {
		console.error("Error from Gemini route:", err);
		return { text: "Error fetching AI response." };
	}
};

export default function Home() {
	return (
		<main className="flex flex-col">
			<Section1 />
			<Section2 />
		</main>
	);
}

function Section1() {
	const [aiResponse, setAiResponse] = useState("Loading...");
	const hasFetchedRef = useRef(false);
	const textRef = useRef<HTMLHeadingElement>(null);

	// Track scroll progress specifically for the text element
	const { scrollYProgress } = useScroll({
		target: textRef,
		offset: ["start end", "end start"],
	});

	// Create parallax effect that keeps text centered when section is in view
	const y = useTransform(
		scrollYProgress,
		[0, 0.5, 1],
		[100, 0, -100] // Starts below, centers when section is middle of viewport, moves up
	);

	useEffect(() => {
		if (hasFetchedRef.current) return;
		hasFetchedRef.current = true;

		getAiResponse(
			"Send me a greeting in a brain rot tone use https://pdftobrainrot.org/blog/brain-rot-words-explained-from-oxford-dictionary-to-tiktok-trends. One sentence. Maximum 6 words. No context needed."
		).then((data) => {
			setAiResponse(data.text || JSON.stringify(data));
		});
	}, []);

	return (
		<section
			id="home"
			className="relative h-screen w-screen bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex items-center justify-center overflow-hidden"
		>
			{/* Background decoration */}
			<div className="absolute inset-0">
				<div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl" />
				<div className="absolute bottom-32 right-32 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
				<div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-lg" />
			</div>

			{/* AI Response with parallax */}
			<motion.h1
				ref={textRef}
				className="relative z-10 text-4xl md:text-6xl font-bold text-white text-center px-8 max-w-4xl"
				style={{ y }}
				initial={{ scale: 0.9 }}
				animate={{ scale: 1 }}
				transition={{
					duration: 1,
					ease: [0.23, 1, 0.32, 1], // Custom easing
				}}
			>
				{aiResponse}
			</motion.h1>

			{/* Scroll indicator */}
			<motion.div
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 1.5, duration: 0.8 }}
			>
				<motion.div
					className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
					animate={{ y: [0, 8, 0] }}
					transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
				>
					<div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
				</motion.div>
			</motion.div>
		</section>
	);
}

function Section2() {
	const sectionRef = useRef<HTMLElement>(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

	return (
		<section
			ref={sectionRef}
			id="about"
			className="relative h-screen w-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center flex-col overflow-hidden"
		>
			{/* Parallax background */}
			<motion.div
				className="absolute inset-0 bg-gradient-to-t from-blue-800/20 to-transparent"
				style={{ y: backgroundY }}
			/>

			{/* Main content */}
			<div className="relative z-10 text-center">
				<motion.div
					className="w-20 h-20 bg-white rounded-xl mb-8 mx-auto shadow-2xl"
					initial={{ scale: 0, opacity: 0, rotateZ: -180 }}
					whileInView={{ scale: 1, opacity: 1, rotateZ: 0 }}
					transition={{
						duration: 0.8,
						ease: "backOut",
						type: "spring",
						stiffness: 100,
					}}
					viewport={{ once: false, amount: 0.5 }}
					whileHover={{
						scale: 1.1,
						rotateZ: 5,
						transition: { duration: 0.3 },
					}}
				/>

				<motion.h1
					className="text-4xl md:text-5xl font-bold text-white mb-4"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					viewport={{ once: false, amount: 0.5 }}
				>
					Section 2
				</motion.h1>

				<motion.p
					className="text-xl text-white/80 max-w-2xl mx-auto px-8"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					viewport={{ once: false, amount: 0.5 }}
				>
					This is the second section of the page with beautiful animations and
					parallax effects.
				</motion.p>
			</div>

			{/* Decorative elements */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-32 right-20 w-24 h-24 bg-white/5 rounded-full blur-xl" />
				<div className="absolute bottom-40 left-32 w-36 h-36 bg-white/10 rounded-full blur-2xl" />
			</div>
		</section>
	);
}
