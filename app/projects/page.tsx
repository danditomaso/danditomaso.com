import { categorizeProjects, getAllProjects } from "@/service/projects";
import type { Metadata } from "next";
import React from "react";
import { Card } from "../components/card";
import { Navigation } from "../components/nav";
import { ContentError } from "../errors";
import { Article, ReadMore } from "./article";

export const metadata: Metadata = {
  title: "Dan Ditomaso | Projects",
};

export default async function ProjectsPage() {
  const allProjects = getAllProjects();

  if (allProjects.isErr()) {
    throw new ContentError({
      message: "No projects found",
      name: "ERROR_LOADING_PROJECTS",
      cause: allProjects.error,
    });
  }

  const result = categorizeProjects(allProjects.value);

  if (result.isErr()) {
    throw new ContentError({
      message: "No projects found",
      name: "ERROR_CATEGORIZING_PROJECTS",
      cause: result.error,
    });
  }

  const { featured, top2, top3, otherProjects } = result.value;

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl md:space-y-10 md:pt-24 lg:pt-32">
        <div className="max-w-xl mb-16">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-100">Projects</h2>
          <p className="mt-4 text-slate-400">Some of the projects I've been working on.</p>
        </div>
        <div className="w-full h-px bg-slate-700 space-y-24 mb-8" />
        <div className="grid grid-col-1 md:grid-flow-col gap-8 pt-8">
          <Card className="xl:col-span-5 lg:row-span-2">
            <Article project={featured}>
              <ReadMore />
            </Article>
          </Card>
          {[top2, top3]?.map((project) => (
            <Card key={project.meta.slug} className="col-span-1 row-span-1 md:col-span-full">
              <Article project={project} />
            </Card>
          ))}
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
          {otherProjects?.map((project) => (
            <Card key={project?.meta?.slug} className="col-span-full md:col-span-1">
              <Article project={project} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
