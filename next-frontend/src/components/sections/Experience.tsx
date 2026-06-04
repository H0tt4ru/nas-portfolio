'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, GraduationCap, Trophy } from 'lucide-react';
import { useEasterEggStore } from '@/stores/easterEgg';

const workExperience = [
    {
        role: 'Junior Backend Developer Intern',
        company: 'PT Infosys Solusi Terpadu',
        period: 'January 2025 – January 2026',
        points: [
            'Reimplemented the core registration service and built a new Shared Wallet feature for HiBank, a mobile banking app with 100,000+ active users, as part of a 27-person engineering team.',
            'Identified and resolved 15+ production bugs across multiple backend services.',
            'Maintained 90%+ unit test coverage on critical service modules.',
        ],
    },
    {
        role: 'Research and Development Member',
        company: 'HMIF UMN',
        period: 'January 2024 – January 2025',
        points: [
            'Served as Project Manager for the CSS (Computer Science Shelter) website, a mandatory onboarding platform used by all incoming Informatics students.',
            'Contributed as a frontend developer for the PPIF website, the official orientation platform for all new Informatics students.',
        ],
    },
];

const education = {
    degree: 'Bachelor of Informatics',
    institution: 'Universitas Multimedia Nusantara',
    period: '2022 – 2026',
    detail: 'GPA 3.79',
};

const achievements = [
    {
        title: 'Solana Frontier Hackathon 2026',
        description:
            'Developed Oryon — a Web3-based loyalty platform — as part of a cross-functional team.',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Experience() {
    const { easterEgg } = useEasterEggStore();

    return (
        <section id="experience" className="px-6 py-20 bg-white dark:bg-zinc-900">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                        {easterEgg ? 'Deeds of Valour' : 'Experience'}
                    </h2>
                    <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
                        {easterEgg
                            ? 'Battles fought, wisdom gained, and milestones that hath shaped mine craft.'
                            : 'Work, education, and milestones that shaped how I build software.'}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-5">
                    {/* Work Experience — left, wider */}
                    <motion.div
                        className="lg:col-span-3"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="mb-8 flex items-center gap-3">
                            <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            <h3 className="text-xl font-semibold">Work Experience</h3>
                        </div>

                        <motion.div
                            className="relative"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {/* Timeline line */}
                            <div className="absolute top-2 bottom-2 left-[7px] w-px bg-gray-200 dark:bg-gray-700" />

                            <div className="space-y-10">
                                {workExperience.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className="relative pl-8"
                                    >
                                        {/* Dot */}
                                        <div className="absolute top-1.5 left-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-blue-600 dark:border-gray-900 dark:bg-blue-400" />

                                        <h4 className="font-semibold">{item.role}</h4>
                                        <p className="mt-0.5 text-sm font-medium text-blue-600 dark:text-blue-400">
                                            {item.company}
                                        </p>
                                        <p className="mt-0.5 mb-3 text-xs text-gray-500 dark:text-gray-500">
                                            {item.period}
                                        </p>
                                        <ul className="space-y-2">
                                            {item.points.map((point, i) => (
                                                <li
                                                    key={i}
                                                    className="flex gap-2 text-sm text-gray-600 dark:text-gray-400"
                                                >
                                                    <span className="mt-0.5 shrink-0 text-blue-500">
                                                        —
                                                    </span>
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Education + Achievements — right, narrower */}
                    <motion.div
                        className="space-y-8 lg:col-span-2"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        {/* Education */}
                        <div>
                            <div className="mb-6 flex items-center gap-3">
                                <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                <h3 className="text-xl font-semibold">Education</h3>
                            </div>
                            <Card>
                                <CardContent className="p-6">
                                    <h4 className="font-semibold">{education.degree}</h4>
                                    <p className="mt-0.5 text-sm font-medium text-blue-600 dark:text-blue-400">
                                        {education.institution}
                                    </p>
                                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-500">
                                        {education.period}
                                    </p>
                                    <span className="mt-3 inline-block rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
                                        {education.detail}
                                    </span>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Achievements */}
                        <div>
                            <div className="mb-6 flex items-center gap-3">
                                <Trophy className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                <h3 className="text-xl font-semibold">Achievements</h3>
                            </div>
                            <div className="space-y-4">
                                {achievements.map((item, index) => (
                                    <Card key={index}>
                                        <CardContent className="p-6">
                                            <h4 className="text-sm font-semibold">{item.title}</h4>
                                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                                {item.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
