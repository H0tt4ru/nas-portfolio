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
import { ExternalLink, Github } from "lucide-react";

const projects = [
	{
		id: 1,
		title: "E-Commerce Platform",
		description:
			"Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
		tech: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
		image: "/placeholder.svg?height=300&width=500",
		liveUrl: "#",
		repoUrl: "#",
		type: "Full-Stack",
	},
	{
		id: 2,
		title: "Task Management API",
		description:
			"RESTful API for task management with authentication, real-time updates, and team collaboration features.",
		tech: ["Go", "PostgreSQL", "Redis", "WebSocket"],
		image: "/placeholder.svg?height=300&width=500",
		liveUrl: "#",
		repoUrl: "#",
		type: "Backend",
	},
	{
		id: 3,
		title: "Portfolio Website",
		description:
			"Responsive portfolio website for a creative agency with smooth animations and CMS integration.",
		tech: ["React", "Tailwind CSS", "Framer Motion", "Sanity"],
		image: "/placeholder.svg?height=300&width=500",
		liveUrl: "#",
		repoUrl: "#",
		type: "Frontend",
	},
	{
		id: 4,
		title: "Data Analytics Dashboard",
		description:
			"Real-time analytics dashboard for client with interactive charts and data visualization.",
		tech: ["Python", "FastAPI", "React", "D3.js"],
		image: "/placeholder.svg?height=300&width=500",
		liveUrl: "#",
		repoUrl: "#",
		type: "Client Work",
	},
	{
		id: 5,
		title: "Mobile Banking App",
		description:
			"Secure mobile banking application with biometric authentication and transaction management.",
		tech: ["Java", "Spring Boot", "PostgreSQL", "JWT"],
		image: "/placeholder.svg?height=300&width=500",
		liveUrl: "#",
		repoUrl: "#",
		type: "Full-Stack",
	},
];

export default function Projects() {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	return (
		<section
			id="projects"
			className="py-20 px-6"
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
						Featured Projects
					</h2>
					<p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						A selection of projects showcasing my expertise in full-stack
						development, from frontend interfaces to backend systems.
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
						<motion.div key={project.id}>
							<Card className="h-full group hover:shadow-lg transition-shadow duration-300">
								<div className="relative overflow-hidden rounded-t-lg">
									<img
										src={project.image || "/placeholder.svg"}
										alt={project.title}
										className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
									/>
									<div className="absolute top-4 left-4">
										<span className="px-2 py-1 text-xs bg-blue-600 text-white rounded">
											{project.type}
										</span>
									</div>
								</div>

								<CardHeader>
									<CardTitle className="text-lg">{project.title}</CardTitle>
									<CardDescription className="text-sm">
										{project.description}
									</CardDescription>
								</CardHeader>

								<CardContent>
									<div className="flex flex-wrap gap-2 mb-4">
										{project.tech.map((tech) => (
											<span
												key={tech}
												className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded"
											>
												{tech}
											</span>
										))}
									</div>

									<div className="flex gap-2">
										<Button
											size="sm"
											variant="outline"
											className="flex-1 bg-transparent"
										>
											<ExternalLink className="h-4 w-4 mr-2" />
											Live Demo
										</Button>
										<Button
											size="sm"
											variant="outline"
											className="flex-1 bg-transparent"
										>
											<Github className="h-4 w-4 mr-2" />
											Code
										</Button>
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
