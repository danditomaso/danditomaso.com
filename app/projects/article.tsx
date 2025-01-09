import Link from "@/app/components/link";
import type { Project } from "@/entities/project";
import { cn } from "@/util/style";
import { HiArrowRight } from "react-icons/hi";
import { TechList } from "../components/tech-list";
import { TimeDisplay } from "../components/time";

type ArticleProps = {
  project: Project;
  children?: React.ReactNode;
};

export function ReadMore() {
  return (
    <div className="mt-auto group pt-6">
      <p className="flex items-center gap-2 text-slate-200 hover:text-slate-50">
        Read more
        <HiArrowRight className="size-5 duration-200 group-hover:translate-x-2" />
      </p>
    </div>
  );
}
export function Article({ project, children }: ArticleProps) {
  if (!project) {
    return null;
  }

  const { title, description, sortOrder, tech, publishDate, slug } = project.meta;

  return (
    <Link href={slug ?? ""}>
      <article className="p-4 md:p-8 flex flex-col h-full">
        <div className="flex justify-between gap-3 items-center">
          <span className="-mb-2 text-xs duration-1000 text-slate-200 group-hover:text-white group-hover:border-slate-200">
            <TimeDisplay publishDate={publishDate} />
          </span>
        </div>
        <h2
          className={cn(
            `z-20 mt-2 ${sortOrder === "featured" ? "text-3xl" : "text-xl"}  font-medium duration-1000 lg:text-3xl text-slate-200 group-hover:text-white font-display`,
          )}
        >
          {title}
        </h2>
        <p className="z-20 mt-2 text-sm  duration-1000 text-slate-400 group-hover:text-slate-200">
          {description}
        </p>
        <div className="pt-6">
          <TechList techUsed={tech} />
        </div>
        {children}
      </article>
    </Link>
  );
}
