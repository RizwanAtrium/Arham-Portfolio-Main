import "server-only";

import { readdir } from "node:fs/promises";
import path from "node:path";

import type { FeaturedReelGroup, ReelVideo } from "@/lib/reel-types";

const REELS_DIR = path.join(process.cwd(), "assets", "Reals");
const PUBLIC_REELS_DIR = path.join(process.cwd(), "public", "videos");

const posterPool = [
  "/images/cinema-rig.jpg",
  "/images/camera-monitor-desk.jpg",
  "/images/laptop-editing-screen.jpg",
  "/images/filmmaker-desk.jpg",
  "/images/gimbal-setup.jpg",
  "/images/podcast-video-desk.jpg",
  "/images/camera-table.jpg",
  "/images/editing-workstation.jpg",
];

function toDisplayTitle(fileName: string) {
  const baseName = fileName.replace(/\.mp4$/i, "");
  return baseName
    .replaceAll("_", " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toId(fileName: string) {
  return fileName
    .replace(/\.mp4$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function readReelDirectory(directory: string) {
  try {
    const fileNames = await readdir(directory);

    return fileNames
      .filter((fileName) => fileName.toLowerCase().endsWith(".mp4"))
      .sort((left, right) => left.localeCompare(right));
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return [];
    }

    throw error;
  }
}

export async function getAllReels(): Promise<ReelVideo[]> {
  const assetFileNames = await readReelDirectory(REELS_DIR);
  const usingAssets = assetFileNames.length > 0;
  const fileNames = usingAssets
    ? assetFileNames
    : await readReelDirectory(PUBLIC_REELS_DIR);

  return fileNames.map((fileName, index) => ({
    id: toId(fileName) || `reel-${index + 1}`,
    title: toDisplayTitle(fileName),
    src: usingAssets
      ? `/reels/${encodeURIComponent(fileName)}`
      : `/videos/${encodeURIComponent(fileName)}`,
    posterSrc: posterPool[index % posterPool.length] ?? posterPool[0],
    fileName,
  }));
}

export async function getFeaturedReelGroups(): Promise<FeaturedReelGroup[]> {
  const reels = await getAllReels();

  if (reels.length < 3) {
    return [];
  }

  const groups: FeaturedReelGroup[] = [];

  for (let index = 0; index < 4; index += 1) {
    const start = index * 3;
    const groupReels = Array.from(
      { length: 3 },
      (_, offset) => reels[(start + offset) % reels.length]!,
    );

    groups.push({
      id: `featured-reel-group-${index + 1}`,
      reels: groupReels,
    });
  }

  return groups;
}
