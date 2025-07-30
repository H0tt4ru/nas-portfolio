'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { useEasterEggStore } from '@/stores/easterEgg';

export default function Hero() {
    const { easterEgg } = useEasterEggStore();

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
        <section
            className={`text-fluid-xl bg-test flex min-h-screen items-center justify-center px-6 pt-20 ${easterEgg ? "bg-[url('/easter-egg-1.webp')] bg-cover bg-center" : ''}`}
        >
            <motion.div
                className="mx-auto max-w-4xl text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="mb-6">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        Hello, I&#39;m
                    </span>
                </motion.div>

                <motion.h1 className="mb-6 text-4xl leading-tight font-bold md:text-6xl lg:text-7xl">
                    Nathan Angelo Stenlie
                </motion.h1>

                <motion.p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 md:text-2xl dark:text-gray-400">
                    I build for the web. Full-stack developer crafting digital experiences with
                    modern technologies.
                </motion.p>

                <motion.div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button size="lg" className="font-mono">
                        View My Work
                    </Button>
                    <Button variant="outline" size="lg" className="bg-transparent font-mono">
                        Get In Touch
                    </Button>
                </motion.div>

                <motion.div className="flex items-center justify-center space-x-6">
                    {[
                        { icon: Github, href: '#', label: 'GitHub' },
                        { icon: Linkedin, href: '#', label: 'LinkedIn' },
                        { icon: Mail, href: '#', label: 'Email' },
                    ].map(({ icon: Icon, href, label }) => (
                        <motion.a
                            key={label}
                            href={href}
                            className="rounded-full bg-gray-100 p-3 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Icon className="h-5 w-5" />
                        </motion.a>
                    ))}
                </motion.div>

                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                    <ArrowDown className="h-6 w-6 text-gray-400" />
                </motion.div>
            </motion.div>
        </section>
    );
}
