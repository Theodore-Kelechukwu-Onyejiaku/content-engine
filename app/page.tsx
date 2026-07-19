import SearchForm from "@/app/components/SearchForm";
import ResultsTab from "@/app/components/ResultsTab";
import RecentSearch from "./components/RecentSearch";
import { defaultFetch } from "./lib/default-data";
import { getResultsFromStorage } from "./lib/utils";

export default function Home() {
  const fromStorage = getResultsFromStorage();
  console.log("this is from Storage", fromStorage);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-y-6 px-6 py-10">
      <div className="flex flex-col items-center gap-y-2 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Welcome to Content Engine and SEO VAR
        </h1>
        <p className="text-sm text-neutral-600">
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
