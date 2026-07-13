const recentSearches = ["strapi", "headless cms", "next.js tutorial"];

const RecentSearch = () => {
  return (
    <aside className="shrink-0 md:basis-1/4">
      <h2 className="text-lg font-semibold">Recent Searches</h2>
      <ul className="mt-2 flex flex-col gap-2">
        {recentSearches.map((search) => (
          <li key={search}>
            <button
              type="button"
              className="w-full rounded-md border border-neutral-200 p-3 text-left text-sm font-medium hover:bg-neutral-100"
            >
              {search}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default RecentSearch;
