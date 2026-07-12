"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Search", href: "/" },
  { label: "SEO Results", href: "/seo-results" },
];

function PanelIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="9" y1="4" x2="9" y2="20" />
    </svg>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const SIDEBAR_HEADING = "Content Engine";

  return (
    <>
      {/* Mobile top bar */}
      <header className="flex items-center gap-3 border-b border-neutral-200 px-4 py-3 md:hidden">
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          className="rounded-md p-1.5 text-neutral-600 hover:bg-neutral-100"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
        <span className="text-lg font-semibold">{SIDEBAR_HEADING}</span>
      </header>

      {/* Backdrop (mobile, drawer open) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Collapsed rail (desktop only) */}
      {collapsed && (
        <div className="hidden shrink-0 border-r border-neutral-200 px-2 py-4 md:block">
          <button
            type="button"
            aria-label="Open sidebar"
            onClick={() => setCollapsed(false)}
            className="rounded-md p-1.5 text-neutral-600 hover:bg-neutral-100"
          >
            <PanelIcon />
          </button>
        </div>
      )}

      {/* Sidebar: slide-in drawer on mobile, static on md+ */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 shrink-0 border-r border-neutral-200 bg-white transition-transform md:static md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "md:hidden" : ""}`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <span className="px-2 text-lg font-semibold">{SIDEBAR_HEADING}</span>
          <button
            type="button"
            aria-label="Collapse sidebar"
            onClick={() => setCollapsed(true)}
            className="hidden rounded-md p-1.5 text-neutral-600 hover:bg-neutral-100 md:block"
          >
            <PanelIcon />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-3">
          {tabs.map((tab) => {
            const isActive =
              tab.href === "/"
                ? pathname === "/"
                : pathname.startsWith(tab.href);

            return (
              <Link
                key={tab.href}
                href={tab.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
