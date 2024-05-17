"use client";
import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Code } from "@nextui-org/code";
import { default as ImageNext } from "next/image";
import html2canvas from "html2canvas";
import VersionImg from "@/public/release-note-bg.jpg";

export default function Releases() {
	const [version, setVersion] = useState<any>({
		"We-Seeds": "",
		"We-Power": "",
		"We-Platform": "",
		"We-OPP": "",
	});
	// version所有值都为空时，按钮才不可点击
	const disable = Object.keys(version).every((item) => !version[item]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
		setVersion((prev: any) => ({
			...prev,
			[key]: e.target.value,
		}));
	};

	const onDownload = () => {
		const node = document.getElementById("poster") as any;
		html2canvas(node, {
			useCORS: true,
			height: node.offsetHeight,
			width: node.offsetWidth,
			scrollY: 0,
			scrollX: 0,
		}).then(async (canvas) => {
			const oImg = new Image();
			oImg.src = canvas.toDataURL(); // 导出图片
			const a = document.createElement("a");
			a.href = oImg.src;
			a.download = "release-note.png";
			a.click();
		});
	};
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row gap-4">
				<Input
					placeholder="We-Seeds版本"
					value={version["We-Seeds"]}
					onChange={(e) => onChange(e, "We-Seeds")}
				/>
				<Input
					placeholder="We-Power版本"
					value={version["We-Power"]}
					onChange={(e) => onChange(e, "We-Power")}
				/>
				<Input
					placeholder="We-Platform版本"
					value={version["We-Platform"]}
					onChange={(e) => onChange(e, "We-Platform")}
				/>
				<Input
					placeholder="We-OPP版本"
					value={version["We-OPP"]}
					onChange={(e) => onChange(e, "We-OPP")}
				/>
				<Button color="primary" isDisabled={disable} onClick={onDownload}>
					下载图片
				</Button>
			</div>
			<Code color="warning" size="sm">
				版本文字在浏览器中可能会存在一定错位，确保图片生成正常即可，如有问题请见底部
			</Code>
			<div className="flex flex-row justify-center items-center w-full h-full">
				<div id="poster" className="relative w-full flex">
					<ImageNext
						src={VersionImg}
						alt="version-img"
						className="w-full h-full"
					/>
					<div
						className="absolute w-1/2 flex flex-row justify-between gap-4"
						style={{
							top: "46%",
							left: "7%",
							height: "10%",
						}}
					>
						{Object.keys(version).map((item) => (
							<div
								key={item}
								className="w-full h-full flex flex-col justify-center items-center rounded-md relative"
								style={{
									backdropFilter: "blur(4px)",
									backgroundColor: "rgba(255, 255, 255, 0.4)",
								}}
							>
								<span
									className="font-medium absolute"
									style={{
										color: "#2e9ff8",
										fontSize: "1.2rem",
										lineHeight: "1.4rem",
										top: "0",
									}}
								>
									{item}
								</span>
								<span
									className="font-medium absolute"
									style={{
										color: "#12466d",
										fontSize: "1rem",
										top: "1.5rem",
									}}
								>
									{version[item] || "--"}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
