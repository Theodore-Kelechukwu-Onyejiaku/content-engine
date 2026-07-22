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

import { useSearch } from "../SearchContext";
import All from "./ResultCards/All";
import LongFormVideo from "./ResultCards/LongFormVideo";

const CATEGORY_ICONS: Record<SearchCategory, LucideIcon> = {
  all: NotebookPen,
  videos: VideotapeIcon,
  youtube: PlayCircle,
  ai: Sparkles,
};

const ResultsTab = () => {
  const [activeTab, setActiveTab] = useState<SearchCategory>("all");
  const active = CATEGORIES.find((cat) => cat.key === activeTab)!;

  const currentSearch = useSearch((state) => state.currentSearch);

  const ActiveIcon = CATEGORY_ICONS[activeTab];

  return (
    <div className="w-full min-w-0">
      <div className="inline-flex flex-wrap gap-1 rounded-xl border border-neutral-200 bg-white p-1 shadow-sm">
        {CATEGORIES.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.key];
          const isActive = cat.key === activeTab;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveTab(cat.key)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-base font-medium transition-colors ${
                isActive
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              <Icon className="size-4" /> {cat.label}
            </button>
          );
        })}
      </div>
      <div className="mt-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600">
            <ActiveIcon className="size-4" />
          </span>
          <h3 className="text-lg font-semibold">{active.label}</h3>
        </div>
        <p className="mt-3 text-base text-neutral-500">
          Search a topic to see the top {active.label} results here.
        </p>
        {/* <pre className="mt-3 max-h-48 overflow-auto rounded-lg bg-neutral-50 p-3 font-mono text-xs break-all whitespace-pre-wrap text-neutral-400">
          {JSON.stringify(currentSearch)}
        </pre> */}

        {activeTab == "all" ? (
          <All />
        ) : activeTab == "youtube" ? (
          <LongFormVideo />
        ) : null}
        {/* <All /> */}
      </div>
    </div>
  );
};

export default ResultsTab;
