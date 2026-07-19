import React from "react";
import { useSearch } from "@/app/SearchContext";
import {
  Globe,
  MessageCircleQuestion,
  Play,
  TrendingUp,
  ExternalLink,
} from "lucide-react";

// Shapes of the parts of the raw Google SerpApi response that this card renders.
type OrganicResult = {
  position: number;
  title: string;
  link: string;
  displayed_link?: string;
  favicon?: string;
  snippet?: string;
  source?: string;
  sitelinks?: {
    expanded?: { title: string; link: string; snippet?: string }[];
  };
};

type InlineVideo = {
  position: number;
  title: string;
  link: string;
  thumbnail?: string;
  channel?: string;
  duration?: string;
  platform?: string;
  date?: string;
  snippet?: string;
  key_moments?: { time: string; title: string; link: string }[];
};

type RelatedQuestion = {
  question: string;
  type?: string;
};

type RelatedSearch = {
  query: string;
  link: string;
};

type SearchOverview = {
  search_information?: {
    total_results?: number;
    time_taken_displayed?: number;
  };
  organic_results?: OrganicResult[];
  related_questions?: RelatedQuestion[];
  inline_videos?: InlineVideo[];
  related_searches?: RelatedSearch[];
};

const SectionHeading = ({
  icon: Icon,
  title,
  count,
}: {
  icon: typeof Globe;
  title: string;
  count?: number;
}) => (
  <div className="flex items-center gap-1.5">
    <Icon className="size-3.5 text-neutral-400" />
    <h4 className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
      {title}
    </h4>
    {count !== undefined && count > 0 && (
      <span className="rounded-full bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500 tabular-nums">
        {count}
      </span>
    )}
  </div>
);

export default function All() {
  const currentSearch = useSearch((state) => state.currentSearch);

  const overview = (
    currentSearch?.result as { searchOverview?: SearchOverview } | undefined
  )?.searchOverview;

  if (!overview) return null;

  const organicResults = overview.organic_results ?? [];
  const relatedQuestions = overview.related_questions ?? [];
  const inlineVideos = overview.inline_videos ?? [];
  const relatedSearches = overview.related_searches ?? [];

  return (
    <div className="mt-5 flex flex-col gap-7">
      {/* Keywords — People Also Ask questions, the content-idea gold */}
      {relatedQuestions.length > 0 && (
        <section>
          <SectionHeading
            icon={MessageCircleQuestion}
            title="Keywords · People Also Ask"
            count={relatedQuestions.length}
          />
          <ul className="mt-2.5 flex flex-wrap gap-2">
            {relatedQuestions.map((item) => (
              <li
                key={item.question}
                className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-700"
              >
                {item.question}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Inline videos — horizontal scroll row */}
      {inlineVideos.length > 0 && (
        <section>
          <SectionHeading
            icon={Play}
            title="Videos on the results page"
            count={inlineVideos.length}
          />
          <ul className="mt-2.5 flex gap-3 overflow-x-auto pb-2">
            {inlineVideos.map((video) => (
              <li key={video.link} className="w-56 shrink-0">
                <a
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-lg border border-neutral-200 transition-all hover:border-neutral-300 hover:shadow-sm"
                >
                  <div className="relative">
                    {video.thumbnail && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={video.thumbnail}
                        alt=""
                        className="h-28 w-full object-cover"
                      />
                    )}
                    {video.duration && (
                      <span className="absolute right-1.5 bottom-1.5 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-medium text-white tabular-nums">
                        {video.duration}
                      </span>
                    )}
                  </div>
                  <div className="p-2.5">
                    <p className="line-clamp-2 text-sm font-medium text-neutral-800 group-hover:underline">
                      {video.title}
                    </p>
                    <p className="mt-1 truncate text-xs text-neutral-400">
                      {[video.channel, video.date].filter(Boolean).join(" · ")}
                    </p>
                    {video.key_moments && video.key_moments.length > 0 && (
                      <p className="mt-1 text-[10px] font-medium text-neutral-400">
                        {video.key_moments.length} key moments
                      </p>
                    )}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Top searches — organic results */}
      {organicResults.length > 0 && (
        <section>
          <SectionHeading
            icon={Globe}
            title="Top searches"
            count={organicResults.length}
          />
          <ul className="mt-2.5 flex flex-col gap-2">
            {organicResults.map((result) => (
              <li
                key={result.link}
                className="rounded-lg border border-neutral-200 p-3 transition-all hover:border-neutral-300 hover:shadow-sm"
              >
                <div className="flex items-center gap-2">
                  {result.favicon && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={result.favicon}
                      alt=""
                      className="size-5 shrink-0 rounded"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-neutral-500">
                      {result.source ?? ""}
                    </p>
                    <p className="truncate text-[10px] text-neutral-400">
                      {result.displayed_link ?? ""}
                    </p>
                  </div>
                  <span className="ml-auto rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-500 tabular-nums">
                    #{result.position}
                  </span>
                </div>
                <a
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 flex items-start gap-1 font-medium text-neutral-800 hover:underline"
                >
                  {result.title}
                  <ExternalLink className="mt-1 size-3 shrink-0 text-neutral-300" />
                </a>
                {result.snippet && (
                  <p className="mt-1 line-clamp-2 text-sm text-neutral-500">
                    {result.snippet}
                  </p>
                )}
                {result.sitelinks?.expanded &&
                  result.sitelinks.expanded.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {result.sitelinks.expanded.map((sitelink) => (
                        <a
                          key={sitelink.link}
                          href={sitelink.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-neutral-900"
                        >
                          {sitelink.title}
                        </a>
                      ))}
                    </div>
                  )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related searches — adjacent keywords worth targeting */}
      {relatedSearches.length > 0 && (
        <section>
          <SectionHeading
            icon={TrendingUp}
            title="Related searches"
            count={relatedSearches.length}
          />
          <ul className="mt-2.5 flex flex-wrap gap-2">
            {relatedSearches.map((item) => (
              <li key={item.query}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-neutral-200 px-3 py-1.5 text-sm text-neutral-600 transition-colors hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
                >
                  {item.query}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
