import type { Project } from "@/.content-collections/generated";

export function categorizeProjects(projects: Project[]): Project[] {
  return projects.filter((p) => p.published).sort((a, b) =>
    new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
    new Date(a.date ?? Number.POSITIVE_INFINITY).getTime()
  ).sort(
    (a, b) => {
      const priority = {
        "featured": 1,
        "top2": 2,
        "top3": 3,
        "other": 4
      };
      return (priority[a.display ?? "other"] - priority[b.display ?? "other"]);
    }
  )
}


/