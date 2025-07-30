import ParallaxBackground from "@/components/Parallax";

export default function ParallaxTest() {
	return (
		<div className={`min-h-screen font-mono transition-colors duration-300`}>
			<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
				<ParallaxBackground />
				<div className="w-screen h-screen"></div>
				<div className="w-screen h-screen"></div>
				<div className="w-screen h-screen"></div>
				<div className="w-screen h-screen"></div>
				<div className="w-screen h-screen"></div>
				<div className="w-screen h-screen"></div>
				<div className="w-screen h-screen"></div>
				<div className="w-screen h-screen"></div>
			</div>
		</div>
	);
}
