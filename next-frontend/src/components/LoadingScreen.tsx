"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// 👇 central config here
const ANIMATION_CONFIG = {
	wordStagger: 0.1, // seconds per word
	charStagger: 0.02, // seconds per char
	wordDuration: 0.5, // seconds for each word to fade in
	charDuration: 0.3, // seconds for each char to fade in
	buffer: 2, // extra delay after animation
};

export default function LoadingWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const [loading, setLoading] = useState(true);
	const hasFetchedRef = useRef(false);
	const [apiResponse, setApiResponse] = useState("");

	useEffect(() => {
		if (hasFetchedRef.current) return;
		hasFetchedRef.current = true;

		const fetchQuote = async () => {
			try {
				const res = await axios.get("/api/quote");
				const quote = res.data.q;
				setApiResponse(quote);

				// calculate delay dynamically
				const wordCount = quote.split(" ").length;
				const charCount = quote.length;

				const wordDelay = ANIMATION_CONFIG.wordStagger * wordCount;
				const charDelay = ANIMATION_CONFIG.charStagger * charCount;
				const maxDelay = Math.max(wordDelay, charDelay);

				const totalDelay = (maxDelay + ANIMATION_CONFIG.buffer) * 1000;

				setTimeout(() => {
					setLoading(false);
				}, totalDelay);
			} catch {
				setApiResponse("Failed to fetch quote.");
				setTimeout(() => setLoading(false), 2000); // fallback delay
			}
		};

		fetchQuote();
	}, []);

	return (
		<>
			<AnimatePresence>
				{loading && (
					<motion.div
						initial={{ scale: 1 }}
						animate={{ scale: 1 }}
						exit={{ scale: 50 }}
						transition={{ duration: 0.5, ease: "easeOut" }}
						className="relative w-screen h-screen z-50 bg-black flex items-center justify-center"
					>
						{/* Coffee stays centered */}
						<div className="coffee relative z-10">
							<div></div>
							<div></div>
							<div></div>
						</div>

						{/* Text animates below */}
						<motion.h1
							className="absolute text-white font-mono font-thin text-center w-1/3 mx-40 text-base top-1/2 translate-y-8"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.8,
								ease: "easeInOut",
								delay: 0.3,
							}}
						>
							{apiResponse.split(" ").map((word, wordIndex) => (
								<motion.span
									key={wordIndex}
									className="inline-block mr-1"
									style={{ whiteSpace: "nowrap" }}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: ANIMATION_CONFIG.wordDuration,
										ease: "easeOut",
										delay: ANIMATION_CONFIG.wordStagger * wordIndex,
									}}
								>
									{word.split("").map((char, charIndex) => (
										<motion.span
											key={charIndex}
											className="inline-block"
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												duration: ANIMATION_CONFIG.charDuration,
												ease: "easeOut",
												delay: ANIMATION_CONFIG.charStagger * charIndex,
											}}
										>
											{char}
										</motion.span>
									))}
								</motion.span>
							))}
						</motion.h1>
					</motion.div>
				)}
			</AnimatePresence>
			{!loading && children}
		</>
	);
}
