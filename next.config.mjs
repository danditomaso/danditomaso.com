import { withContentCollections } from "@content-collections/next";
import bundleAnalyzer from "@next/bundle-analyzer";

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

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withContentCollections(withBundleAnalyzer(nextConfig));
