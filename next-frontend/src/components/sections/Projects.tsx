'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code2, ExternalLink } from 'lucide-react';
import { useEasterEggStore } from '@/stores/easterEgg';

interface Project {
    id: number;
    title: string;
    type: string;
    badge?: string;
    description: string;
    highlight?: string;
    tech: string[];
    repoUrl?: string;
    privateRepo?: boolean;
    demoUrl?: string;
    storeUrl?: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: 'School Scheduling App',
        type: 'Full-Stack',
        description:
            'A Flutter app that automates school timetable generation using a Genetic Algorithm hybrid Simulated Annealing, with a Go Gin backend handling the algorithm. Built with role-based access for admins, teachers, parents, and students.',
        tech: ['Gin', 'Flutter'],
        privateRepo: true,
    },
    {
        id: 2,
        title: 'HiBank',
        type: 'Backend',
        badge: 'Internship',
        description:
            'Contributed backend development for a mobile banking app with 100,000+ active users as part of a 27-person engineering team.',
        tech: ['Spring Boot', 'PostgreSQL', 'Redis'],
        storeUrl: 'https://play.google.com/store/apps/details?id=com.hibank.mobile&hl=id&pli=1',
    },
    {
        id: 3,
        title: 'Oryon',
        type: 'Blockchain',
        badge: 'Hackathon',
        description:
            'A Web3-based loyalty platform enabling users to earn and redeem rewards across multiple merchants within a single decentralized ecosystem, built at Solana Frontier Hackathon 2026.',
        tech: ['Solana', 'Rust', 'Next.js', 'TypeScript'],
        repoUrl: 'https://github.com/oryon-solana/oryon-smart-contract',
        demoUrl: 'https://oryon-web.vercel.app/',
    },
    {
        id: 4,
        title: 'Kaligrafi Raudlatul Irfan',
        type: 'Full-Stack',
        badge: 'University',
        description:
            'Led a 7-person team to build an e-commerce platform for an Islamic calligraphy community to sell and showcase their handcrafted artwork online.',
        tech: ['Next.js', 'Express.js', 'Docker'],
        repoUrl: 'https://github.com/PKM-Kaligrafi/pkm-kaligrafi-raudlatul-irfan',
    },
    {
        id: 5,
        title: 'Snapo',
        type: 'Frontend',
        badge: 'University',
        description:
            'Built an interactive museum gallery website to make Jakarta\'s cultural heritage more engaging and accessible for general audiences.',
        tech: ['React.js', 'Tailwind CSS'],
        repoUrl: 'https://github.com/Vn1k/Snapo-Parallax-UAS',
        demoUrl: 'https://snapo.netlify.app',
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
    const { easterEgg } = useEasterEggStore();

    return (
        <section id="projects" className="px-6 py-20 bg-white dark:bg-zinc-900">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                        {easterEgg ? 'Works Most Storied' : 'Featured Projects'}
                    </h2>
                    <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
                        {easterEgg
                            ? 'A chronicle of works spanning backend realms, mobile frontiers, and the blockchain abyss — from internship to hackathon.'
                            : 'A selection of work spanning backend systems, mobile apps, and blockchain — from internships to hackathons.'}
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {projects.map((project) => (
                        <motion.div key={project.id} variants={itemVariants} className="h-full">
                            <Card className="group flex h-full flex-col transition-shadow duration-300 hover:shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-lg">{project.title}</CardTitle>
                                    <div className="mb-2 flex items-center gap-2">
                                        <span className="rounded bg-blue-600 px-2 py-1 text-xs text-white">
                                            {project.type}
                                        </span>
                                        {project.badge && (
                                            <span className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-600 dark:border-gray-600 dark:text-gray-400">
                                                {project.badge}
                                            </span>
                                        )}
                                    </div>
                                    <CardDescription className="text-sm">
                                        {project.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="flex flex-1 flex-col gap-4">
                                    {project.highlight && (
                                        <p className="border-l-2 border-blue-500 pl-3 text-xs text-gray-600 dark:text-gray-400">
                                            {project.highlight}
                                        </p>
                                    )}

                                    <div className="mt-auto flex flex-col gap-3">
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {(project.repoUrl ||
                                            project.privateRepo ||
                                            project.demoUrl ||
                                            project.storeUrl) && (
                                            <div className="flex gap-2">
                                                {project.privateRepo && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="flex-1 cursor-default bg-transparent opacity-50"
                                                        disabled
                                                    >
                                                        <Code2 className="mr-2 h-4 w-4" />
                                                        Private
                                                    </Button>
                                                )}
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
                                                            <Code2 className="mr-2 h-4 w-4" />
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
                                                            <ExternalLink className="mr-2 h-4 w-4" />
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
                                                            <ExternalLink className="mr-2 h-4 w-4" />
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
