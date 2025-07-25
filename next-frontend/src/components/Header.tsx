"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLenis } from "lenis/react";
import { Sun } from "lucide-react";

export default function ScrollAwareHeader() {
	const navItems = ["Projects", "About", "Blog", "Contact"];

	const [showHeader, setShowHeader] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY > lastScrollY && currentScrollY > 0) {
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
				className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 font-mono"
			>
				<div className="max-w-6xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<motion.div
							whileHover={{ scale: 1.05 }}
							className="text-xl font-bold"
						>
							<span className="text-blue-600 dark:text-blue-400">NAS</span>
						</motion.div>

						<nav className="hidden md:flex items-center space-x-8">
							{navItems.map((item, index) => (
								<motion.a
									key={item}
									href={`#${item.toLowerCase()}`}
									className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 + 0.3 }}
									whileHover={{ y: -2 }}
									onClick={() => handleScroll(item.toLowerCase())}
								>
									{item}
								</motion.a>
							))}
						</nav>
						<Button
							variant="ghost"
							size="icon"
							className="ml-4"
						>
							<motion.div
								initial={false}
								transition={{ duration: 0.3 }}
							>
								<Sun />
							</motion.div>
						</Button>
					</div>
				</div>
			</motion.header>
		</AnimatePresence>
	);
}
