"use client";
import { cn } from "@/util/style";
import {
  BiLogoRedux,
  BiLogoReact,
  BiLogoNodejs,
  BiLogoGraphql,
  BiLogoTailwindCss,
  BiLogoPostgresql,
  BiLogoTypescript,
  BiLogoFigma,
} from "react-icons/bi";
import {
  SiBun,
  SiCloudflare,
  SiDeno,
  SiFigma,
  SiHono,
  SiNextdotjs,
  SiRedis,
  SiRemix,
  SiSqlite,
  SiUpstash,
  SiZod,
} from "react-icons/si";

export function TechList({ techUsed, className }: { techUsed: string[]; className?: string }) {
  if (!techUsed) {
    return null;
  }

  type TechItem = {
    label: string;
    icon: React.ReactNode
  };

  const techMap: Record<string, TechItem> = {
    typescript: { label: "TypeScript", icon: <BiLogoTypescript /> },
    node: { label: "Node.js", icon: <BiLogoNodejs /> },
    deno: { label: "Deno", icon: <SiDeno size={12} /> },
    next: { label: "Next.js", icon: <SiNextdotjs size="12" /> },
    react: { label: "React", icon: <BiLogoReact /> },
    remix: { label: "Remix", icon: <SiRemix size="12" /> },
    hono: { label: "Hono.js", icon: <SiHono size="12" /> },
    bun: { label: "Bun", icon: <SiBun size="12" /> },
    cloudflare: { label: "Bun", icon: <SiCloudflare size="12" /> },
    redux: { label: "Redux", icon: <BiLogoRedux /> },
    tailwindcss: { label: "Tailwind CSS", icon: <BiLogoTailwindCss /> },
    postgres: { label: "PostgreSQL", icon: <BiLogoPostgresql /> },
    sqlite: { label: "SQLite", icon: <SiSqlite size={12} /> },
    graphql: { label: "GraphQL", icon: <BiLogoGraphql /> },
    redis: { label: "Redis", icon: <SiRedis size={12} /> },
    upstash: { label: "Upstash", icon: <SiUpstash size={12} /> },
    figma: { label: "Figma", icon: <BiLogoFigma /> },
    zod: { label: "Zod", icon: <SiZod /> },
  };

  return (
    <div className="flex flex-wrap gap-2 w-full">
      {techUsed?.map((tech) => {
        const techItem = techMap[tech];
        const IconComponent = () => techItem?.icon;
        const label = techItem.label;

        return (
          <span
            key={label}
            title={`${label[0].toUpperCase()}${label.slice(1)} used`}
            className={cn(
              "flex items-center gap-2 border rounded-xl p-1.5 lg:p-2 hover:bg-slate-800/10 hover:border-slate-400/50 border-slate-600",
              className,
            )}
          >
            {IconComponent ? (
              <>
                <IconComponent />
                {label}
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
