"use client";

import { motion } from "framer-motion";

export default function Footer() {
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
					<motion.div
						className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0"
						whileHover={{ scale: 1.05 }}
					>
						© 2024 Nathan Angelo Stenlie. Built with Next.js & Framer Motion.
					</motion.div>

					<motion.div
						className="text-sm text-gray-600 dark:text-gray-400"
						whileHover={{ scale: 1.05 }}
					>
						<span className="text-blue-600 dark:text-blue-400">NAS27</span> •
						Developer Portfolio
					</motion.div>
				</div>
			</div>
		</motion.footer>
	);
}
