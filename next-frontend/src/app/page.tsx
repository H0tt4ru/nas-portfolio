"use client";

import { motion } from "framer-motion";

export default function Home() {
	return (
		<main className="flex flex-col">
			<Section1 />
			<Section2 />
		</main>
	);
}

function Section1() {
	return (
		<section
			id="home"
			className="h-screen w-screen bg-red-500"
		>
			<h1 className="text-2xl font-bold">Section 1</h1>
			<p>This is the first section of the page.</p>
		</section>
	);
}

function Section2() {
	return (
		<section
			id="about"
			className="h-screen w-screen bg-blue-500 relative"
		>
			<motion.div
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-20 min-h-20 bg-white"
				initial={{ scale: 0, opacity: 0 }}
				whileInView={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				viewport={{ once: false, amount: 0.5 }}
			/>
			<h1 className="text-2xl font-bold">Section 2</h1>
			<p>This is the second section of the page.</p>
		</section>
	);
}
