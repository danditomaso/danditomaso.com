import Link from "@/app/components/link";
import React from "react";
import Particles from "./components/particles";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

function Navigation() {
  return (
    <nav className="my-6 md:my-16 mx-16 animate-fade-in">
      <ul className="flex flex-col items-center justify-center gap-12">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-[15vw] md:text-[10vw] font-display leading-none"
          >
            <span className="relative inline-block group">
              {item.name}
              <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-current transition-all duration-200 ease-out group-hover:w-full group-hover:left-0" />
            </span>
          </Link>
        ))}
      </ul>
    </nav>
  )
}

function Header() {
  return (
    <header className="flex flex-col gap-6 mt-[20%] my-6 lg:my-16 mx-16">
      <h1 className="py-1 px-0.5 z-10 text-md tracking-[2px] uppercase font-light text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-sans whitespace-nowrap bg-clip-text">
        Dan Ditomaso
      </h1>

      <div className="animate-fade-in space-y-3 tracking-widerest lg:max-w-[38ch] text-balance">
        <h2 className="text-sm tracking-widerest text-slate-200">
          Frontend Developer
        </h2>
        <h3 className="text-sm text-slate-200 tracking-widest">
          Building{" "}
          <Link
            target="_blank"
            href="/projects"
            className="underline"
          >
            pixel-perfect
          </Link> , engaging, and delightful user experiences.
        </h3>
      </div>
    </header>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-center w-screen h-screen px-6 py-12 md:px-8 md:py-20 lg:px-24 lg:py-0 overflow-hidden bg-gradient-to-tl from-slate-900/95 via-slate-900/60 to-slate-900/30">
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={1000}
      />
      <Header />
      <Navigation />
    </div>
  );

}
