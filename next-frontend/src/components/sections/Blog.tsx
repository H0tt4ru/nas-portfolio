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
import { Calendar, ArrowRight } from "lucide-react";

const blogPosts = [
	{
		id: 1,
		title: "Building Scalable APIs with Go",
		description:
			"Learn how to create efficient and scalable REST APIs using Go and PostgreSQL.",
		date: "2024-01-15",
		readTime: "5 min read",
		tags: ["Go", "API", "Backend"],
	},
	{
		id: 2,
		title: "Modern React Patterns",
		description:
			"Exploring the latest React patterns and best practices for building maintainable applications.",
		date: "2024-01-08",
		readTime: "7 min read",
		tags: ["React", "TypeScript", "Frontend"],
	},
	{
		id: 3,
		title: "Database Design Principles",
		description:
			"Essential principles for designing efficient and scalable database schemas.",
		date: "2024-01-01",
		readTime: "6 min read",
		tags: ["Database", "PostgreSQL", "Design"],
	},
];

export default function Blog() {
	return (
		<section
			id="blog"
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
						Latest Articles
					</h2>
					<p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						Thoughts on development, technology, and lessons learned along the
						way.
					</p>
				</motion.div>

				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.6, staggerChildren: 0.1 }}
					viewport={{ once: true }}
				>
					{blogPosts.map((post, index) => (
						<motion.div
							key={post.id}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
						>
							<Card className="h-full group hover:shadow-lg transition-shadow duration-300 cursor-pointer">
								<CardHeader>
									<div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
										<Calendar className="h-4 w-4" />
										<span>{new Date(post.date).toLocaleDateString()}</span>
										<span>•</span>
										<span>{post.readTime}</span>
									</div>
									<CardTitle className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
										{post.title}
									</CardTitle>
									<CardDescription>{post.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="flex flex-wrap gap-2 mb-4">
										{post.tags.map((tag) => (
											<span
												key={tag}
												className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded"
											>
												{tag}
											</span>
										))}
									</div>
									<Button
										variant="ghost"
										className="p-0 h-auto font-mono group"
									>
										Read More
										<ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
									</Button>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>

				<motion.div
					className="text-center mt-12"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					viewport={{ once: true }}
				>
					<Button
						variant="outline"
						size="lg"
						className="font-mono bg-transparent"
					>
						View All Articles
					</Button>
				</motion.div>
			</div>
		</section>
	);
}
