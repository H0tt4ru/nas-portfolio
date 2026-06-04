import { Metadata } from 'next';
import { Cinzel } from 'next/font/google';

import './globals.css';

const cinzel = Cinzel({
    subsets: ['latin'],
    variable: '--font-cinzel',
    weight: ['400', '600', '700'],
});

import { ThemeProvider } from 'next-themes';
import AppLoader from '@/components/AppLoader';
import { LenisProvider } from '@/providers/LenisProvider';
import EasterEggProvider from '@/providers/EasterEggProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GlitchEffect from '@/components/glitch/GlitchEffect';

export const metadata: Metadata = {};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <head></head>
            <body className={`${cinzel.variable} overflow-x-hidden bg-zinc-50 font-mono text-zinc-900 antialiased transition-colors duration-500 ease-in-out dark:bg-zinc-900 dark:text-zinc-50`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <AppLoader>
                        <LenisProvider>
                            <EasterEggProvider>
                                <div className="relative z-[2]">
                                    <GlitchEffect />
                                    <Header />
                                    {children}
                                    <Footer />
                                </div>
                            </EasterEggProvider>
                        </LenisProvider>
                    </AppLoader>
                </ThemeProvider>
            </body>
        </html>
    );
}
