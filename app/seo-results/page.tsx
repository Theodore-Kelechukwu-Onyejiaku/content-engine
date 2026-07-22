import SeoAuditForm from "@/app/components/SeoAuditForm";

export default function SeoResultsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-8 md:py-10">
      <h1 className="text-2xl font-bold tracking-tight">SEO Results</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Audit any URL to see how well its SEO metadata is set up, scored as a
        percentage.
      </p>

      <div className="mt-8">
        <SeoAuditForm />
      </div>
    </div>
  );
}
