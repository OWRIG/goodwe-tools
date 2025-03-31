import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import Background from "../assets/background.jpg";

// Define the keys for version state for better maintainability
const VERSION_KEYS = {
	WE_INTEGRATED: "WE-光储融合平台",
	WE_POWER: "WE-Power",
	WE_OPERATION: "WE-运营平台",
} as const;

type VersionKeys = (typeof VERSION_KEYS)[keyof typeof VERSION_KEYS];
type VersionState = Record<VersionKeys, string>;

// New PosterDisplay component
interface PosterDisplayProps {
	version: VersionState;
}

function PosterDisplay({ version }: PosterDisplayProps) {
	return (
		<div id="poster" className="relative w-full aspect-[16/9]">
			{/* Background Image */}
			<img
				src={Background}
				alt="background"
				className="absolute inset-0 w-full h-full -z-10" // Use z-index to ensure it's behind the overlay
			/>
			{/* Gradient Overlay + Content Container */}
			<div className="absolute inset-0 p-[7%]">
				{/* Version Info Container */}
				<div
					className="absolute flex flex-row justify-between gap-4 w-[calc(100%-40%)]" // Adjust width based on parent padding
					style={{
						top: "46%",
						height: "10%",
						left: "6%", // Match the parent padding of 7%
						transform: "none", // Remove the centering transform
					}}>
					{Object.values(VERSION_KEYS).map((item) => (
						<div
							key={item}
							className="w-full h-full flex flex-col justify-center items-center relative backdrop-blur-sm rounded-md" // Added rounded-md class
							style={{
								backgroundColor: "rgba(255, 255, 255, 0.35)", // Slightly less transparent white
							}}>
							{/* Platform Name */}
							<span
								className="font-medium absolute text-[#2e9ff8] text-[1.5rem] leading-[1.8rem] w-full text-center"
								style={{ top: "calc(50% - 1.8rem)" }}>
								{item}
							</span>
							{/* Version Number */}
							<span
								className="font-medium absolute text-[#12466d] text-[1.3rem] w-full text-center"
								style={{ top: "calc(50% + 0.2rem)" }}>
								{version[item] || "--"}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

// Route Component using the new PosterDisplay
export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const [version, setVersion] = useState<VersionState>(() =>
		// Initialize state dynamically based on keys
		Object.values(VERSION_KEYS).reduce((acc, key) => {
			acc[key] = "";
			return acc;
		}, {} as VersionState)
	);

	const isDownloadDisabled = Object.values(version).every((v) => !v);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: VersionKeys) => {
		setVersion((prev) => ({
			...prev,
			[key]: e.target.value,
		}));
	};

	const handleDownload = () => {
		const node = document.getElementById("poster");
		if (!node) {
			console.error("Poster element not found for download.");
			return;
		}

		// Using Canvas API directly for rendering
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		if (!ctx) {
			alert("Canvas context not supported");
			return;
		}

		// Set canvas dimensions based on the poster's aspect ratio
		const rect = node.getBoundingClientRect();
		const aspectRatio = rect.width / rect.height;

		// Use a reasonable size for the canvas (adjust as needed)
		const canvasWidth = 1920; // Full HD width
		const canvasHeight = canvasWidth / aspectRatio;

		canvas.width = canvasWidth;
		canvas.height = canvasHeight;

		// Create and load the background image
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.src = Background;

		img.onload = () => {
			// Draw background
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

			// Create semi-transparent overlay
			ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Draw version boxes
			const padding = canvas.width * 0.07; // 7% padding
			const contentWidth = canvas.width - padding * 2; // Width of content area
			const boxesWidth = contentWidth * (60 / 100); // 56% of content area (100% - 44%)
			const boxWidth = (boxesWidth - 2 * 16) / 3; // 3 boxes with gaps
			const boxHeight = canvas.height * 0.1;
			const boxTop = canvas.height * 0.46;
			// Position the boxes on the left, matching the 7% padding
			const startX = padding;

			// Draw each version box
			Object.values(VERSION_KEYS).forEach((item, index) => {
				const boxX = startX + index * (boxWidth + 16);

				// Draw box background with slight transparency and rounded corners
				ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
				const cornerRadius = 8; // Match rounded-md (8px)

				// Create rounded rectangle path
				ctx.beginPath();
				ctx.moveTo(boxX + cornerRadius, boxTop);
				ctx.lineTo(boxX + boxWidth - cornerRadius, boxTop);
				ctx.arcTo(boxX + boxWidth, boxTop, boxX + boxWidth, boxTop + cornerRadius, cornerRadius);
				ctx.lineTo(boxX + boxWidth, boxTop + boxHeight - cornerRadius);
				ctx.arcTo(
					boxX + boxWidth,
					boxTop + boxHeight,
					boxX + boxWidth - cornerRadius,
					boxTop + boxHeight,
					cornerRadius
				);
				ctx.lineTo(boxX + cornerRadius, boxTop + boxHeight);
				ctx.arcTo(boxX, boxTop + boxHeight, boxX, boxTop + boxHeight - cornerRadius, cornerRadius);
				ctx.lineTo(boxX, boxTop + cornerRadius);
				ctx.arcTo(boxX, boxTop, boxX + cornerRadius, boxTop, cornerRadius);
				ctx.closePath();

				// Fill the rounded rectangle
				ctx.fill();

				// Calculate vertical center of the box
				const boxMiddle = boxTop + boxHeight / 2;

				// Draw platform name (positioned above the center)
				ctx.font = "bold 36px Arial";
				ctx.fillStyle = "#2e9ff8";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.fillText(item, boxX + boxWidth / 2, boxMiddle - 15);

				// Draw version number (positioned below the center)
				ctx.font = "30px Arial";
				ctx.fillStyle = "#12466d";
				ctx.fillText(version[item] || "--", boxX + boxWidth / 2, boxMiddle + 25);
			});

			// Convert to image and download
			const imageURL = canvas.toDataURL("image/png");
			const link = document.createElement("a");
			link.href = imageURL;
			link.download = "release-note.png";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		};

		img.onerror = (err) => {
			console.error("Image loading failed:", err);
			alert("背景图片加载失败，请重试");
		};
	};

	return (
		<div className="flex flex-col gap-4 p-8 max-w-screen-lg mx-auto">
			{" "}
			{/* Added max-width and centering */}
			{/* Input Section */}
			<div className="flex flex-row gap-4">
				{Object.values(VERSION_KEYS).map((key) => (
					<Input
						key={key}
						placeholder={`${key} 版本`}
						value={version[key]}
						onChange={(e) => handleInputChange(e, key)}
						className="flex-1"
					/>
				))}
				<Button
					onClick={handleDownload}
					disabled={isDownloadDisabled}
					className="whitespace-nowrap cursor-pointer">
					下载图片
				</Button>
			</div>
			{/* Warning Alert */}
			<Alert variant="default">
				<AlertDescription>版本文字在浏览器中可能会存在一定错位，确保图片生成正常即可。</AlertDescription>
			</Alert>
			{/* Poster Section */}
			<div className="flex flex-row justify-center items-center w-full mt-4">
				{" "}
				{/* Added margin-top */}
				<PosterDisplay version={version} />
			</div>
		</div>
	);
}
