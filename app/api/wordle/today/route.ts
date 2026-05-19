import { NextRequest } from "next/server";
import { isValidDateISO, localDateISO, daysSinceLaunch } from "@/lib/date";
import { fallbackWordForDate } from "@/lib/word-lists";

export const runtime = "nodejs";

type ApiResponse = {
  solution: string;
  daysSinceLaunch: number;
  date: string;
  source: "nyt" | "fallback";
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get("date");
  const date = dateParam && isValidDateISO(dateParam) ? dateParam : localDateISO();

  try {
    const res = await fetch(`https://www.nytimes.com/svc/wordle/v2/${date}.json`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; 67wordle/1.0; +https://github.com/)",
        Accept: "application/json",
      },
      next: { revalidate: 21600 },
    });
    if (res.ok) {
      const data = (await res.json()) as {
        solution?: string;
        days_since_launch?: number;
      };
      if (data.solution && /^[a-z]{5}$/i.test(data.solution)) {
        const body: ApiResponse = {
          solution: data.solution.toLowerCase(),
          daysSinceLaunch:
            typeof data.days_since_launch === "number"
              ? data.days_since_launch
              : daysSinceLaunch(date),
          date,
          source: "nyt",
        };
        return Response.json(body, {
          headers: { "Cache-Control": "public, s-maxage=21600" },
        });
      }
    }
  } catch {
    // fall through to fallback
  }

  const body: ApiResponse = {
    solution: fallbackWordForDate(date),
    daysSinceLaunch: daysSinceLaunch(date),
    date,
    source: "fallback",
  };
  return Response.json(body, {
    headers: { "Cache-Control": "public, s-maxage=3600" },
  });
}
