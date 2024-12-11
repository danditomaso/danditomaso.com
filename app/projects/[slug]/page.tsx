import { notFound } from "next/navigation";
import { Header } from "./header";
import "./mdx.css";
import { ViewCounter } from "@/app/components/analytics/view-count";
import { MDX } from "@/app/components/mdx-content";
import { getProjectBySlug } from "@/service/projects";
import { RedisClient } from "@/service/redis";
import { allProjects } from "content-collections";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const redis = new RedisClient();

export default async function PostPage(props: Props) {
  const params = await props.params;
  const slug = params?.slug;
  const project = getProjectBySlug(slug, allProjects);

  if (project.isErr()) {
    return notFound();
  }

  const _project = project.value;

  const views = (await redis.get<number>(["pageviews", "projects", slug])) ?? 0;

  return (
    <div className="bg-white min-h-screen">
      <Header project={_project} views={views} />
      <ViewCounter slug={_project.slug} />

      <article className="px-6 pt-14 mx-auto space-y-8 max-w-7xl lg:px-16 md:space-y-16">
        <MDX code={_project.mdx} />
      </article>
    </div>
  );
}
