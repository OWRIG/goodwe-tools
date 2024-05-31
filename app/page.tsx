import { portal_list, portals_suffix } from "@/config/portals";
import { Link } from "@nextui-org/react";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-12 py-8 md:py-10 relative">
			{portal_list.map((portal) => {
				return (
					<div key={portal.env_name} className="flex flex-col w-full gap-6">
						<h2 className="text-2xl font-bold">{portal.env_name}</h2>
						<div className="flex flex-row justify-between">
							{Object.keys(portals_suffix).map((key) => {
								// @ts-ignore
								const info = portals_suffix[key];
								return (
									<Link
										key={key}
										href={`${portal.prefix}${info.link}`}
										target="_blank"
									>
										<p>{info.name}</p>
									</Link>
								);
							})}
						</div>
					</div>
				);
			})}
		</section>
	);
}
