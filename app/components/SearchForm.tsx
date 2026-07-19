"use client";

import { useState, useTransition } from "react";
import { getSerpResults } from "@/app/lib/actions";
import { SerpResults, searchResult } from "@/app/lib/definitions";
import { saveResultToStorage } from "@/app/lib/utils";
import { defaultFetch } from "../lib/default-data";
import { useSearch } from "../SearchContext";
import { Search, Loader2 } from "lucide-react";

function ResultSection({
  title,
  results,
}: {
  title: string;
  results: searchResult[];
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold">{title}</h2>
      {/* <ul className="mt-2 flex flex-col gap-2">
        {results.map((result) => (
          <li
            key={result.link}
            className="rounded-md border border-neutral-200 p-3 transition-colors hover:bg-neutral-50"
          >
            <a
              href={result.link}
              className="font-medium hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {result.title}
            </a>
            <p className="mt-1 text-sm text-neutral-600">{result.snippet}</p>
            <p className="mt-1 text-xs text-neutral-400">
              {result.source}
              {result.duration ? ` · ${result.duration}` : ""}
            </p>
          </li>
        ))}
      </ul> */}
    </section>
  );
}

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SerpResults | null>(null);
  const [isPending, startTransition] = useTransition();

  const setCurrentSearch = useSearch((state) => state.setCurrentSearch);

  const handleSearch = () => {
    startTransition(async () => {
      const serpResults = await getSerpResults(query);
      setResults(serpResults);
      if (serpResults) {
        const formattedSerpResult = {
          query: serpResults.query,
          result: {
            searchOverview: serpResults?.searchOverview,
            longFormVideos: serpResults?.longFormVideos,
            shorts: serpResults?.shorts,
          },
        };
        saveResultToStorage(formattedSerpResult);
        setCurrentSearch(formattedSerpResult);
      }
    });
  };

  return (
    <div className="w-full max-w-2xl">
      <form action={handleSearch} className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a topic to search..."
          className="w-full rounded-xl border border-neutral-200 bg-white py-3.5 pr-32 pl-11 text-sm shadow-sm transition placeholder:text-neutral-400 outline-none focus:border-neutral-400 focus:ring-4 focus:ring-neutral-200/60"
        />
        <button
          type="submit"
          disabled={isPending || !query.trim()}
          className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-1.5 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:pointer-events-none disabled:opacity-40"
        >
          {isPending ? (
            <>
              <Loader2 className="size-3.5 animate-spin" />
              Searching...
            </>
          ) : (
            "Search"
          )}
        </button>
      </form>

      {results && (
        <div className="mt-8 flex flex-col gap-6">
          <ResultSection
            title="Blog Tutorials"
            results={results.blogTutorials}
          />
          <ResultSection
            title="Top Performing Videos"
            results={results.videos}
          />
          <ResultSection
            title="Top Performing Shorts"
            results={results.shorts}
          />
        </div>
      )}
    </div>
  );
}
