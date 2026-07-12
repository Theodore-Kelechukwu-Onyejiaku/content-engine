export type SearchCategory = "articles" | "videos" | "youtube" | "ai";

export const CATEGORIES: { key: SearchCategory; label: string }[] = [
  { key: "articles", label: "Articles" },
  { key: "videos", label: "Video Shorts" },
  { key: "youtube", label: "YouTube" },
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
  result: Partial<SearchCategory, searchResult[]>;
};
