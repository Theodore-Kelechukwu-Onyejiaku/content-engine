export type SearchCategory = "articles" | "videos" | "youtube" | "ai";

export const CATEGORIES: { key: SearchCategory; label: string }[] = [
  { key: "all", label: "Search Overview" },
  { key: "videos", label: "Video Shorts" },
  { key: "youtube", label: "Long-form Video" },
  { key: "ai", label: "AI Overview" },
];

export type searchResult = {
  title: string;
  link: string;
  snippet: string;
  thumbnail?: string;
  duration?: string;
  source: string;
};

export type searchContext = {
  query: string;
  result: Partial<Record<SearchCategory, searchResult[]>>;
};

export type SerpResults = {
  query: string;
  searchOverview: searchResult[];
  longFormVideos: searchResult[];
  shorts: searchResult[];
};
