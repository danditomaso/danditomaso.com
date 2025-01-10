// import { getAllProjects } from "@/service/projects";
// import type { MetadataRoute } from "next";

// export default function sitemap() {
//   const baseURL = "https://danditomaso.com";

//   const projects = getAllProjects();

//   if (projects.isErr()) {
//     return [];
//   }
//   const projectData = projects.value;

//   const projectRoutes = projectData.map((project) => {
//     return {
//       url: `${baseURL}${project.meta.slug}`,
//       lastModified: new Date(project.meta.publishDate),
//       // changeFrequency: "weekly" as const,
//       changeFrequency: "weekly",
//       priority: 0.8,
//     };
//   });

//   return [
//     {
//       url: baseURL,
//       lastModified: new Date(),
//     },
//     {
//       url: `${baseURL}/projects`,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 0.8,
//     },
//     {
//       url: `${baseURL}/contact`,
//       lastModified: new Date(),
//       changeFrequency: "yearly",
//       priority: 0.8,
//     },
//     ...projectRoutes,
//   ];
// }
