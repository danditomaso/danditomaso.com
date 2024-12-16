"use client";
import Link from "@/app/components/link";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";

export const Navigation: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  ${
          isIntersecting
            ? "bg-slate-900/0 border-transparent"
            : "bg-slate-900/500  border-slate-800 "
        }`}
      >
        <div className="max-w-7xl flex items-center justify-between p-6 mx-auto px-6">
          <Link href="/">
            <HiArrowLeft className="size-6" />
          </Link>

          <div className="flex justify-between gap-8">
            <Link href="/projects">Projects</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </header>
  );
};
