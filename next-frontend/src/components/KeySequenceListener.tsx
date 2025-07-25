"use client";

import { useEffect, useState } from "react";
import { useEasterEggStore } from "@/stores/EasterEggStore";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const [inputBuffer, setInputBuffer] = useState("");
	const secretCode = "eldenring";

	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			const next = (inputBuffer + e.key.toLowerCase()).slice(
				-secretCode.length
			);
			setInputBuffer(next);

			if (next === secretCode) {
				useEasterEggStore.getState().setEasterEgg(true);
			}
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [inputBuffer]);

	return <>{children}</>;
}
