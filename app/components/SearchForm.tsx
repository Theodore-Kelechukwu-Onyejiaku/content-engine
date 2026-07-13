"use client";

import { useState, useTransition } from "react";
import { getSerpResults } from "@/app/lib/actions";
import { SerpResults, searchResult } from "@/app/lib/definitions";

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
      <ul className="mt-2 flex flex-col gap-2">
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
            <p className="mt-1 text-sm text-neutral-600">
              {result.snippet}
            </p>
            <p className="mt-1 text-xs text-neutral-400">
              {result.source}
              {result.duration ? ` · ${result.duration}` : ""}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SerpResults | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSearch = () => {
    startTransition(async () => {
      setResults(await getSerpResults(query));
    });
  };

  return (
    <div className="w-full max-w-2xl">
      <form
        action={handleSearch}
        className="flex gap-2"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a topic to search..."
          className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm placeholder:text-neutral-400 outline-none focus:border-neutral-500"
        />
        <button
          type="submit"
          disabled={isPending || !query.trim()}
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:pointer-events-none disabled:opacity-50"
        >
          {isPending ? "Searching..." : "Search"}
        </button>
      </form>

      {results && (
        <div className="mt-8 flex flex-col gap-6">
          <ResultSection title="Blog Tutorials" results={results.blogTutorials} />
          <ResultSection title="Top Performing Videos" results={results.videos} />
          <ResultSection title="Top Performing Shorts" results={results.shorts} />
        </div>
      )}
    </div>
  );
}
