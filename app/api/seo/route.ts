import { type NextRequest } from "next/server";
import { runSeoAudit, SeoAuditError } from "@/app/lib/seo-audit";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");
  const keywords =
    searchParams
      .get("keywords")
      ?.split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean) ?? [];

  if (!url) {
    return Response.json(
      { error: "Missing required `url` query parameter." },
      { status: 400 },
    );
  }

  try {
    const result = await runSeoAudit(url, keywords);
    return Response.json(result);
  } catch (error) {
    if (error instanceof SeoAuditError) {
      return Response.json(
        { error: error.message },
        { status: error.statusCode },
      );
    }
    console.error("SEO audit failed:", error);
    return Response.json(
      { error: "Something went wrong while auditing that URL." },
      { status: 500 },
    );
  }
}
