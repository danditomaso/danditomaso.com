import Link from "@/app/components/link";
import type { Project } from "@/entities/project";
import { TechList } from "../components/tech-list";
import { TimeDisplay } from "../components/time";

type Props = {
  project: Project;
  views: number;
};

export function Article({ project }: Props) {
  if (!project) {
    return null;
  }

  return (
    <Link href={`/projects/${project?.meta.slug}`}>
      <article className="p-4 md:p-8">
        <div className="flex justify-between gap-3 items-center">
          <span className="text-xs duration-1000 text-slate-200 group-hover:text-white group-hover:border-slate-200">
            <TimeDisplay publishDate={project.meta?.publishDate} />
          </span>
          {/* <span className="text-slate-200 text-xs flex items-center gap-2">
            <HiOutlineEye className="size-5" />{" "}
            {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
          </span> */}
        </div>
        <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-slate-200 group-hover:text-white font-display">
          {project.meta.title}
        </h2>
        <p className="z-20 mt-4 text-sm  duration-1000 text-slate-400 group-hover:text-slate-200">
          {project.meta.description}
        </p>
        <div className="mt-4">
          <TechList techUsed={project.meta.tech} />
        </div>
      </article>
    </Link>
  );
}
