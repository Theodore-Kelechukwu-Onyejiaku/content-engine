import { ChartNoAxesColumn } from "lucide-react";

export default function SeoResultsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
      <h1 className="text-2xl font-bold tracking-tight">SEO Results</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Insights about how winnable a topic is, based on what already ranks.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
          <ChartNoAxesColumn className="size-6" />
        </span>
        <p className="font-medium text-neutral-700">No SEO results yet</p>
        <p className="max-w-sm text-sm text-neutral-500">
          Run a search to see SEO results here.
        </p>
      </div>
    </div>
  );
}
