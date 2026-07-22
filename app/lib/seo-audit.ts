import * as cheerio from "cheerio";
import type { CheerioAPI } from "cheerio";
import {
  SeoAuditResult,
  SeoCheck,
  SeoCheckStatus,
  SeoCheckValue,
  SeoPageMetadata,
} from "./definitions";

const FETCH_TIMEOUT_MS = 10_000;
const MAX_BODY_BYTES = 2 * 1024 * 1024;
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36 ContentEngineBot/1.0";

const CHECK_DESCRIPTIONS = {
  "meta-title":
    "The title tag is one of the first things that users notice in the SERPs. It's the title of your page that offers a preview of what your content is about.",
  "meta-description":
    "The meta description is of equal importance to the title tag. If the title tag is the title that appears at the top of a search result, the meta description is the snippet that displays underneath.",
  "word-counter":
    "Your content should be as high quality as possible, with relevant and unique information. Your entry requires a minimum of paragraphs, and therefore of words.",
  "keyword-density":
    "Define keywords you want to rank for in your SEO component. This will analyze the density of your keywords in your 1st level richtext editors.",
  "open-graph":
    "Open Graph tags allow you to manage the title, description & image of your posts.",
  canonical: "This will check if you have a canonical URL.",
  "structured-data":
    "Structured data is a standardized format for providing information about a page and classifying the page content.",
  "meta-robots":
    "The robot's meta tag informs search engines which pages on your site should be indexed and more.",
  "alt-texts":
    "This will check if you have any missing alternative text for your images (media field) and in your 1st level richtext editors.",
  "last-updated":
    "Checks when the page was last updated, using its modified-time metadata or the Last-Modified response header.",
} as const;

export class SeoAuditError extends Error {
  constructor(
    message: string,
    public statusCode: 400 | 422,
  ) {
    super(message);
    this.name = "SeoAuditError";
  }
}

// Blocks non-http(s) schemes and private/internal hosts so the audit
// endpoint can't be used to probe the server's own network (SSRF).
function assertPublicHttpUrl(rawUrl: string): URL {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new SeoAuditError("Please enter a valid URL.", 400);
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new SeoAuditError("Only http(s) URLs can be audited.", 400);
  }

  const host = url.hostname.toLowerCase();
  const isPrivate =
    host === "localhost" ||
    host === "0.0.0.0" ||
    host === "[::1]" ||
    host.endsWith(".local") ||
    /^127\./.test(host) ||
    /^10\./.test(host) ||
    /^192\.168\./.test(host) ||
    /^169\.254\./.test(host) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(host);

  if (isPrivate) {
    throw new SeoAuditError("This URL points to a private address.", 400);
  }

  return url;
}

async function fetchPage(
  url: URL,
): Promise<{ html: string; lastModifiedHeader: string | null }> {
  let response: Response;
  try {
    response = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "text/html,*/*" },
      redirect: "follow",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
  } catch {
    throw new SeoAuditError(
      "Could not reach that URL. Check the address and try again.",
      422,
    );
  }

  if (!response.ok) {
    throw new SeoAuditError(
      `The page responded with status ${response.status}.`,
      422,
    );
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) {
    throw new SeoAuditError("That URL did not return an HTML page.", 422);
  }

  const contentLength = Number(response.headers.get("content-length"));
  if (contentLength > MAX_BODY_BYTES) {
    throw new SeoAuditError("That page is too large to audit.", 422);
  }

  const html = await response.text();
  if (html.length > MAX_BODY_BYTES) {
    throw new SeoAuditError("That page is too large to audit.", 422);
  }

  return { html, lastModifiedHeader: response.headers.get("last-modified") };
}

function check(
  id: keyof typeof CHECK_DESCRIPTIONS,
  title: string,
  status: SeoCheckStatus,
  details: string,
  extras?: { found?: SeoCheckValue[]; image?: string | null },
): SeoCheck {
  return {
    id,
    title,
    description: CHECK_DESCRIPTIONS[id],
    status,
    details,
    ...extras,
  };
}

function getBodyText($: CheerioAPI): string {
  const body = $("body").clone();
  body.find("script, style, noscript, svg, nav, header, footer").remove();
  return body.text().replace(/\s+/g, " ").trim();
}

function checkMetaTitle($: CheerioAPI): SeoCheck {
  const title = $("head title").first().text().trim();
  if (!title) {
    return check("meta-title", "Meta Title", "fail", "No <title> tag found.", {
      found: [{ label: "Meta Title", value: null }],
    });
  }
  const len = title.length;
  const status = len >= 30 && len <= 60 ? "pass" : "warn";
  return check(
    "meta-title",
    "Meta Title",
    status,
    `${len} characters (recommended 30–60).`,
    { found: [{ label: "Meta Title", value: title }] },
  );
}

function checkMetaDescription($: CheerioAPI): SeoCheck {
  const description = $('meta[name="description"]').attr("content")?.trim();
  if (!description) {
    return check(
      "meta-description",
      "Meta Description",
      "fail",
      "No meta description found.",
      { found: [{ label: "Meta Description", value: null }] },
    );
  }
  const len = description.length;
  const status = len >= 120 && len <= 160 ? "pass" : "warn";
  return check(
    "meta-description",
    "Meta Description",
    status,
    `${len} characters (recommended 120–160).`,
    { found: [{ label: "Meta Description", value: description }] },
  );
}

function checkWordCount(bodyText: string): SeoCheck {
  const words = bodyText ? bodyText.split(" ").length : 0;
  const status = words >= 300 ? "pass" : words >= 100 ? "warn" : "fail";
  return check(
    "word-counter",
    "Word Counter",
    status,
    `Page contains ${words.toLocaleString()} words (recommended at least 300).`,
  );
}

function checkKeywordDensity(bodyText: string, keywords: string[]): SeoCheck {
  if (keywords.length === 0) {
    return check(
      "keyword-density",
      "Keyword Density",
      "skipped",
      "No target keywords provided — add keywords to analyze density.",
    );
  }

  const words = bodyText.toLowerCase().split(" ").filter(Boolean);
  if (words.length === 0) {
    return check(
      "keyword-density",
      "Keyword Density",
      "fail",
      "No page text found to analyze.",
    );
  }

  const lowerText = words.join(" ");
  const reports = keywords.map((keyword) => {
    const phrase = keyword.toLowerCase().trim();
    const phraseWords = phrase.split(/\s+/).length;
    let occurrences = 0;
    let index = lowerText.indexOf(phrase);
    while (index !== -1) {
      occurrences += 1;
      index = lowerText.indexOf(phrase, index + phrase.length);
    }
    const density = ((occurrences * phraseWords) / words.length) * 100;
    return { keyword, occurrences, density };
  });

  const allGood = reports.every((r) => r.density >= 0.5 && r.density <= 2.5);
  const details = reports
    .map(
      (r) =>
        `"${r.keyword}": ${r.occurrences}× (${r.density.toFixed(2)}% density)`,
    )
    .join("; ");

  return check(
    "keyword-density",
    "Keyword Density",
    allGood ? "pass" : "warn",
    `${details}. Recommended density is 0.5–2.5% per keyword.`,
  );
}

function checkOpenGraph($: CheerioAPI): SeoCheck {
  const og = (property: string) =>
    $(`meta[property="og:${property}"]`).attr("content")?.trim() || null;

  const required = { title: og("title"), description: og("description"), image: og("image") };
  const missing = Object.entries(required)
    .filter(([, value]) => !value)
    .map(([key]) => `og:${key}`);
  const foundCount = 3 - missing.length;
  const status = missing.length === 0 ? "pass" : foundCount > 0 ? "warn" : "fail";

  return check(
    "open-graph",
    "OpenGraph Tags",
    status,
    missing.length === 0
      ? "og:title, og:description and og:image are all present."
      : `Missing: ${missing.join(", ")}.`,
    {
      found: [
        { label: "og:title", value: required.title },
        { label: "og:description", value: required.description },
        { label: "og:image", value: required.image },
        { label: "og:type", value: og("type") },
        { label: "og:url", value: og("url") },
      ],
      image: required.image,
    },
  );
}

function checkCanonical($: CheerioAPI): SeoCheck {
  const canonical = $('link[rel="canonical"]').attr("href")?.trim() || null;
  return check(
    "canonical",
    "Canonical URL",
    canonical ? "pass" : "fail",
    canonical ? "Canonical link present." : "No canonical link found.",
    { found: [{ label: "Canonical URL", value: canonical }] },
  );
}

function checkStructuredData($: CheerioAPI): SeoCheck {
  const blocks = $('script[type="application/ld+json"]')
    .toArray()
    .map((el) => $(el).text());

  if (blocks.length === 0) {
    return check(
      "structured-data",
      "JSON Structured Data",
      "fail",
      "No JSON-LD structured data found.",
    );
  }

  const types: string[] = [];
  let validCount = 0;
  for (const block of blocks) {
    try {
      const parsed = JSON.parse(block);
      validCount += 1;
      for (const node of Array.isArray(parsed) ? parsed : [parsed]) {
        if (node && typeof node["@type"] === "string") {
          types.push(node["@type"]);
        }
      }
    } catch {
      // invalid JSON-LD block — counted below
    }
  }

  if (validCount === 0) {
    return check(
      "structured-data",
      "JSON Structured Data",
      "warn",
      "JSON-LD blocks found but none contain valid JSON.",
      { found: [{ label: "Schema Types", value: null }] },
    );
  }

  const uniqueTypes = [...new Set(types)];
  return check(
    "structured-data",
    "JSON Structured Data",
    "pass",
    `Found ${validCount} valid JSON-LD block(s).`,
    {
      found: [
        {
          label: "Schema Types",
          value: uniqueTypes.length > 0 ? uniqueTypes.join(", ") : null,
        },
      ],
    },
  );
}

function checkMetaRobots($: CheerioAPI): SeoCheck {
  const robots = $('meta[name="robots"]').attr("content")?.trim() || null;
  const found = [{ label: "Meta Robots", value: robots }];
  if (!robots) {
    return check(
      "meta-robots",
      "Meta Robots",
      "warn",
      "No robots meta tag found (search engines will index by default).",
      { found },
    );
  }
  if (robots.toLowerCase().includes("noindex")) {
    return check(
      "meta-robots",
      "Meta Robots",
      "fail",
      "Page is set to noindex — it will not be indexed.",
      { found },
    );
  }
  return check(
    "meta-robots",
    "Meta Robots",
    "pass",
    "Page is indexable.",
    { found },
  );
}

function checkAltTexts($: CheerioAPI): SeoCheck {
  const images = $("img").toArray();
  if (images.length === 0) {
    return check(
      "alt-texts",
      "Alternative Texts",
      "pass",
      "No images on the page.",
    );
  }
  const missing = images.filter((img) => !$(img).attr("alt")?.trim()).length;
  const covered = images.length - missing;
  const ratio = covered / images.length;
  const status = missing === 0 ? "pass" : ratio >= 0.8 ? "warn" : "fail";
  return check(
    "alt-texts",
    "Alternative Texts",
    status,
    `${covered} of ${images.length} images have alt text${missing > 0 ? ` — ${missing} missing` : ""}.`,
  );
}

function checkLastUpdated(
  $: CheerioAPI,
  lastModifiedHeader: string | null,
): SeoCheck {
  const modified =
    $('meta[property="article:modified_time"]').attr("content") ||
    $('meta[property="og:updated_time"]').attr("content") ||
    lastModifiedHeader;

  if (!modified) {
    return check(
      "last-updated",
      "Last updated at",
      "warn",
      "No modified-time metadata or Last-Modified header found.",
      { found: [{ label: "Last Updated", value: null }] },
    );
  }

  const date = new Date(modified);
  const display = isNaN(date.getTime()) ? modified : date.toUTCString();
  return check(
    "last-updated",
    "Last updated at",
    "pass",
    "Modified-time information found.",
    { found: [{ label: "Last Updated", value: display }] },
  );
}

function meta($: CheerioAPI, selector: string): string | null {
  return $(selector).attr("content")?.trim() || null;
}

function extractStructuredDataTypes($: CheerioAPI): string[] {
  const types: string[] = [];
  for (const el of $('script[type="application/ld+json"]').toArray()) {
    try {
      const parsed = JSON.parse($(el).text());
      for (const node of Array.isArray(parsed) ? parsed : [parsed]) {
        if (node && typeof node["@type"] === "string") {
          types.push(node["@type"]);
        }
      }
    } catch {
      // invalid block — ignored here, surfaced by the structured-data check
    }
  }
  return [...new Set(types)];
}

function extractPageMetadata(
  $: CheerioAPI,
  bodyText: string,
  lastModifiedHeader: string | null,
): SeoPageMetadata {
  const images = $("img").toArray();
  const missingAlt = images.filter((img) => !$(img).attr("alt")?.trim()).length;

  return {
    title: $("head title").first().text().trim() || null,
    description: meta($, 'meta[name="description"]'),
    canonical: $('link[rel="canonical"]').attr("href")?.trim() || null,
    robots: meta($, 'meta[name="robots"]'),
    lang: $("html").attr("lang")?.trim() || null,
    openGraph: {
      title: meta($, 'meta[property="og:title"]'),
      description: meta($, 'meta[property="og:description"]'),
      image: meta($, 'meta[property="og:image"]'),
      type: meta($, 'meta[property="og:type"]'),
      url: meta($, 'meta[property="og:url"]'),
    },
    h1: $("h1")
      .toArray()
      .map((el) => $(el).text().replace(/\s+/g, " ").trim())
      .filter(Boolean),
    wordCount: bodyText ? bodyText.split(" ").length : 0,
    images: { total: images.length, missingAlt },
    structuredDataTypes: extractStructuredDataTypes($),
    lastModified:
      meta($, 'meta[property="article:modified_time"]') ||
      meta($, 'meta[property="og:updated_time"]') ||
      lastModifiedHeader,
  };
}

const STATUS_POINTS: Record<SeoCheckStatus, number> = {
  pass: 1,
  warn: 0.5,
  fail: 0,
  skipped: 0,
};

export async function runSeoAudit(
  rawUrl: string,
  keywords: string[] = [],
): Promise<SeoAuditResult> {
  const url = assertPublicHttpUrl(rawUrl);
  const { html, lastModifiedHeader } = await fetchPage(url);

  const $ = cheerio.load(html);
  const bodyText = getBodyText($);

  const checks: SeoCheck[] = [
    checkMetaTitle($),
    checkMetaDescription($),
    checkWordCount(bodyText),
    checkKeywordDensity(bodyText, keywords),
    checkOpenGraph($),
    checkCanonical($),
    checkStructuredData($),
    checkMetaRobots($),
    checkAltTexts($),
    checkLastUpdated($, lastModifiedHeader),
  ];

  const applicable = checks.filter((c) => c.status !== "skipped");
  const earned = applicable.reduce(
    (sum, c) => sum + STATUS_POINTS[c.status],
    0,
  );
  const score = applicable.length
    ? Math.round((earned / applicable.length) * 100)
    : 0;

  return {
    url: url.toString(),
    score,
    page: extractPageMetadata($, bodyText, lastModifiedHeader),
    checks,
    auditedAt: new Date().toISOString(),
  };
}
