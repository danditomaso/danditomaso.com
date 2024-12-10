import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from '@next/mdx';
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
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

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(withBundleAnalyzer(nextConfig));
