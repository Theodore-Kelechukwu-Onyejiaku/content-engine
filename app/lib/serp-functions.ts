import { searchResult } from "@/app/lib/definitions";
import { getJson } from "serpapi";

type OrganicResult = {
  title: string;
  link: string;
  snippet?: string;
  source?: string;
  displayed_link?: string;
};

export const getAllResults = async (query: string): Promise<searchResult[]> => {
  try {
    const json = await getJson({
      engine: "google",
      api_key: process.env.SERPAPI_API_KEY,
      q: query,
    });

    const results = json;
    console.log("overview search", json);

    // const organicResults: OrganicResult[] = json.organic_results ?? [];

    // return organicResults.map((result) => ({
    //   title: result.title,
    //   link: result.link,
    //   snippet: result.snippet ?? "",
    //   source: result.source ?? result.displayed_link ?? "",
    // }));
    return results;
  } catch (error) {
    console.error("Failed to fetch blog tutorials from SerpApi:", error);
    return [];
  }
};

export const getTopPerformingVideos = async (
  query: string,
): Promise<searchResult[]> => {
  const json = await getJson({
    engine: "youtube",
    api_key: process.env.SERPAPI_API_KEY,
    search_query: query,
    // q: query,
  });

  const results = json;

  console.log("top longform videos,", json);

  return results;

  // return [
  //   {
  //     title: `Top performing video about ${query}`,
  //     link: "https://youtube.com/watch?v=dummy1",
  //     snippet: `A dummy video result for "${query}".`,
  //     duration: "12:34",
  //     source: "YouTube",
  //   },
  // ];
};

export const getTopPerformingShorts = async (
  query: string,
): Promise<searchResult[]> => {
  return null;
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
