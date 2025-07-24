"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.3,
			},
		},
	};

	return (
		<section className="min-h-screen flex items-center justify-center px-6 pt-20">
			<motion.div
				className="max-w-4xl mx-auto text-center"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.div className="mb-6">
					<span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
						Hello, I&#39;m
					</span>
				</motion.div>

				<motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
					Nathan Angelo Stenlie
				</motion.h1>

				<motion.p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
					I build for the web. Full-stack developer crafting digital experiences
					with modern technologies.
				</motion.p>

				<motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
					<Button
						size="lg"
						className="font-mono"
					>
						View My Work
					</Button>
					<Button
						variant="outline"
						size="lg"
						className="font-mono bg-transparent"
					>
						Get In Touch
					</Button>
				</motion.div>

				<motion.div className="flex items-center justify-center space-x-6">
					{[
						{ icon: Github, href: "#", label: "GitHub" },
						{ icon: Linkedin, href: "#", label: "LinkedIn" },
						{ icon: Mail, href: "#", label: "Email" },
					].map(({ icon: Icon, href, label }) => (
						<motion.a
							key={label}
							href={href}
							className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
							whileHover={{ scale: 1.1, y: -2 }}
							whileTap={{ scale: 0.95 }}
						>
							<Icon className="h-5 w-5" />
						</motion.a>
					))}
				</motion.div>

				<motion.div
					className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
				>
					<ArrowDown className="h-6 w-6 text-gray-400" />
				</motion.div>
			</motion.div>
		</section>
	);
}
