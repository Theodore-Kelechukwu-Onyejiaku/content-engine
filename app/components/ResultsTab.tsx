"use client";

import { useState } from "react";
import { CATEGORIES, SearchCategory } from "../lib/definitions";
import {
  NotebookPen,
  VideotapeIcon,
  PlayCircle,
  Sparkles,
  LucideIcon,
} from "lucide-react";

const CATEGORY_ICONS: Record<SearchCategory, LucideIcon> = {
  articles: NotebookPen,
  videos: VideotapeIcon,
  youtube: PlayCircle,
  ai: Sparkles,
};

const ResultsTab = () => {
  const [activeTab, setActiveTab] = useState<SearchCategory>("articles");
  const active = CATEGORIES.find((cat) => cat.key === activeTab)!;

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.key];
          const isActive = cat.key === activeTab;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveTab(cat.key)}
              className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              <Icon className="size-4" /> {cat.label}
            </button>
          );
        })}
      </div>
      <div className="mt-4 rounded-md border border-neutral-200 p-5">
        <h3 className="font-semibold">{active.label}</h3>
        <p className="mt-1 text-sm text-neutral-600">
          Search a topic to see the top {active.label} results here.
        </p>
      </div>
    </div>
  );
};

export default ResultsTab;
