"use client";
import { Github, Mail, TwitterIcon } from "lucide-react";
// import Link from "next/link";
import Link from "@/app/components/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

const socials = [
	{
		icon: <TwitterIcon size={20} />,
		href: "https://twitter.com/danditomaso",
		label: "Twitter",
		handle: "@danditomaso",
	},
	{
		icon: <Mail size={20} />,
		href: "mailto:hi@danditomaso.com?subject=Inquiry From Website",
		label: "Email",
		handle: "hi@danditomaso.com",
	},
	{
		icon: <Github size={20} />,
		href: "https://github.com/danditomaso",
		label: "Github",
		handle: "danditomaso",
	},
];

export default function ContactPag() {
	return (
		<div className="bg-gradient-to-tl from-slate-900/0 via-slate-900 to-slate-900/0">
			<Navigation />
			<div className="max-w-7xl flex flex-col items-center justify-center min-h-screen px-4 mx-auto">
				<div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16">
					{socials.map((s) => (
						<Card key={s.href}>
							<Link
								href={s.href}
								target="_blank"
								className="p-4 relative flex flex-col items-center gap-4 md:gap-8 py-24 md:p-16 duration-700 group md:py-24 lg:pb-48"
							>
								<span
									className="absolute w-px h-2/3 bg-gradient-to-b from-slate-500 via-slate-500/50 to-transparent"
									aria-hidden="true"
								/>
								<span className="relative z-10 flex items-center justify-center size-12 text-sm duration-1000 border rounded-full text-slate-200 group-hover:text-white group-hover:bg-slate-900 border-slate-500 bg-slate-900 group-hover:border-slate-200 drop-shadow-orange">
									{s.icon}
								</span>
								<div className="z-10 flex flex-col items-center">
									<span className="lg:text-xl font-medium duration-150 xl:text-3xl text-slate-200 group-hover:text-white font-display">
										{s.handle}
									</span>
									<span className="mt-4 text-sm text-center duration-1000 text-slate-400 group-hover:text-slate-200">
										{s.label}
									</span>
								</div>
							</Link>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
