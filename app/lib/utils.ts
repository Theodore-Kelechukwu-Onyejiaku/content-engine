import { searchContext } from "@/app/lib/definitions";
import { defaultSearchContext } from "@/app/lib/default-data";

const STORAGE_KEY = "content-engine-results";
export const MAX_STORED_RESULTS = 20;

export const getResultsFromStorage = (): searchContext[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as searchContext[]) : [];
  } catch {
    return [];
  }
};

// Saves a search result to localStorage. Called with no argument, it seeds
// the previously fetched "strapi" content from default-data.
export const saveResultToStorage = (
  context: searchContext = defaultSearchContext,
) => {
  if (typeof window === "undefined") {
    console.log("not working");
    return;
  }
  const results = getResultsFromStorage().filter(
    (result) => result.query !== context.query,
  );
  results.unshift(context);
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(results.slice(0, MAX_STORED_RESULTS)),
  );

  console.log("I have saved to storage");
};

export const deleteResultFromStorage = (query: string) => {
  if (typeof window === "undefined") return;
  const results = getResultsFromStorage().filter(
    (result) => result.query !== query,
  );
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
};

export const clearAllResultsFromStorage = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
};
