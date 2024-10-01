import Link from "@/app/components/link";
import React from "react";
import { allProjects } from "content-collections";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { HiArrowRight, HiOutlineEye } from "react-icons/hi";
import { TechList } from "../components/tech-list";

const redis = Redis.fromEnv();

export const revalidate = 60;
export default async function ProjectsPage() {
  const views = (
    await redis.mget<number[]>(
      ...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":")),
    )
  ).reduce((acc, v, i) => {
    acc[allProjects[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  const featured = allProjects.find((project) => project.slug === "unkey")!;
  const top2 = allProjects.find((project) => project.slug === "planetfall")!;
  const top3 = allProjects.find((project) => project.slug === "highstorm")!;
  const sorted = allProjects
    .filter((p) => p.published)
    .filter(
      (project) =>
        project.slug !== featured.slug &&
        project.slug !== top2.slug &&
        project.slug !== top3.slug,
    )
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-slate-400">
            Some of the projects are from work and some are on my own time.
          </p>
        </div>
        <div className="w-full h-px bg-slate-800" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
          <Card>
            <Link href={`/projects/${featured.slug}`}>
              <article className="flex flex-col gap-4 p-4 h-full md:p-8">
                <>
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs  text-slate-100">
                      {featured.date ? (
                        <time dateTime={new Date(featured.date).toISOString()}>
                          {Intl.DateTimeFormat(undefined, {
                            dateStyle: "medium",
                          }).format(new Date(featured.date))}
                        </time>
                      ) : (
                        <span>COMING SOON</span>
                      )}
                    </div>
                    <span className="flex items-center gap-2 text-xs text-slate-200">
                      <HiOutlineEye className="size-5" />
                      {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                        views[featured.slug] ?? 0,
                      )}
                    </span>
                  </div>

                  <h2
                    id="featured-post"
                    className="text-3xl font-bold text-slate-100 group-hover:text-white sm:text-4xl font-display"
                  >
                    {featured.title}
                  </h2>
                  <p className="leading-6 duration-150 text-slate-400 group-hover:text-slate-300">
                    {featured.description}
                  </p>
                  <TechList techUsed={featured.tech} />
                  <div className="mt-auto group">
                    <p className="flex items-center gap-2 text-slate-200 hover:text-slate-50">
                      Read more <HiArrowRight className="size-5 duration-200 group-hover:translate-x-2" />
                    </p>
                  </div>
                </>
              </article>

            </Link>
          </Card>

          <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
            {[top2, top3].map((project) => (
              <Card key={project.slug}>
                <Article project={project} views={views[project.slug] ?? 0} />
              </Card>
            ))}
          </div>
        </div>
        <div className="hidden w-full h-px md:block bg-slate-800" />

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 0)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 1)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 2)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
