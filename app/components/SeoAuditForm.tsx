"use client";

import { useState } from "react";
import {
  SeoAuditResult,
  SeoCheck,
  SeoCheckStatus,
} from "@/app/lib/definitions";
import {
  Globe,
  Loader2,
  CircleCheck,
  CircleAlert,
  CircleX,
  CircleMinus,
} from "lucide-react";

const STATUS_STYLES: Record<
  SeoCheckStatus,
  { icon: typeof CircleCheck; className: string; label: string }
> = {
  pass: { icon: CircleCheck, className: "text-emerald-600", label: "Passed" },
  warn: {
    icon: CircleAlert,
    className: "text-amber-500",
    label: "Needs improvement",
  },
  fail: { icon: CircleX, className: "text-red-500", label: "Failed" },
  skipped: {
    icon: CircleMinus,
    className: "text-neutral-400",
    label: "Skipped",
  },
};

function scoreColor(score: number) {
  if (score >= 80) return "text-emerald-600";
  if (score >= 50) return "text-amber-500";
  return "text-red-500";
}

function ScoreGauge({ score }: { score: number }) {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  return (
    <div className="relative size-36">
      <svg viewBox="0 0 128 128" className="size-full -rotate-90">
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          strokeWidth="10"
          className="stroke-neutral-200"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`transition-all duration-700 ${scoreColor(score)}`}
          stroke="currentColor"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`text-3xl font-bold tabular-nums ${scoreColor(score)}`}
        >
          {score}%
        </span>
        <span className="text-xs text-neutral-500">SEO score</span>
      </div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex flex-col gap-0.5 py-2 sm:flex-row sm:gap-4">
      <dt className="w-40 shrink-0 text-xs font-medium tracking-wide text-neutral-400 uppercase">
        {label}
      </dt>
      <dd
        className={`min-w-0 text-sm wrap-break-word ${
          value ? "text-neutral-800" : "text-neutral-400 italic"
        }`}
      >
        {value ?? "Not found"}
      </dd>
    </div>
  );
}

function CheckCard({ check }: { check: SeoCheck }) {
  const { icon: Icon, className, label } = STATUS_STYLES[check.status];

  return (
    <li className="flex gap-3 rounded-xl border border-neutral-200 bg-white p-4">
      <Icon className={`mt-0.5 size-5 shrink-0 ${className}`} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2">
          <h3 className="text-sm font-semibold text-neutral-900">
            {check.title}
          </h3>
          <span className={`text-xs font-medium ${className}`}>{label}</span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-neutral-500">
          {check.description}
        </p>
        <p className="mt-2 text-sm wrap-break-word text-neutral-700">
          {check.details}
        </p>

        {check.found && check.found.length > 0 && (
          <div className="mt-3 flex flex-col gap-3 rounded-lg border border-neutral-100 bg-neutral-50 p-3 sm:flex-row sm:gap-4">
            {check.image && (
              // eslint-disable-next-line @next/next/no-img-element -- remote host is arbitrary, can't be allowlisted for next/image
              <img
                src={check.image}
                alt="Open Graph preview image"
                className="h-32 w-full shrink-0 rounded-md border border-neutral-200 object-cover sm:w-56"
              />
            )}
            <dl className="min-w-0 flex-1 divide-y divide-neutral-200/70">
              {check.found.map((item) => (
                <MetaRow
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </dl>
          </div>
        )}
      </div>
    </li>
  );
}

export default function SeoAuditForm() {
  const [url, setUrl] = useState("");
  const [keywords, setKeywords] = useState("");
  const [result, setResult] = useState<SeoAuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ url: url.trim() });
      if (keywords.trim()) params.set("keywords", keywords.trim());

      const response = await fetch(`/api/seo?${params.toString()}`);
      const data = await response.json();
      if (!response.ok) {
        setResult(null);
        setError(data.error ?? "Something went wrong.");
      } else {
        setResult(data);
      }
    } catch {
      setResult(null);
      setError("Something went wrong while auditing that URL.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="relative">
          <Globe className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter a URL to audit, e.g. https://strapi.io/blog/..."
            className="w-full rounded-xl border border-neutral-200 bg-white py-3.5 pr-32 pl-11 text-sm shadow-sm transition placeholder:text-neutral-400 outline-none focus:border-neutral-400 focus:ring-4 focus:ring-neutral-200/60"
          />
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-1.5 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:pointer-events-none disabled:opacity-40"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                Auditing...
              </>
            ) : (
              "Audit"
            )}
          </button>
        </div>
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Target keywords, comma-separated (optional)"
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm shadow-sm transition placeholder:text-neutral-400 outline-none focus:border-neutral-400 focus:ring-4 focus:ring-neutral-200/60"
        />
      </form>

      {error && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-8 flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4 rounded-xl border border-neutral-200 bg-white p-6 sm:flex-row sm:gap-8">
            <ScoreGauge score={result.score} />
            <div className="min-w-0 text-center sm:text-left">
              <p className="text-sm font-medium break-all text-neutral-900">
                {result.url}
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                Audited {new Date(result.auditedAt).toLocaleString()} ·{" "}
                {result.checks.filter((c) => c.status === "pass").length} of{" "}
                {result.checks.filter((c) => c.status !== "skipped").length}{" "}
                checks passed
              </p>
            </div>
          </div>

          <ul className="flex flex-col gap-3">
            {result.checks.map((check) => (
              <CheckCard key={check.id} check={check} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
