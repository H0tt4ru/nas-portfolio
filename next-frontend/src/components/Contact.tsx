"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, Download, MapPin } from "lucide-react";

const contactMethods = [
	{
		icon: Mail,
		label: "Email",
		value: "nathan@nas27.dev",
		href: "mailto:nathan@nas27.dev",
	},
	{
		icon: Github,
		label: "GitHub",
		value: "@NAS27",
		href: "https://github.com",
	},
	{
		icon: Linkedin,
		label: "LinkedIn",
		value: "Nathan Angelo Stenlie",
		href: "https://linkedin.com",
	},
	{
		icon: MapPin,
		label: "Location",
		value: "Norway",
		href: null,
	},
];

export default function Contact() {
	return (
		<section
			id="contact"
			className="py-20 px-6 bg-gray-50 dark:bg-gray-800/50"
		>
			<div className="max-w-4xl mx-auto">
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Let's Work Together
					</h2>
					<p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						I'm always interested in new opportunities and exciting projects.
						Let's discuss how we can bring your ideas to life.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
						<div className="space-y-4">
							{contactMethods.map((method, index) => (
								<motion.div
									key={method.label}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: index * 0.1 }}
									viewport={{ once: true }}
								>
									<Card className="group hover:shadow-md transition-shadow duration-300">
										<CardContent className="p-4">
											<div className="flex items-center space-x-4">
												<div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
													<method.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
												</div>
												<div className="flex-1">
													<p className="font-medium text-sm">{method.label}</p>
													{method.href ? (
														<a
															href={method.href}
															className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
														>
															{method.value}
														</a>
													) : (
														<p className="text-gray-600 dark:text-gray-400">
															{method.value}
														</p>
													)}
												</div>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="space-y-6"
					>
						<h3 className="text-xl font-semibold">Quick Actions</h3>

						<Card>
							<CardContent className="p-6">
								<h4 className="font-semibold mb-2">Download Resume</h4>
								<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
									Get a detailed overview of my experience, skills, and
									projects.
								</p>
								<Button className="w-full font-mono">
									<Download className="h-4 w-4 mr-2" />
									Download CV
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6">
								<h4 className="font-semibold mb-2">Schedule a Call</h4>
								<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
									Let's discuss your project requirements and how I can help.
								</p>
								<Button
									variant="outline"
									className="w-full font-mono bg-transparent"
								>
									Book a Meeting
								</Button>
							</CardContent>
						</Card>
					</motion.div>
				</div>

				<motion.div
					className="text-center"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					viewport={{ once: true }}
				>
					<p className="text-gray-600 dark:text-gray-400 mb-6">
						Prefer email? Drop me a line and I'll get back to you within 24
						hours.
					</p>
					<Button
						size="lg"
						className="font-mono"
					>
						<Mail className="h-5 w-5 mr-2" />
						Send Email
					</Button>
				</motion.div>
			</div>
		</section>
	);
}
