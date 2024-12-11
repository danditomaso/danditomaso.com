import { Meta } from "@content-collections/core";

export type SortOrder = "featured" | "top2" | "top3" | "other";
export interface Project {
  mdx: string;
  slug: string;
  contentType: string;
  content: string;
  title: string;
  description: string;
  tech: string[];
  published: boolean; // Guaranteed to be a boolean
  date: string; // Always defined as a valid string
  url?: string;
  repository?: string;
  sortOrder: SortOrder; // Always one of the defined SortOrder values
  _meta: Meta;
}