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

export type SeoCheckStatus = "pass" | "warn" | "fail" | "skipped";

export type SeoCheckValue = { label: string; value: string | null };

export type SeoCheck = {
  id: string;
  title: string;
  description: string;
  status: SeoCheckStatus;
  details: string;
  found?: SeoCheckValue[];
  image?: string | null;
};

export type SeoPageMetadata = {
  title: string | null;
  description: string | null;
  canonical: string | null;
  robots: string | null;
  lang: string | null;
  openGraph: {
    title: string | null;
    description: string | null;
    image: string | null;
    type: string | null;
    url: string | null;
  };
  h1: string[];
  wordCount: number;
  images: { total: number; missingAlt: number };
  structuredDataTypes: string[];
  lastModified: string | null;
};

export type SeoAuditResult = {
  url: string;
  score: number;
  page: SeoPageMetadata;
  checks: SeoCheck[];
  auditedAt: string;
};

export type SerpResults = {
  query: string;
  searchOverview: searchResult[];
  longFormVideos: searchResult[];
  shorts: searchResult[];
};
