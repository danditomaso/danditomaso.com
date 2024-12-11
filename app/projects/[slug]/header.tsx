"use client";
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
    <header ref={ref} className="bg-gradient-to-tl from-black via-slate-900 to-black">
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent ${isIntersecting
            ? "bg-slate-800/0 border-transparent"
            : "bg-white/10  border-slate-200 lg:border-transparent"
          }`}
      >
        <div className="max-w-7xl flex flex-row-reverse items-center justify-between p-6 mx-auto">
          <div className="flex justify-between gap-8">
            <span
              title="View counter for this page"
              className={`duration-200 hover:font-medium flex items-center gap-1 ${isIntersecting
                  ? " text-slate-400 hover:text-slate-100"
                  : "text-slate-600 hover:text-slate-900"
                } `}
            >
              <HiOutlineEye className="w-5 h-5" />{" "}
              <span className="pointer-events-none">
                {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
              </span>
            </span>
            <Link href="https://twitter.com/danditomaso">
              <FaTwitter
                className={`size-6 duration-200 hover:font-medium ${isIntersecting
                    ? " text-slate-400 hover:text-slate-100"
                    : "text-slate-600 hover:text-slate-900"
                  } `}
              />
            </Link>
            <Link href="https://github.com/danditomaso">
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
      <div className="min-w-7xl mx-auto container flex flex-col place-content-center place-items-center relative  px-6 lg:px-8 py-24 sm:py-32">
        <div className="flex flex-col max-w-[80ch]  lg:mx-0">
          <div className="text-center">
            <h1 className="fluid-5xl font-bold tracking-tight text-white font-display">
              {project.title}
            </h1>
            <p className="fluid-base mt-4 text-slate-300">{project.description}</p>
          </div>

          <div className="mt-6 mx-auto">
            <TechList techUsed={project.tech} className="text-slate-300" />
          </div>

          <div className="mt-10 max-w-2xl g:mx-0 lg:max-w-none">
            <div className="flex justify-center gap-y-6 gap-x-8 text-base font-semibold leading-7 lg:gap-x-10">
              {links.map((link) => (
                <div key={link.label} className="group">
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center text-white gap-2"
                  >
                    {link.label}{" "}
                    <HiArrowRight className="size-5 duration-200 group-hover:translate-x-2" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
