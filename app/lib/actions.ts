"use server";

import {
  getTopPerformingVideos,
  getTopPerformingShorts,
  getAllResults,
} from "@/app/lib/serp-functions";
import { SerpResults } from "@/app/lib/definitions";

export async function getSerpResults(
  query: string,
): Promise<SerpResults | null> {
  const trimmed = query.trim();
  if (!trimmed) {
    console.log("nothing to call");
    return null;
  }

  const [searchOverview, longFormVideos, shorts] = await Promise.all([
    getAllResults(trimmed),
    getTopPerformingVideos(trimmed),
    getTopPerformingShorts(trimmed),
  ]);

  return { query, searchOverview, longFormVideos, shorts };
}
