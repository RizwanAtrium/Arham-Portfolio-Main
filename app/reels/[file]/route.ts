import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";

import { getDriveReelUrl, proxyDriveVideo } from "@/lib/drive-media";

const REELS_DIR = path.resolve(process.cwd(), "assets", "Reals");

export const runtime = "nodejs";

function resolveReelPath(fileName: string) {
  const resolvedPath = path.resolve(REELS_DIR, fileName);

  if (!resolvedPath.startsWith(`${REELS_DIR}${path.sep}`)) {
    return null;
  }

  return resolvedPath;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;
  const fileName = decodeURIComponent(file);
  const reelPath = resolveReelPath(fileName);

  if (!reelPath || !fileName.toLowerCase().endsWith(".mp4")) {
    return new Response("Not found", { status: 404 });
  }

  let reelStat;

  try {
    reelStat = await stat(reelPath);
  } catch {
    const driveUrl = getDriveReelUrl(fileName);

    if (!driveUrl) {
      return new Response("Not found", { status: 404 });
    }

    return proxyDriveVideo(request, driveUrl, fileName);
  }

  const rangeHeader = request.headers.get("range");

  if (rangeHeader) {
    const match = /^bytes=(\d+)-(\d*)$/.exec(rangeHeader);

    if (!match) {
      return new Response("Invalid range", { status: 416 });
    }

    const start = Number.parseInt(match[1], 10);
    const requestedEnd = match[2] ? Number.parseInt(match[2], 10) : reelStat.size - 1;
    const end = Math.min(requestedEnd, reelStat.size - 1);

    if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= reelStat.size) {
      return new Response("Invalid range", { status: 416 });
    }

    const stream = createReadStream(reelPath, { start, end });

    return new Response(Readable.toWeb(stream) as ReadableStream, {
      status: 206,
      headers: {
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=3600",
        "Content-Length": String(end - start + 1),
        "Content-Range": `bytes ${start}-${end}/${reelStat.size}`,
        "Content-Type": "video/mp4",
      },
    });
  }

  const stream = createReadStream(reelPath);

  return new Response(Readable.toWeb(stream) as ReadableStream, {
    headers: {
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=3600",
      "Content-Length": String(reelStat.size),
      "Content-Type": "video/mp4",
    },
  });
}
