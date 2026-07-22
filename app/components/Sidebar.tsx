"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  PanelLeft,
  Search,
  ChartNoAxesColumn,
  Zap,
  LucideIcon,
} from "lucide-react";

const tabs: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Search", href: "/", icon: Search },
  { label: "SEO Results", href: "/seo-results", icon: ChartNoAxesColumn },
];

function Brand() {
  return (
    <span className="flex items-center gap-2.5 px-2">
      <span className="flex size-7 items-center justify-center rounded-lg bg-neutral-900 text-white">
        <Zap className="size-4" />
      </span>
      <span className="text-[15px] font-semibold tracking-tight">
        Content Engine
      </span>
    </span>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <header className="flex items-center gap-2 border-b border-neutral-200 bg-white px-4 py-3 md:hidden">
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          className="rounded-md p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
        >
          <Menu className="size-5" />
        </button>
        <Brand />
      </header>

      {/* Backdrop (mobile, drawer open) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Collapsed rail (desktop only) */}
      {collapsed && (
        <div className="sticky top-0 hidden h-screen shrink-0 border-r border-neutral-200 bg-white px-2 py-4 md:block">
          <button
            type="button"
            aria-label="Open sidebar"
            onClick={() => setCollapsed(false)}
            className="rounded-md p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          >
            <PanelLeft className="size-5" />
          </button>
        </div>
      )}

      {/* Sidebar: slide-in drawer on mobile, static on md+ */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 shrink-0 flex-col border-r border-neutral-200 bg-white transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "md:hidden" : ""}`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <Brand />
          <button
            type="button"
            aria-label="Collapse sidebar"
            onClick={() => setCollapsed(true)}
            className="hidden rounded-md p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900 md:block"
          >
            <PanelLeft className="size-5" />
          </button>
        </div>

        <p className="px-6 pt-2 pb-1.5 text-xs font-semibold tracking-wide text-neutral-400 uppercase">
          Menu
        </p>
        <nav className="flex flex-col gap-1 px-3">
          {tabs.map((tab) => {
            const isActive =
              tab.href === "/"
                ? pathname === "/"
                : pathname.startsWith(tab.href);
            const Icon = tab.icon;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
              >
                <Icon className="size-4" />
                {tab.label}
              </Link>
            );
          })}
        </nav>

        <p className="mt-auto border-t border-neutral-100 px-6 py-4 text-xs text-neutral-400">
          Research what ranks before you write.
        </p>
      </aside>
    </>
  );
}
