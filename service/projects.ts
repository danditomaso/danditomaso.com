import type { Project } from "@/.content-collections/generated";
import { ContentError } from "@/app/errors";
import { C } from "@upstash/redis/zmscore-BLgYk16R";
import { ok, err, type Result } from "neverthrow";


type CategorizedProjects = {
  featured: Project;
  top2: Project;
  top3: Project;
  otherProjects: Project[];
};

export function categorizeProjects(projects: Project[]): Result<CategorizedProjects, ContentError> {
  if (!projects) {
    return err(new ContentError({
      name: "UNABLE_TO_LOAD_PROJECTS",
      message: "Unable to load projects, no projects were passed to categorizeProjects service",
    }));
  };

  const allProjects = projects
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    )
    .sort((a, b) => {
      const priority = {
        featured: 1,
        top2: 2,
        top3: 3,
        other: 4,
      };
      return priority[a.display ?? "other"] - priority[b.display ?? "other"];
    });
  const featuredProjects = allProjects?.slice(0, 3) ?? [];

  if (!featuredProjects.length) {
    err("No projects found");
  }

  const [featured, top2, top3] = featuredProjects;
  // Everything else
  const otherProjects = allProjects?.slice(3);

  return ok({ featured, top2, top3, otherProjects });
}
