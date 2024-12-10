import { notFound } from "next/navigation";
import { Header } from "./header";
import { ViewCounter } from "@/app/components/analytics/view-count";
import { RedisClient } from "@/service/redis";
import { allProjects } from "content-collections";

export const dynamicParams = false;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const redis = new RedisClient();

export function generateStaticParams() {
  const projects = allProjects.map((project) => ({ slug: project.slug }));
  return projects
}

export default async function PostPage({ params }: Props) {
  const slug = (await params).slug;
  const { default: Project, meta } = await import(`../../../content/${slug}.mdx`);

  const views = (await redis.get<number>(["pageviews", "projects", slug])) ?? 0;

  return (
    <div className="bg-white min-h-screen">
      <Header project={meta} views={views} />
      <ViewCounter slug={slug} />

      <article className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-16 md:pt-6 lg:pt-6 min-w-7xl container">
        <Project />
      </article>
    </div>
  );
}
