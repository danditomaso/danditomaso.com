import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { remarkGfm, remarkHeading, remarkStructure } from "fumadocs-core/mdx-plugins";

const posts = defineCollection({
  name: "projects",
  directory: "./content/projects",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    published: z.boolean().optional(),
    date: z.string().optional(),
    url: z.string().optional(),
    respository: z.string().optional(),
  }),
  transform: async (document, context) => {
    // console.log(doc._meta);

    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm, remarkHeading, remarkStructure],
    });
    return {
      ...document,
      mdx,
      slug: document._meta.path,
      url: `/projects/${document._meta.path}`,
      contentType: "mdx",
    };
  },
});


export default defineConfig({
  collections: [posts],
});