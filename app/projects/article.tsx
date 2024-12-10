import Link from "@/app/components/link";
import type { Project } from "content-collections";
import { HiOutlineEye } from "react-icons/hi";
import { TechList } from "../components/tech-list";

type Props = {
  project: Project;
  views: number;
};

export function Article({ project, views }: Props) {
  if (!project) {
    return null;
  }

  return (
    <Link href={`/projects/${project?.slug}`}>
      <article className="p-4 md:p-8">
        <div className="flex justify-between gap-3 items-center">
          <span className="text-xs duration-1000 text-slate-200 group-hover:text-white group-hover:border-slate-200">
            {project.date ? (
              <time dateTime={new Date(project.date).toISOString()}>
                {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                  new Date(project.date),
                )}
              </time>
            ) : (
              <span>COMING SOON</span>
            )}
          </span>
          {/* <span className="text-slate-200 text-xs flex items-center gap-2">
            <HiOutlineEye className="size-5" />{" "}
            {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
          </span> */}
        </div>
        <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-slate-200 group-hover:text-white font-display">
          {project.title}
        </h2>
        <p className="z-20 mt-4 text-sm  duration-1000 text-slate-400 group-hover:text-slate-200">
          {project.description}
        </p>
        <div className="mt-4">
          <TechList techUsed={project.tech} />
        </div>
      </article>
    </Link>
  );
}
