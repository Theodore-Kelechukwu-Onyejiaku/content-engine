"use client";

import { useEffect } from "react";
import { useSearch } from "../SearchContext";

const RecentSearch = () => {
  const recentSearches = useSearch((state) => state.previousSearches);
  const setCurrentSearch = useSearch((state) => state.setCurrentSearch);
  const hydrateSearches = useSearch((state) => state.hydrateSearches);

  useEffect(() => {
    hydrateSearches();
  }, [hydrateSearches]);

  return (
    <aside className="shrink-0 md:basis-1/4">
      <h2 className="text-lg font-semibold">Recent Searches</h2>
      <ul className="mt-2 flex flex-col gap-2">
        {recentSearches.map((search) => (
          <li key={search.query}>
            <button
              onClick={() => {
                setCurrentSearch(search.query);
              }}
              type="button"
              className="w-full rounded-md border border-neutral-200 p-3 text-left text-sm font-medium hover:bg-neutral-100"
            >
              {search.query}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default RecentSearch;
