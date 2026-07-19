"use client";

import { useEffect } from "react";
import { useSearch } from "../SearchContext";
import { History, Search, X } from "lucide-react";

const RecentSearch = () => {
  const recentSearches = useSearch((state) => state.previousSearches);
  const setCurrentSearch = useSearch((state) => state.setCurrentSearch);
  const hydrateSearches = useSearch((state) => state.hydrateSearches);

  useEffect(() => {
    hydrateSearches();
  }, [hydrateSearches]);

  return (
    <aside className="shrink-0 md:basis-1/4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-neutral-500 uppercase">
          <History className="size-3.5" />
          Recent Searches
        </h2>
        {recentSearches.length > 0 && (
          <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-500 tabular-nums">
            {recentSearches.length}
          </span>
        )}
      </div>

      {recentSearches.length === 0 ? (
        <div className="mt-3 flex flex-col items-center gap-2 rounded-lg border border-dashed border-neutral-300 px-4 py-8 text-center">
          <Search className="size-5 text-neutral-300" />
          <p className="text-sm text-neutral-500">
            Your searches will show up here.
          </p>
        </div>
      ) : (
        <ul className="mt-3 flex flex-col gap-1.5">
          {recentSearches.map((search) => (
            <li
              key={search.query}
              className="group relative flex items-center rounded-lg border border-neutral-200 bg-white transition-all hover:border-neutral-300 hover:shadow-sm"
            >
              <button
                onClick={() => {
                  setCurrentSearch(search.query);
                }}
                type="button"
                className="flex min-w-0 flex-1 items-center gap-2.5 rounded-lg p-3 pr-9 text-left cursor-pointer"
              >
                <Search className="size-3.5 shrink-0 text-neutral-400" />
                <span className="truncate text-sm font-medium text-neutral-800 capitalize">
                  {search.query}
                </span>
              </button>
              <X className="absolute right-2.5 size-4 shrink-0 cursor-pointer rounded text-neutral-300 opacity-0 transition-opacity group-hover:opacity-100 hover:text-neutral-700" />
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default RecentSearch;
