import { Meta } from "@content-collections/core";

export type SortOrder = "featured" | "top2" | "top3" | "other";

export type Project = {
  mdx: string;
  slug: string;
  contentType: string;
  content: string;
  title: string;
  description: string;
  keywords: string[];
  tech: string[];
  draft: boolean;
  publishDate: string;
  url?: string;
  repository?: string;
  sortOrder: SortOrder; // Always one of the defined SortOrder values
  _meta: Meta;
}