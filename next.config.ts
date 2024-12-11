import { withContentCollections } from "@content-collections/next";
import bundleAnalyzer from "@next/bundle-analyzer";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["tsx", "mdx"],
  images: {
    domains: ["danditomaso.com"],
  },
  // redirect bots back to home page
  redirects: async () => {
    return [
      {
        source: "/viewr",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/vewr",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/vwer",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
  experimental: {
    mdxRs: true,
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withContentCollections(withBundleAnalyzer(nextConfig));
