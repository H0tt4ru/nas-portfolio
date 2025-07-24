import type { Metadata } from "next";
import { LenisProvider } from "@/providers/LenisProvider";
import LoadingWrapper from "@/components/LoadingScreen";
import KeySequenceListener from "@/components/KeySequenceListener";

import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
	title: "NAS | Fullstack Developer Portfolio",
	description:
		"Explore the fullstack portfolio of Nathan Angelo Stenlie (NAS27), a backend engineer with a flair for frontend and devops. Dive into projects blending clean minimalism with fantasy aesthetics, built using Next.js, TypeScript, Tailwind, GSAP, and more.",
	keywords: [
		"NAS27",
		"NAS",
		"Nathan Angelo Stenlie",
		"Fullstack Developer",
		"Backend Engineer",
		"Frontend Developer",
		"DevOps",
		"Next.js Portfolio",
		"Indonesia Developer",
		"Jakarta Programmer",
		"Tailwind",
		"TypeScript",
		"GSAP",
		"Framer Motion",
		"Lenis",
		"Fantasy Developer Portfolio",
		"Minimalist Web Design",
	],
	authors: [{ name: "Nathan Angelo Stenlie", url: "https://yourdomain.com" }],
	creator: "NAS27",
	applicationName: "NAS27 Portfolio",
	generator: "Next.js",
	openGraph: {
		title: "NAS27 | Fullstack Developer Portfolio",
		description:
			"A clean yet magical showcase of fullstack projects by Nathan Angelo Stenlie.",
		url: "https://yourdomain.com",
		siteName: "NAS27 Portfolio",
		locale: "id_ID",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "NAS27 | Fullstack Developer Portfolio",
		description:
			"Fullstack projects by Nathan Angelo Stenlie, backend specialist with frontend flair.",
		creator: "@yourhandle", // Add if you have Twitter/X
	},
	metadataBase: new URL("https://yourdomain.com"),
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased`}>
				<LoadingWrapper>
					<KeySequenceListener>
						<Header />
						<LenisProvider>{children}</LenisProvider>
					</KeySequenceListener>
				</LoadingWrapper>
			</body>
		</html>
	);
}
