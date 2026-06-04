"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useEasterEggStore } from "@/stores/easterEgg";

const skills = {
	Backend: ["Go", "Gin", "GoFiber", "Java", "Spring Boot", "Node.js", "Express.js"],
	"Frontend & Mobile": ["Next.js", "Flutter", "Dart"],
	Tools: ["Git", "PostgreSQL", "Redis", "Docker", "Jenkins"],
};


export default function About() {
	const { easterEgg } = useEasterEggStore();

	return (
		<section
			id="about"
			className="py-20 px-6 bg-zinc-100 dark:bg-zinc-950"
		>
			<div className="max-w-6xl mx-auto">
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						{easterEgg ? 'Mine Own Chronicle' : 'About Me'}
					</h2>
				</motion.div>

				<motion.div
					className="mx-auto mb-12 max-w-2xl space-y-4 text-center text-gray-600 dark:text-gray-400"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					{easterEgg ? (
						<>
							<p>
								I am Nathan Angelo Stenlie, a student of the Informatics arts at
								Universitas Multimedia Nusantara, graduating in the year 2026.
								With hands most steadfast, I hath built backend services, mobile
								apps, and full-stack creations in service of teams most worthy.
							</p>
							<p>
								I seek not merely to make things function, but to understand them
								with depth most profound — and this same curiosity I carry into
								every craft I undertake.
							</p>
						</>
					) : (
						<>
							<p>
								I&#39;m Nathan Angelo Stenlie, an Informatics student at
								Universitas Multimedia Nusantara graduating in 2026, with
								hands-on experience building backend services, mobile apps, and
								full-stack products in real teams.
							</p>
							<p>
								I care about understanding systems deeply, not just making them
								work, and I bring that same curiosity to everything I build.
							</p>
						</>
					)}
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					viewport={{ once: true }}
				>
					<h3 className="mb-6 text-center text-xl font-semibold">
						{easterEgg ? 'Arts & Instruments' : 'Skills & Technologies'}
					</h3>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						{Object.entries(skills).map(
							([category, techs], categoryIndex) => (
								<Card key={category}>
									<CardContent className="p-6">
										<h4 className="mb-3 font-semibold text-blue-600 dark:text-blue-400">
											{category}
										</h4>
										<div className="flex flex-wrap gap-2">
											{techs.map((tech, techIndex) => (
												<motion.span
													key={tech}
													className="rounded-full bg-gray-100 px-3 py-1 text-sm dark:bg-gray-700"
													initial={{ opacity: 0, scale: 0.8 }}
													whileInView={{ opacity: 1, scale: 1 }}
													transition={{
														delay: categoryIndex * 0.1 + techIndex * 0.05,
														duration: 0.3,
													}}
													viewport={{ once: true }}
													whileHover={{ scale: 1.05 }}
												>
													{tech}
												</motion.span>
											))}
										</div>
									</CardContent>
								</Card>
							)
						)}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
