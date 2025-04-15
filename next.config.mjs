import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";

const nextConfig = {
  transpilePackages: ["next-mdx-remote"], // this is temporarily while they solve this issue https://github.com/vercel/next.js/issues/64525
  pageExtensions: ["tsx", "mdx"],
  images: {
    domains: ["danditomaso.com", "http://localhost:3000"],
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
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withMDX = createMDX({});

export default withBundleAnalyzer(withMDX(nextConfig));
