"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEasterEggStore } from "@/stores/easterEgg";

export default function Footer() {
	const { easterEgg } = useEasterEggStore();
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	return (
		<motion.footer
			className="py-8 px-6 border-t border-gray-200 dark:border-gray-800"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 0.6 }}
			viewport={{ once: true }}
		>
			<div className="max-w-6xl mx-auto">
				<div className="flex flex-col md:flex-row items-center justify-between">
					<div className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
						Try Finger, But Hole
					</div>

					<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
						<Image
							src="/logo.png"
							alt="NAS"
							width={24}
							height={24}
							className="h-6 w-auto"
							style={{
								filter: easterEgg
									? 'invert(1) sepia(0.8) saturate(4) hue-rotate(5deg)'
									: mounted && resolvedTheme === 'dark'
										? 'invert(1)'
										: 'none',
							}}
						/>
						Developer Portfolio
					</div>
				</div>
			</div>
		</motion.footer>
	);
}
