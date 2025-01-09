import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

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

const withMDX = createMDX({});

export default withBundleAnalyzer(withMDX(nextConfig));
