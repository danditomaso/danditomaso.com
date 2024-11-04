import { notFound } from "next/navigation";
import { Header } from "./header";
import "./mdx.css";
import { ViewCounter } from "@/app/components/analytics/view-count";
import { MDX } from "@/app/components/mdx-content";
import { RedisClient } from "@/service/redis";
import { allProjects } from "content-collections";

export const revalidate = 60;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const redis = new RedisClient();

export default async function PostPage(props: Props) {
  const params = await props.params;
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

      <article className="px-4 py-12 min-w-7xl mx-auto prose prose-slate prose-quoteless">
        <MDX code={project.mdx} />
      </article>
    </div>
  );
}
