import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const year = req.nextUrl.searchParams.get("year") || "2024";
  const minutesSpentOnDocs =
    req.nextUrl.searchParams.get("minutesSpentOnDocs") || "1000";
  const uploadedDocuments =
    req.nextUrl.searchParams.get("uploadedDocuments") || "100";
  const sharedLinks = req.nextUrl.searchParams.get("sharedLinks") || "10";
  const receivedViews = req.nextUrl.searchParams.get("receivedViews") || "1000";

  return new ImageResponse(
    (
      <div
        tw="flex bg-black w-full h-full items-center justify-center"
        style={{ padding: "48px" }}
      >
        <div tw="flex flex-col text-white text-center">
          <div tw="text-6xl font-bold mb-4">Papermark</div>
          <div tw="text-4xl mb-8">Year in Review {year}</div>
          <div tw="text-5xl font-bold text-orange-500">
            {minutesSpentOnDocs}
          </div>
          <div tw="text-2xl mt-4">minutes viewed</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=3600, immutable",
      },
    },
  );
}
