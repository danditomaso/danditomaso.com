import { z } from "zod";

export type SortOrder = "featured" | "top2" | "top3" | "other";

export const ProjectMetadataSchema = z.object({
  draft: z.boolean(),
  sortOrder: z.enum(["featured", "top2", "top3", "other"]),
  description: z.string(),
  title: z.string(),
  tech: z.array(z.string()),
  repository: z.string().optional(),
  url: z.string(),
  publishDate: z.string(),
  slug: z.string().optional(),
  keywords: z.array(z.string()),
});

export type ProjectMeta = z.infer<typeof ProjectMetadataSchema>;

export type Project = {
  content: string;
  meta: ProjectMeta;
};
