import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import { LenisProvider } from '@/providers/LenisProvider';
import AppLoader from '@/components/AppLoader';
import EasterEggProvider from '@/providers/EasterEggProvider';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/layout/Header';

import './globals.css';

// Optimize font loading
const robotoMono = Roboto_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto-mono',
    preload: true,
});

export const metadata: Metadata = {
    title: 'NAS | Fullstack Developer Portfolio',
    description:
        'Explore the fullstack portfolio of Nathan Angelo Stenlie (NAS27), a backend engineer with a flair for frontend and devops. Dive into projects blending clean minimalism with fantasy aesthetics, built using Next.js, TypeScript, Tailwind, GSAP, and more.',
    keywords: [
        'NAS27',
        'NAS',
        'Nathan Angelo Stenlie',
        'Fullstack Developer',
        'Backend Engineer',
        'Frontend Developer',
        'DevOps',
        'Next.js Portfolio',
        'Indonesia Developer',
        'Jakarta Programmer',
        'Tailwind',
        'TypeScript',
        'GSAP',
        'Framer Motion',
        'Lenis',
        'Fantasy Developer Portfolio',
        'Minimalist Web Design',
        'React Developer',
        'Go Developer',
        'Portfolio Website',
    ],
    authors: [{ name: 'Nathan Angelo Stenlie', url: 'https://example.com' }], // ← Placeholder
    creator: 'NAS27',
    applicationName: 'NAS27 Portfolio',
    generator: 'Next.js',
    category: 'Portfolio',
    classification: 'Portfolio Website',
    openGraph: {
        title: 'NAS27 | Fullstack Developer Portfolio',
        description: 'A clean yet magical showcase of fullstack projects by Nathan Angelo Stenlie.',
        url: 'https://example.com', // ← Placeholder
        siteName: 'NAS27 Portfolio',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: '/placeholder-og.png', // ← Placeholder
                width: 1200,
                height: 630,
                alt: 'NAS27 Portfolio - Fullstack Developer',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'NAS27 | Fullstack Developer Portfolio',
        description:
            'Fullstack projects by Nathan Angelo Stenlie, backend specialist with frontend flair.',
        creator: '@placeholder', // ← Placeholder
        images: ['/placeholder-og.png'], // ← Placeholder
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'placeholder-google-verification-code', // ← Placeholder
    },
    alternates: {
        canonical: 'https://example.com', // ← Placeholder
    },
    metadataBase: new URL('https://example.com'), // ← Placeholder
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={robotoMono.variable} suppressHydrationWarning>
            <head>
                {/* Security headers */}
                <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
                <meta httpEquiv="Referrer-Policy" content="origin-when-cross-origin" />
                <meta httpEquiv="X-Frame-Options" content="DENY" />

                {/* Performance optimizations */}
                <link rel="dns-prefetch" href="//fonts.googleapis.com" />
                <link rel="dns-prefetch" href="//fonts.gstatic.com" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

                {/* Dynamic theme colors - consistent with design system */}
                <meta name="theme-color" content="#fafafa" media="(prefers-color-scheme: light)" />
                <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />

                {/* Fallback theme color and color scheme */}
                <meta name="theme-color" content="#fafafa" />
                <meta name="color-scheme" content="light dark" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, viewport-fit=cover"
                />

                {/* Icons and manifest - placeholders until assets are ready */}
                <link rel="icon" href="/placeholder-favicon.ico" sizes="32x32" />
                <link rel="icon" href="/placeholder-icon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/placeholder-apple-touch-icon.png" />
                <link rel="manifest" href="/placeholder-manifest.json" />

                {/* Preload critical resources - placeholder */}
                <link rel="preload" href="/placeholder-og.png" as="image" />
            </head>
            <body
                className={`${robotoMono.variable} overflow-x-hidden bg-zinc-50 font-mono text-gray-900 antialiased transition-colors duration-300 dark:bg-black dark:text-zinc-50`}
            >
                {/* Accessibility: Skip to main content */}
                <a
                    href="#main-content"
                    className="sr-only z-50 bg-blue-600 p-4 text-zinc-50 focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:rounded-br-md focus:transition-all focus:duration-200"
                >
                    Skip to main content
                </a>

                {/* App structure with loading priority */}
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange={false}
                >
                    <AppLoader>
                        <EasterEggProvider>
                            <LenisProvider>
                                <Header />
                                <main
                                    id="main-content"
                                    className="min-h-screen transition-colors duration-300"
                                >
                                    {children}
                                </main>
                            </LenisProvider>
                        </EasterEggProvider>
                    </AppLoader>
                </ThemeProvider>

                {/* Performance monitoring (production only) - placeholder domain */}
                {process.env.NODE_ENV === 'production' && (
                    <script
                        defer
                        data-domain="placeholder-domain.com"
                        src="https://plausible.io/js/script.js"
                    />
                )}
            </body>
        </html>
    );
}
