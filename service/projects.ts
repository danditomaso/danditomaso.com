import { ContentError } from "@/app/errors";
import { Project, SortOrder } from "@/entities/project";
import { type Result, err, ok } from "neverthrow";

export interface CategorizedProjects {
  featured: Project;
  top2: Project;
  top3: Project;
  otherProjects: Project[];
}


export function categorizeProjects(projects: Project[]): Result<CategorizedProjects, ContentError> {
  if (!projects || projects.length === 0) {
    return err(
      new ContentError({
        name: "UNABLE_TO_LOAD_PROJECTS",
        message: "Unable to load projects, no projects were passed to categorizeProjects service",
      }),
    );
  }

  // Priority mapping for sortOrder
  const priority: Record<SortOrder, number> = {
    featured: 1,
    top2: 2,
    top3: 3,
    other: 4,
  };

  const sortedProjects = projects
    .filter((p) => !p.draft) // Include only projects in published state
    .sort((a, b) => {
      // Primary sort by sortOrder priority
      const priorityDiff = priority[a.sortOrder as SortOrder] - priority[b.sortOrder as SortOrder];
      if (priorityDiff !== 0) {
        return priorityDiff;
      }

      // Secondary sort by date (most recent first)
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });

  if (sortedProjects.length === 0) {
    return err(
      new ContentError({
        name: "NO_PUBLISHED_PROJECTS",
        message: "No published projects found in the input.",
      }),
    );
  }

  // Extract featured, top2, top3, and otherProjects
  const [featured, top2, top3, ...otherProjects] = sortedProjects;

  return ok({ featured, top2, top3, otherProjects });
}

export function getProjectBySlug(slug: string, projects: Project[]): Result<Project, ContentError> {
  if (!projects) {
    return err(
      new ContentError({
        name: "UNABLE_TO_LOAD_PROJECTS",
        message: "Unable to load projects, no projects were passed to getProjectBySlug service",
      }),
    );
  }

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return err(
      new ContentError({
        name: "PROJECT_NOT_FOUND",
        message: `Project with slug ${slug} not found`,
      }),
    );
  }

  return ok(project);
}
