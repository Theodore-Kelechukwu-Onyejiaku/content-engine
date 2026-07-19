import { create } from "zustand";
import { searchContext } from "./lib/definitions";
import { getResultsFromStorage, deleteResultFromStorage } from "./lib/utils";

type State = {
  previousSearches: searchContext[];
  currentSearch: searchContext | null;
};

type Action = {
  hydrateSearches: () => void;
  setCurrentSearch: (query: string) => void;
  removeFromSearches: (query: string) => void;
};

export const useSearch = create<State & Action>()((set) => ({
  // Starts empty on both server and client so hydration matches;
  // hydrateSearches() loads the real list from localStorage after mount.
  previousSearches: [],
  currentSearch: null,

  hydrateSearches: () => set({ previousSearches: getResultsFromStorage() }),

  setCurrentSearch: (query) =>
    set((state) => ({
      currentSearch:
        state.previousSearches.find((search) => search.query === query) ??
        null,
    })),

  removeFromSearches: (query) => {
    deleteResultFromStorage(query);
    set((state) => ({
      previousSearches: state.previousSearches.filter(
        (search) => search.query !== query,
      ),
    }));
  },
}));
