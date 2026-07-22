export type SearchCategory = "all" | "articles" | "videos" | "youtube" | "ai";

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

// `result` holds raw SerpApi responses keyed by section (searchOverview,
// longFormVideos, shorts) or legacy category keys; consumers narrow the
// shape they need with a cast.
export type searchContext = {
  query: string;
  result: Record<string, unknown>;
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

// Raw SerpApi responses, passed through untyped from the server action.
export type SerpResults = {
  query: string;
  searchOverview: unknown;
  longFormVideos: unknown;
  shorts: unknown;
};
