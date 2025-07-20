"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";

export default function ScrollAwareHeader() {
	const [showHeader, setShowHeader] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY > lastScrollY && currentScrollY > 50) {
				setShowHeader(false);
			} else if (currentScrollY < lastScrollY) {
				setShowHeader(true);
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);

	const lenis = useLenis();

	const handleScroll = (id: string) => {
		const el = document.getElementById(id);
		if (el && lenis) {
			lenis.scrollTo(el);
		}
	};

	return (
		<AnimatePresence>
			<motion.header
				initial={{ y: 0 }}
				animate={{ y: showHeader ? 0 : -100 }}
				exit={{ y: -100 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className="fixed top-0 left-0 w-full z-50 shadow-md backdrop-blur-sm"
			>
				<nav className="flex justify-between items-center max-w-5xl mx-auto px-4 py-3">
					<h1 className="text-xl font-bold">NAS</h1>
					<div className="space-x-4">
						{["home", "about", "projects", "contact"].map((section) => (
							<button
								key={section}
								onClick={() => handleScroll(section)}
								className="hover:text-primary transition-colors capitalize"
							>
								{section}
							</button>
						))}
					</div>
				</nav>
			</motion.header>
		</AnimatePresence>
	);
}
