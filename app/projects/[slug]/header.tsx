"use client";
import Link from "@/app/components/link";
import { TechList } from "@/app/components/tech-list";
import type { Project } from "@/entities/project";
import { cn } from "@/util/style";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

type Props = {
  project: Project;
  views: number;
};

export function Header({ project }: Props) {
  const { meta } = project;
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);

  const links: { label: string; href: string }[] = [];

  if (meta?.github) {
    links?.push({
      label: "Github",
      href: meta?.github?.includes('https://') ? meta?.github : `https://github.com/${meta?.github}`,
    });
  }
  if (meta?.website) {
    links.push({
      label: "Website",
      href: meta?.website,
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
    <header ref={ref} className="bg-gradient-to-tl from-black via-slate-900 to-black py-8">
      <div
        style={{ viewTimelineName: "heading" }}
        className={cn("fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent", isIntersecting
          ? "bg-slate-800/0 border-transparent"
          : "bg-white/10  border-slate-200 lg:border-transparent"
        )}
      >
        <div className="flex flex-row-reverse container items-center justify-between p-6 mx-auto">
          <div className="flex justify-between gap-8">
            <Link href="https://twitter.com/danditomaso" target="_blank">
              <FaTwitter
                className={cn("size-6 duration-200 hover:font-medium", isIntersecting
                  ? " text-slate-400 hover:text-slate-100"
                  : "text-slate-600 hover:text-slate-900"
                )}
              />
            </Link>
            <Link href="https://github.com/danditomaso" target="_blank">
              <FaGithub
                className={cn("size-6 duration-200 hover:font-medium", isIntersecting
                  ? " text-slate-400 hover:text-slate-100"
                  : "text-slate-600 hover:text-slate-900"
                )}
              />
            </Link>
          </div>

          <Link
            href="/projects"
            className={cn("duration-200 hover:font-medium", isIntersecting
              ? " text-slate-400 hover:text-slate-100"
              : "text-slate-600 hover:text-slate-900"
            )}
          >
            <HiArrowLeft className="size-6" />
          </Link>
        </div>
      </div>
      <div className="min-w-7xl mx-auto container flex flex-col relative overflow-x-hidden lg:px-44 md:px-8 px-4 py-4">
        <div className="lg:mx-0 space-y-8">
          <div>
            <h2 className="fluid-5xl leading-normal tracking-wide text-white font-display">
              {meta?.title ?? null}
            </h2>
            <p className="text-slate-300">{meta?.description ?? null}</p>
          </div>

          <TechList techUsed={meta?.tech ?? []} className="text-slate-300" />

          <div className="flex gap-x-8 text-base font-semibold lg:gap-x-10">
            {links.map((link) => (
              <div key={link?.label} className="group">
                <Link
                  key={link?.label}
                  href={link?.href}
                  className="flex items-center text-white gap-2"
                  target="_blank"
                >
                  {link?.label}{" "}
                  <HiArrowRight className="size-5 duration-200 group-hover:translate-x-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
