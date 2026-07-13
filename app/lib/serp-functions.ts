import { searchResult } from "@/app/lib/definitions";
import { getJson } from "serpapi";

export const getTopBlogTutorials = async (
  query: string,
): Promise<searchResult[]> => {
  const search = await getJson(
    {
      engine: "google",
      api_key: process.env.SERPAPI_API_KEY,
      q: query,
    },
    (json) => {
      console.log(json);
    },
  );

  return [
    {
      title: `Top blog tutorial about ${query}`,
      link: "https://example.com/blog/1",
      snippet: `A dummy blog tutorial result for "${query}".`,
      source: "example.com",
    },
  ];
};

export const getTopPerformingVideos = async (
  query: string,
): Promise<searchResult[]> => {
  return [
    {
      title: `Top performing video about ${query}`,
      link: "https://youtube.com/watch?v=dummy1",
      snippet: `A dummy video result for "${query}".`,
      duration: "12:34",
      source: "YouTube",
    },
  ];
};

export const getTopPerformingShorts = async (
  query: string,
): Promise<searchResult[]> => {
  return [
    {
      title: `Top performing short about ${query}`,
      link: "https://youtube.com/shorts/dummy1",
      snippet: `A dummy short result for "${query}".`,
      duration: "0:45",
      source: "YouTube Shorts",
    },
  ];
};
