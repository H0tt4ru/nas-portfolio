'use client';

import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Blog from '@/components/sections/Blog';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function Home() {
    return (
        <>
            <Hero />
            <Projects />
            <About />
            <Blog />
            <Contact />
            <Footer />
        </>
    );
}
