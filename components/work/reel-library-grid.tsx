"use client";

import { useState } from "react";

import type { ReelVideo } from "@/lib/reel-types";

type ReelLibraryGridProps = {
  reels: ReelVideo[];
};

function VolumeOnIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14h4l5 4V6L8 10H4z" />
      <path d="M17 9a5 5 0 0 1 0 6" />
      <path d="M19.5 6.5a8.5 8.5 0 0 1 0 11" />
    </svg>
  );
}

function VolumeOffIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14h4l5 4V6L8 10H4z" />
      <path d="m17 9 4 4" />
      <path d="m21 9-4 4" />
    </svg>
  );
}

export function ReelLibraryGrid({ reels }: ReelLibraryGridProps) {
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {reels.map((reel) => {
        const isUnmuted = activeAudioId === reel.id;

        return (
          <article
            key={reel.id}
            className="overflow-hidden rounded-[1rem] border border-white/8 bg-[var(--color-surface)]"
          >
            <div className="relative h-[52vh] overflow-hidden bg-black md:h-[82vh]">
              <video
                src={reel.src}
                poster={reel.posterSrc}
                className="h-full w-full object-cover"
                muted={!isUnmuted}
                loop
                autoPlay
                playsInline
                preload="metadata"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_46%,rgba(0,0,0,0.4))]" />
              <button
                type="button"
                onClick={() =>
                  setActiveAudioId((current) => (current === reel.id ? null : reel.id))
                }
                className="absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black/55 text-white/88 backdrop-blur-md transition hover:border-white/25 hover:bg-black/72 hover:text-white"
                aria-label={isUnmuted ? `Mute ${reel.title}` : `Unmute ${reel.title}`}
              >
                {isUnmuted ? <VolumeOnIcon /> : <VolumeOffIcon />}
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
