import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";

import { getDriveShowcaseUrl, proxyDriveVideo } from "@/lib/drive-media";

const VIDEOS_DIR = path.resolve(process.cwd(), "public", "videos");

export const runtime = "nodejs";

function resolveVideoPath(fileName: string) {
  const resolvedPath = path.resolve(VIDEOS_DIR, fileName);

  if (!resolvedPath.startsWith(`${VIDEOS_DIR}${path.sep}`)) {
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
  const videoPath = resolveVideoPath(fileName);

  if (!videoPath || !fileName.toLowerCase().endsWith(".mp4")) {
    return new Response("Not found", { status: 404 });
  }

  let videoStat;

  try {
    videoStat = await stat(videoPath);
  } catch {
    const driveUrl = getDriveShowcaseUrl(fileName);

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
    const requestedEnd = match[2] ? Number.parseInt(match[2], 10) : videoStat.size - 1;
    const end = Math.min(requestedEnd, videoStat.size - 1);

    if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= videoStat.size) {
      return new Response("Invalid range", { status: 416 });
    }

    const stream = createReadStream(videoPath, { start, end });

    return new Response(Readable.toWeb(stream) as ReadableStream, {
      status: 206,
      headers: {
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=3600",
        "Content-Length": String(end - start + 1),
        "Content-Range": `bytes ${start}-${end}/${videoStat.size}`,
        "Content-Type": "video/mp4",
      },
    });
  }

  const stream = createReadStream(videoPath);

  return new Response(Readable.toWeb(stream) as ReadableStream, {
    headers: {
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=3600",
      "Content-Length": String(videoStat.size),
      "Content-Type": "video/mp4",
    },
  });
}
