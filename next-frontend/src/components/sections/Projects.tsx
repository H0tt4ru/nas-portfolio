"use client";

import { motion } from "framer-motion";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

interface Project {
	id: number;
	title: string;
	type: string;
	badge?: string;
	description: string;
	highlight?: string;
	tech: string[];
	repoUrl?: string;
	demoUrl?: string;
	storeUrl?: string;
}

const projects: Project[] = [
	{
		id: 1,
		title: "School Management System",
		type: "Full-Stack",
		description:
			"A school management platform serving 16 active classes and 28 teachers, covering scheduling, attendance, and administrative workflows.",
		highlight:
			"Scheduling engine cut semester planning from 3–10 days to under 2 minutes using a hybrid Genetic Algorithm + Simulated Annealing approach.",
		tech: ["Go", "Gin", "Flutter", "Dart"],
	},
	{
		id: 2,
		title: "HiBank",
		type: "Backend",
		badge: "Internship",
		description:
			"Contributed backend development for a mobile banking app with 100,000+ active users as part of a 27-person engineering team.",
		tech: ["Java", "Spring Boot", "PostgreSQL", "Redis"],
		storeUrl:
			"https://play.google.com/store/apps/details?id=com.hibank.mobile&hl=id&pli=1",
	},
	{
		id: 3,
		title: "Oryon",
		type: "Blockchain",
		badge: "Hackathon",
		description:
			"A Web3-based loyalty platform enabling users to earn and redeem rewards across multiple merchants within a single decentralized ecosystem, built at Solana Frontier Hackathon 2026.",
		tech: ["Solana", "Rust", "Next.js", "TypeScript"],
		repoUrl: "https://github.com/oryon-solana/oryon-smart-contract",
		demoUrl: "https://oryon-web.vercel.app/",
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.12 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 24 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Projects() {
	return (
		<section id="projects" className="py-20 px-6">
			<div className="max-w-6xl mx-auto">
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Featured Projects
					</h2>
					<p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						A selection of work spanning backend systems, mobile apps, and
						blockchain — from internships to hackathons.
					</p>
				</motion.div>

				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					{projects.map((project) => (
						<motion.div
							key={project.id}
							variants={itemVariants}
							className="h-full"
						>
							<Card className="h-full flex flex-col group hover:shadow-lg transition-shadow duration-300">
								<CardHeader>
									<div className="flex items-center gap-2 mb-2">
										<span className="px-2 py-1 text-xs bg-blue-600 text-white rounded">
											{project.type}
										</span>
										{project.badge && (
											<span className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded">
												{project.badge}
											</span>
										)}
									</div>
									<CardTitle className="text-lg">{project.title}</CardTitle>
									<CardDescription className="text-sm">
										{project.description}
									</CardDescription>
								</CardHeader>

								<CardContent className="flex flex-col flex-1 gap-4">
									{project.highlight && (
										<p className="text-xs text-gray-600 dark:text-gray-400 border-l-2 border-blue-500 pl-3">
											{project.highlight}
										</p>
									)}

									<div className="mt-auto flex flex-col gap-3">
										<div className="flex flex-wrap gap-2">
											{project.tech.map((tech) => (
												<span
													key={tech}
													className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded"
												>
													{tech}
												</span>
											))}
										</div>

										{(project.repoUrl || project.demoUrl || project.storeUrl) && (
											<div className="flex gap-2">
												{project.repoUrl && (
													<Button
														size="sm"
														variant="outline"
														className="flex-1 bg-transparent"
														asChild
													>
														<a
															href={project.repoUrl}
															target="_blank"
															rel="noopener noreferrer"
														>
															<Github className="h-4 w-4 mr-2" />
															Code
														</a>
													</Button>
												)}
												{project.demoUrl && (
													<Button
														size="sm"
														variant="outline"
														className="flex-1 bg-transparent"
														asChild
													>
														<a
															href={project.demoUrl}
															target="_blank"
															rel="noopener noreferrer"
														>
															<ExternalLink className="h-4 w-4 mr-2" />
															Website
														</a>
													</Button>
												)}
												{project.storeUrl && (
													<Button
														size="sm"
														variant="outline"
														className="flex-1 bg-transparent"
														asChild
													>
														<a
															href={project.storeUrl}
															target="_blank"
															rel="noopener noreferrer"
														>
															<ExternalLink className="h-4 w-4 mr-2" />
															Play Store
														</a>
													</Button>
												)}
											</div>
										)}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
