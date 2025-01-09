import fs from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

import { isResultError } from "@/app/errors/error_utils";
import {
  type Project,
  type ProjectMeta,
  ProjectMetadataSchema,
  type SortOrder,
} from "@/entities/project";
import { type Result, err, ok } from "neverthrow";
import { z } from "zod";
import { ContentError } from "../app/errors";

export interface CategorizedProjects {
  featured: Project;
  top2: Project;
  top3: Project;
  otherProjects: Project[];
}

const PROJECT_ROOT = "./content/projects";

export function categorizeProjects(projects: Project[]): Result<CategorizedProjects, ContentError> {
  if (!projects || projects.length === 0) {
    return err(
      new ContentError({
        name: "NO_PUBLISHED_PROJECTS",
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
    .filter((p) => !p.meta.draft) // Include only projects in published state
    .sort((a, b) => {
      // Primary sort by sortOrder priority
      const priorityDiff =
        priority[a.meta.sortOrder as SortOrder] - priority[b.meta.sortOrder as SortOrder];
      if (priorityDiff !== 0) {
        return priorityDiff;
      }

      // Secondary sort by date (most recent first)
      return new Date(b.meta.publishDate).getTime() - new Date(a.meta.publishDate).getTime();
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

const isValidMdxPath = (path: unknown): path is string =>
  typeof path === "string" && path.endsWith(".mdx");

const validateProjectData = (data: unknown, path: string): Result<ProjectMeta, ContentError> => {
  try {
    const validatedData = ProjectMetadataSchema.parse(data);
    return ok({
      ...validatedData,
      slug: `/projects/${path.replace(/\.mdx$/, "")}`,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");

      return err(
        new ContentError({
          name: "INVALID_METADATA",
          message: `Validation failed for ${path}: ${issues}`,
          cause: error,
        }),
      );
    }

    return err(
      new ContentError({
        name: "VALIDATION_ERROR",
        message: `Unexpected validation error for ${path}`,
        cause: error instanceof Error ? error : undefined,
      }),
    );
  }
};

const readProjectFile = (
  fullPath: string,
): Result<{ data: unknown; content: string }, ContentError> => {
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    if (!fileContents) {
      return err(
        new ContentError({
          name: "DIRECTORY_READ_ERROR",
          message: `Failed to read directory at ${fullPath}`,
        }),
      );
    }
    const { data, content } = matter(fileContents);

    return ok({ data, content });
  } catch (error) {
    return err(
      new ContentError({
        name: "INVALID_FILE",
        message: `Failed to read file at ${fullPath}`,
        cause: error instanceof Error ? error : undefined,
      }),
    );
  }
};

export const getProjectSlugs = (): Result<string[], ContentError> => {
  try {
    const dirs = fs.readdirSync(join(process.cwd(), PROJECT_ROOT), { recursive: true });

    const validPaths = dirs.filter(isValidMdxPath).map((path) => path.replace(/\.mdx$/, ""));

    return ok(validPaths);
  } catch (error) {
    return err(
      new ContentError({
        name: "DIRECTORY_READ_ERROR",
        message: "Failed to read project directory",
        cause: error instanceof Error ? error : undefined,
      }),
    );
  }
};

export const getAllProjects = (): Result<Project[], ContentError> => {
  const slugsResult = getProjectSlugs();

  if (slugsResult.isErr()) {
    return err(slugsResult.error);
  }

  const projectResults = slugsResult.value.map((slug) => getProjectBySlug(slug));

  if (projectResults.some(isResultError<Project, ContentError>)) {
    const errors = projectResults.filter(isResultError<Project, ContentError>);
    const firstError = errors[0];

    return err(
      new ContentError({
        name: "MULTIPLE_PROJECT_ERRORS",
        message: `Failed to load ${errors.length} projects`,
        cause: firstError.isErr() ? firstError.error : undefined,
      }),
    );
  }

  const successfulProjects = projectResults.map((result) => (result.isOk() ? result.value : null!));

  return ok(successfulProjects);
};

export const getProjectBySlug = (slug: string): Result<Project, ContentError> => {
  const fullPath = join(PROJECT_ROOT, `${slug}.mdx`);

  const fileResult = readProjectFile(fullPath);
  if (fileResult.isErr()) {
    return err(fileResult.error);
  }

  const { data, content } = fileResult.value;
  const metaResult = validateProjectData(data, slug);

  if (metaResult.isErr()) {
    return err(metaResult.error);
  }

  return ok({ content, meta: metaResult.value });
};
