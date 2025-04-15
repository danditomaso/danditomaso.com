"use client";
import { cn } from "@/util/style";
import {
  BiLogoFigma,
  BiLogoGraphql,
  BiLogoNodejs,
  BiLogoPostgresql,
  BiLogoReact,
  BiLogoRedux,
  BiLogoTailwindCss,
  BiLogoTypescript,
} from "react-icons/bi";
import { FaGolang } from "react-icons/fa6";
import {
  SiBun,
  SiCloudflare,
  SiDeno,
  SiHono,
  SiNextdotjs,
  SiRedis,
  SiRemix,
  SiSqlite,
  SiVercel,
  SiZod,
} from "react-icons/si";

export function TechList({ techUsed, className }: { techUsed: string[]; className?: string }) {
  if (!techUsed) {
    return null;
  }

  type TechItem = {
    label: string;
    icon: React.ReactNode;
    size?: number;
  };

  const techMap: Record<string, TechItem> = {
    typescript: { label: "TypeScript", icon: <BiLogoTypescript size="24" /> },
    node: { label: "Node.js", icon: <BiLogoNodejs /> },
    deno: { label: "Deno", icon: <SiDeno size="20" /> },
    next: { label: "Next.js", icon: <SiNextdotjs size="24" /> },
    go: { label: "Go", icon: <FaGolang size="24" /> },
    react: { label: "React", icon: <BiLogoReact size="24" /> },
    remix: { label: "Remix", icon: <SiRemix size="24" /> },
    hono: { label: "Hono.js", icon: <SiHono size="24" /> },
    bun: { label: "Bun", icon: <SiBun size="24" /> },
    cloudflare: { label: "Bun", icon: <SiCloudflare size="24" /> },
    redux: { label: "Redux", icon: <BiLogoRedux /> },
    tailwindcss: { label: "Tailwind CSS", icon: <BiLogoTailwindCss size="26" /> },
    postgres: { label: "PostgreSQL", icon: <BiLogoPostgresql /> },
    sqlite: { label: "SQLite", icon: <SiSqlite size="24" /> },
    graphql: { label: "GraphQL", icon: <BiLogoGraphql /> },
    redis: { label: "Redis", icon: <SiRedis size="24" /> },
    figma: { label: "Figma", icon: <BiLogoFigma /> },
    zod: { label: "Zod", icon: <SiZod /> },
    vercel: { label: "Vercel", icon: <SiVercel size="18" /> },
  };

  return (
    <div className="flex flex-wrap lg:gap-4 gap-2 w-full">
      {techUsed?.map((tech) => {
        const techItem = techMap[tech];
        const IconComponent = () => techItem?.icon;
        const label = techItem.label;

        return (
          <span
            key={label}
            title={`${label[0].toUpperCase()}${label.slice(1)} used`}
            className={cn(
              "flex items-center gap-2 border rounded-xl p-1.5 lg:p-3 hover:bg-slate-800/10 hover:border-slate-400/50 border-slate-600",
              className,
            )}
          >
            {IconComponent ? (
              <>
                <IconComponent />
                <span className="text-sm">{label}</span>
              </>
            ) : (
              label
            )}
          </span>
        );
      })}
    </div>
  );
}
