import { notFound } from "next/navigation";
import { Header } from "./header";
import "./mdx.css";
import { ViewCounter } from "@/app/components/analytics/view-count";
import { MDX } from "@/app/components/mdx-content";
import { RedisClient } from "@/service/redis";
import { allProjects } from "content-collections";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

const redis = new RedisClient();

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  const views = (await redis.get<number>(["pageviews", "projects", slug])) ?? 0;

  return (
    <div className="bg-white min-h-screen">
      <Header project={project} views={views} />
      <ViewCounter slug={project.slug} />

      <article className="px-4 py-12 mx-auto prose prose-slate prose-quoteless">
        <MDX code={project.mdx} />
      </article>
    </div>
  );
}
