import { BiLogoRedux, BiLogoReact, BiLogoNodejs, BiLogoGraphql, BiLogoTailwindCss, BiLogoPostgresql, BiLogoTypescript } from "react-icons/bi";
import { SiNextdotjs } from "react-icons/si";

export async function TechList({ techUsed }: { techUsed: string[] }) {
  if (!techUsed) {
    return null;
  }

  type TechItem = {
    label: string;
    icon: React.ReactNode;
  }

  const techMap: Record<string, TechItem> = {
    typescript: { label: 'TypeScript', icon: <BiLogoTypescript /> },
    node: { label: 'Node.js', icon: <BiLogoNodejs /> },
    next: { label: 'Next.js', icon: <SiNextdotjs size="12" /> },
    react: { label: 'React', icon: <BiLogoReact /> },
    redux: { label: 'Redux', icon: <BiLogoRedux /> },
    tailwindcss: { label: 'Tailwind CSS', icon: <BiLogoTailwindCss /> },
    postgres: { label: 'PostgreSQL', icon: <BiLogoPostgresql /> },
    graphql: { label: 'GraphQL', icon: <BiLogoGraphql /> },
  }

  return (
    <div className="flex flex-wrap gap-2 w-full">
      {techUsed?.map((tech) => {
        const techItem = techMap[tech];
        const IconComponent = () => techItem?.icon;
        const label = techItem.label;

        return <span
          key={label}
          title={`${label[0].toUpperCase()}${label.slice(1)} used`}
          className="flex items-center gap-2 border rounded-xl p-1.5 lg:p-2 hover:bg-slate-800/10 hover:border-slate-400/50 border-slate-600"
        >
          {IconComponent ? <><IconComponent />{label}</> : label}
        </span>
      })
      }
    </div >
  );
}