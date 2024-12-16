import type { Project, SortOrder } from "@/entities/project";
import { describe, expect, it } from "vitest";
import { categorizeProjects } from "./projects";

const baseProject: Omit<Project, "sortOrder" | "slug" | "title"> = {
  mdx: "",
  content: "",
  description: "A test project",
  tech: ["TypeScript", "React"],
  draft: false,
  keywords: ["test", "project"],
  publishDate: "2022-01-01",
  url: "https://example.com",
  repository: "https://example.com/repo",
  _meta: {
    directory: "projects",
    extension: ".mdx",
    fileName: "test-project.mdx",
    filePath: "/projects/test-project.mdx",
    path: "/projects/test-project.mdx",
  },
};

function createProject(
  slug: string,
  title: string,
  sortOrder: SortOrder,
  publishDate = "2022-01-01",
  draft = false,
): Project {
  return {
    ...baseProject,
    slug,
    title,
    sortOrder,
    publishDate,
    draft,
  };
}

describe("categorizeProjects", () => {
  it("returns an error if no projects passed", () => {
    const result = categorizeProjects([]);
    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error.name).toBe("UNABLE_TO_LOAD_PROJECTS");
    }
  });

  it("returns an error if only draft projects are available", () => {
    const projects = [
      createProject("proj1", "Project 1", "other", "2022-01-10", true),
      createProject("proj2", "Project 2", "other", "2022-01-11", true),
    ];
    const result = categorizeProjects(projects);
    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error.name).toBe("NO_PUBLISHED_PROJECTS");
    }
  });

  it("correctly categorizes projects by priority and publishDate", () => {
    const projects = [
      createProject("proj-featured", "Featured Project", "featured", "2022-04-01"),
      createProject("proj-top2", "Top 2 Project", "top2", "2022-03-15"),
      createProject("proj-top3", "Top 3 Project", "top3", "2022-03-01"),
      createProject("proj-other1", "Other Project 1", "other", "2021-12-01"),
      createProject("proj-other2", "Other Project 2", "other", "2022-02-01"),
    ];

    const result = categorizeProjects(projects);
    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      const { featured, top2, top3, otherProjects } = result.value;
      expect(featured?.title).toBe("Featured Project");
      expect(top2?.title).toBe("Top 2 Project");
      expect(top3?.title).toBe("Top 3 Project");
      // Other projects should include other 2 projects sorted bypublishDate
      expect(otherProjects.length).toBe(2);
      // The "other" projects are sorted by publishDate descending,
      // so "Other Project 2" (2022-02-01) should come before "Other Project 1" (2021-12-01)
      expect(otherProjects[0].title).toBe("Other Project 2");
      expect(otherProjects[1].title).toBe("Other Project 1");
    }
  });

  it("handles cases where there are fewer than three top projects", () => {
    const projects = [
      createProject("proj-featured", "Featured Project", "featured", "2022-04-01"),
      createProject("proj-top2", "Top 2 Project", "top2", "2022-03-15"),
    ];

    const result = categorizeProjects(projects);
    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      const { featured, top2, top3, otherProjects } = result.value;
      expect(featured?.title).toBe("Featured Project");
      expect(top2?.title).toBe("Top 2 Project");
      expect(top3).toBeUndefined(); // No third project
      expect(otherProjects.length).toBe(0);
    }
  });

  it("prioritizes by sortOrder over publishDate", () => {
    const projects = [
      createProject("old-featured", "Old Featured", "featured", "2020-01-01"),
      createProject("new-top2", "Newer Top2", "top2", "2022-01-01"),
      createProject("old-top2", "Older Top2", "top2", "2021-01-01"),
      createProject("another-other", "Another Other", "other", "2022-05-01"),
    ];

    // Since featured is higher priority than top2, the featured project
    // should always appear first, even if it's older.
    const result = categorizeProjects(projects);
    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      const { featured, top2, otherProjects } = result.value;
      expect(featured?.title).toBe("Old Featured");
      expect(top2?.title).toBe("Newer Top2");
      // The next top project is the older Top2
      expect(result.value.top3?.title).toBe("Older Top2");
      // "Another Other" goes into otherProjects
      expect(otherProjects.length).toBe(1);
    }
  });
});
