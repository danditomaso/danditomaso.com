import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    domains: ["danditomaso.com"],
  },
  experimental: {
    mdxRs: true,
  },
};

export default withContentCollections(nextConfig);
