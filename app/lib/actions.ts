"use server";

import {
  getTopBlogTutorials,
  getTopPerformingVideos,
  getTopPerformingShorts,
} from "@/app/lib/serp-functions";
import { SerpResults } from "@/app/lib/definitions";

export async function getSerpResults(
  query: string,
): Promise<SerpResults | null> {
  console.log("I am called!");
  const trimmed = query.trim();
  if (!trimmed) return null;

  return null
  const [blogTutorials, videos, shorts] = await Promise.all([
    getTopBlogTutorials(trimmed),
    getTopPerformingVideos(trimmed),
    getTopPerformingShorts(trimmed),
  ]);

  return { query: trimmed, blogTutorials, videos, shorts };
}
