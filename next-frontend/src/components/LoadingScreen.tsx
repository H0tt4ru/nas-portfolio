"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(false);
	}, []);

	return (
		<>
			<AnimatePresence>
				{loading && (
					<motion.div
						className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white"
						initial={{ opacity: 1 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 1 }}
					>
						<h1 className="text-3xl font-bold animate-pulse">Loading...</h1>
					</motion.div>
				)}
			</AnimatePresence>
			{!loading && children}
		</>
	);
}
