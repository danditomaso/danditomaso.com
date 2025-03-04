import { z } from "zod";

export type SortOrder = "featured" | "top2" | "top3" | "other";

export const ProjectMetadataSchema = z.object({
  sortOrder: z.enum(["featured", "top2", "top3", "other"]),
  description: z.string(),
  title: z.string(),
  tech: z.array(z.string()),
  github: z.string().optional(),
  website: z.string(),
  publishDate: z.string(),
  slug: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

export type ProjectMeta = z.infer<typeof ProjectMetadataSchema>;

export type Project = {
  content: string;
  meta: ProjectMeta;
};
