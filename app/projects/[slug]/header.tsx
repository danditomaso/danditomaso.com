"use client";
import type { Project } from "@/.content-collections/generated";
import Link from "@/app/components/link";
import { TechList } from "@/app/components/tech-list";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { HiArrowLeft, HiArrowRight, HiOutlineEye } from "react-icons/hi";

type Props = {
	project: Pick<Project, "title" | "description" | "url" | "repository" | "tech">;
	views: number;
};

export function Header({ project, views }: Props) {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	const links: { label: string; href: string }[] = [];
	if (project.repository) {
		links.push({
			label: "Github",
			href: `https://github.com/${project.repository}`,
		});
	}
	if (project.url) {
		links.push({
			label: "Website",
			href: project.url,
		});
	}
	useEffect(() => {
		if (!ref.current) {
			return;
		}
		const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header
			ref={ref}
			className="relative isolate overflow-hidden bg-gradient-to-tl from-black via-slate-900 to-black"
		>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent ${isIntersecting
					? "bg-slate-800/0 border-transparent"
					: "bg-white/10  border-slate-200 lg:border-transparent"
					}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex justify-between gap-8">
						<span
							title="View counter for this page"
							className={`duration-200 hover:font-medium flex items-center gap-1 ${isIntersecting
								? " text-slate-400 hover:text-slate-100"
								: "text-slate-600 hover:text-slate-900"
								} `}
						>
							<HiOutlineEye className="w-5 h-5" />{" "}
							<span className="pointer-events-none">{Intl.NumberFormat("en-US", { notation: "compact" }).format(
								views,
							)}</span>
						</span>
						<Link target="_blank" href="https://twitter.com/danditomaso">
							<FaTwitter
								className={`size-6 duration-200 hover:font-medium ${isIntersecting
									? " text-slate-400 hover:text-slate-100"
									: "text-slate-600 hover:text-slate-900"
									} `}
							/>
						</Link>
						<Link target="_blank" href="https://github.com/danditomaso">
							<FaGithub
								className={`size-6 duration-200 hover:font-medium ${isIntersecting
									? " text-slate-400 hover:text-slate-100"
									: "text-slate-600 hover:text-slate-900"
									} `}
							/>
						</Link>
					</div>

					<Link
						href="/projects"
						className={`duration-200 hover:font-medium ${isIntersecting
							? " text-slate-400 hover:text-slate-100"
							: "text-slate-600 hover:text-slate-900"
							} `}
					>
						<HiArrowLeft className="size-6" />
					</Link>
				</div>
			</div>
			<div className="container mx-auto flex flex-col place-content-center place-items-center relative isolate overflow-hidden px-6 lg:px-8 py-24 sm:py-32">
				<div className="flex flex-col place-items-center place-content-center max-w-[60ch]  lg:mx-0">
					<h1 className="text-[7vmin] font-bold tracking-tight text-white font-display">
						{project.title}
					</h1>
					<p className="text-lg mt-4 leading-8 text-slate-300">
						{project.description}
					</p>

					<div className="mt-6">
						<TechList techUsed={project.tech} className="text-slate-300" />
					</div>

					<div className="mx-auto mt-6 max-w-2xl lg:mx-0 lg:max-w-none">
						<div className="grid grid-cols-3 gap-y-6 gap-x-8 text-base font-semibold leading-7 sm:grid-cols-2 md:flex lg:gap-x-10">
							{links.map((link) => (
								<div key={link.label}>
									<Link target="_blank" key={link.label} href={link.href} className="flex items-center  text-white gap-2">
										{link.label} <HiArrowRight className="size-5 duration-200 hover:translate-x-2" />
									</Link>
								</div>
							))}
						</div>
					</div>
				</div>

			</div>
		</header >
	)
}
