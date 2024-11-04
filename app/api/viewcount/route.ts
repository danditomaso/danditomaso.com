import { RedisClient } from "@/service/redis";
import { headers } from "next/headers";

const redis = new RedisClient();

export const runtime = "edge";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new Response("This must be a request using the POST method", { status: 405 });
  }

  if (req.headers.get("Content-Type") !== "application/json") {
    return new Response("Must be JSON", { status: 400 });
  }

  const body = await req.json();
  let slug: string | undefined = undefined;
  if ("slug" in body) {
    slug = body.slug;
  }

  if (!slug) {
    return new Response("Slug not found", { status: 400 });
  }
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") ?? "127.0.0.1";

  if (ip) {
    // Hash the IP in order to not store it directly in your db.
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // deduplicate the ip for each slug
    const isNew = await redis.set(["deduplicate", hash, slug], true, {
      nx: true,
      ex: 24 * 60 * 60,
    });
    if (!isNew) {
      new Response(null, { status: 202 });
    }
  }
  await redis.incr(["pageviews", "projects", slug]);
  return new Response(null, { status: 202 });
}
