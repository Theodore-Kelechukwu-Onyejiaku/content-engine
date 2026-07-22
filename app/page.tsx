import SearchForm from "@/app/components/SearchForm";
import ResultsTab from "@/app/components/ResultsTab";
import RecentSearch from "./components/RecentSearch";
import { defaultFetch } from "./lib/default-data";
import { getResultsFromStorage } from "./lib/utils";
import { Sparkles } from "lucide-react";

export default function Home() {
  const fromStorage = getResultsFromStorage();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-y-6 px-6 py-8 md:py-10">
      <div className="flex flex-col items-center gap-y-2 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-500 shadow-sm">
          <Sparkles className="size-3.5" />
          Powered by live SERP data
        </span>
        <h1 className="max-w-3xl text-xl font-bold tracking-tight text-balance sm:text-2xl">
          Welcome to Content Engine (Content, SEO, AEO and GEO VAR)
        </h1>
        <p className="max-w-lg text-sm leading-relaxed text-neutral-500">
          Search a topic to see what content already exists before you create
          your own. And get suggestions for your next content.
        </p>
      </div>
      <SearchForm />
      <div className="flex w-full flex-col gap-6 md:flex-row">
        <RecentSearch />
        <ResultsTab />
      </div>
    </div>
  );
}
