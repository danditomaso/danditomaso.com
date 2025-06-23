import { FaEnvelope, FaGithub, FaTwitter } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";
import { Card } from "./card";
import Link from "./link";

export async function Socials() {
  const socials = [
    // {
    //   icon: <FaBluesky size={20} />,
    //   href: "https://bky.app/profile/dand.me",
    //   label: "Bluesky",
    //   handle: "@dand.me",
    // },
    {
      icon: <FaEnvelope size={20} />,
      href: "mailto:dan.ditomaso@gmail.com?subject=Inquiry From Portfolio",
      label: "Email",
      handle: "dan.ditomaso@gmail.com",
    },
    {
      icon: <FaGithub size={24} />,
      href: "https://github.com/danditomaso",
      label: "Github",
      handle: "danditomaso",
    },
  ];

  if (socials.length === 0) {
    return null;
  }

  return (
    <div className="grid w-full grid-cols-auto-fit gap-8 mx-auto mt-32 sm:mt-0 lg:gap-8">
      {socials.map((s) => (
        <Card key={s.href} className="min-w-full">
          <Link
            href={s.href}
            className="p-16 relative flex flex-col items-center gap-4 md:gap-8 py-24 md:p-16 duration-700 group md:py-24 lg:pb-48"
            target="_blank"
          >
            <span
              className="absolute w-px h-2/3 bg-linear-to-b from-slate-500 via-slate-500/50 to-transparent"
              aria-hidden="true"
            />
            <span className="relative z-10 flex items-center justify-center size-12 text-sm duration-1000 border rounded-full text-slate-200 group-hover:text-white group-hover:bg-slate-900 border-slate-500 bg-slate-900 group-hover:border-slate-200 drop-shadow-orange">
              {s.icon}
            </span>
            <div className="z-10 flex flex-col items-center">
              <span className="lg:text-xl font-medium duration-150 xl:text-3xl text-slate-200 group-hover:text-white font-display">
                {s.handle}
              </span>
              <span className="mt-4 text-md text-center duration-1000 text-slate-400 group-hover:text-slate-200">
                {s.label}
              </span>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  );
}
