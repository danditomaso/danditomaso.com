import { notFound } from "next/navigation";
import { Header } from "./header";
import { components } from "@/mdx-components";
import { getProjectBySlug, getProjectSlugs } from "@/service/projects";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const metadata: Metadata = {
  title: "Dan Ditomaso ",
  openGraph: {
    type: "website",
  },
  robots: {
    follow: true,
    index: true,
  },
};

export async function generateStaticParams() {
  const slugs = getProjectSlugs()

  if (slugs.isErr()) {
    return notFound();
  }
  const safeSlugs = slugs.value

  return safeSlugs.map((s) => ({
    slug: s
  }))
}

export default async function PostPage(props: Props) {
  const params = await props.params;
  const slug = params?.slug;

  const post = getProjectBySlug(slug);

  if (post.isErr()) {
    return notFound();
  }

  const _post = post.value;

  return (
    <div className="bg-white min-h-screen">
      <Header project={_post} views={0} />
      <article className="px-6 pt-14 mx-auto max-w-7xl lg:px-16 pb-12">
        <MDXRemote source={_post?.content} components={components} />
      </article>
    </div>
  );
}
