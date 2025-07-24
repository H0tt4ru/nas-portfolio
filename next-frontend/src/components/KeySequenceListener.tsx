"use client";

import { useEffect, useState } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const [, setInputBuffer] = useState("");
	const secretCode = "eldenring";

	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			setInputBuffer((prev) => {
				const next = (prev + e.key.toLowerCase()).slice(-secretCode.length);

				if (next === secretCode) {
					alert("Secret code activated!");
				}

				return next;
			});
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, []);

	return <>{children}</>;
}
