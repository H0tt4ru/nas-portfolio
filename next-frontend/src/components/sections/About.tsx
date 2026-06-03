"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const skills = {
	Backend: ["Go", "Gin", "GoFiber", "Java", "Spring Boot", "Node.js", "Express.js"],
	"Frontend & Mobile": ["Next.js", "Flutter", "Dart"],
	Tools: ["Git", "PostgreSQL", "Redis", "Docker", "Jenkins"],
};

const facts = [
	"Informatics student at UMN — GPA 3.79",
	"Based in Tangerang, Indonesia",
	"1-year internship in banking software (HiBank)",
	"Solana Frontier Hackathon 2026 participant",
];

export default function About() {
	return (
		<section
			id="about"
			className="py-20 px-6 bg-gray-50 dark:bg-gray-800/50"
		>
			<div className="max-w-6xl mx-auto">
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
					<p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						Informatics student and software developer based in Tangerang,
						Indonesia — building backend systems, full-stack platforms, and
						mobile applications.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<h3 className="text-2xl font-bold mb-6">My Story</h3>
						<div className="space-y-4 text-gray-600 dark:text-gray-400">
							<p>
								I&#39;m Nathan Angelo Stenlie, an Informatics student at
								Universitas Multimedia Nusantara with a strong focus on backend
								engineering and full-stack development. I&#39;m drawn to building
								software that works at real scale — systems that real people
								depend on.
							</p>
							<p>
								Most recently, I spent a year as a Junior Backend Developer
								Intern at PT Infosys Solusi Terpadu, contributing to HiBank — a
								mobile banking app with over 100,000 active users — as part of a
								27-person engineering team. I also built a school scheduling
								engine that cut planning time from days to under two minutes, and
								competed in the Solana Frontier Hackathon 2026.
							</p>
							<p>
								I care about clean, well-tested code and enjoy working in teams
								where technical depth and product thinking go hand in hand.
							</p>
						</div>

						<div className="mt-8">
							<h4 className="text-lg font-semibold mb-4">Fun Facts</h4>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								{facts.map((fact, index) => (
									<motion.div
										key={index}
										className="text-sm text-gray-600 dark:text-gray-400"
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1, duration: 0.4 }}
										viewport={{ once: true }}
									>
										{fact}
									</motion.div>
								))}
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<h3 className="text-2xl font-bold mb-6">Skills & Technologies</h3>
						<div className="space-y-6">
							{Object.entries(skills).map(
								([category, techs], categoryIndex) => (
									<Card key={category}>
										<CardContent className="p-6">
											<h4 className="font-semibold mb-3 text-blue-600 dark:text-blue-400">
												{category}
											</h4>
											<div className="flex flex-wrap gap-2">
												{techs.map((tech, techIndex) => (
													<motion.span
														key={tech}
														className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full"
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
			</div>
		</section>
	);
}
