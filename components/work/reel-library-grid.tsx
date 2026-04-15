"use client";

import { useEffect, useRef, useState } from "react";

import type { ReelVideo } from "@/lib/reel-types";

type ReelLibraryGridProps = {
  reels: ReelVideo[];
};

type PlaybackState = "idle" | "loading" | "ready" | "error";

type ReelCardProps = {
  isUnmuted: boolean;
  onToggleAudio: (reelId: string) => void;
  reel: ReelVideo;
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

function ReelCard({ isUnmuted, onToggleAudio, reel }: ReelCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [playbackState, setPlaybackState] = useState<PlaybackState>("idle");

  useEffect(() => {
    if (!cardRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry) {
          return;
        }

        setIsVisible(entry.isIntersecting);

        if (entry.isIntersecting) {
          setHasEnteredView(true);
        }
      },
      {
        rootMargin: "260px 0px",
        threshold: 0.2,
      },
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.loop = true;
    video.playsInline = true;
    video.muted = !isUnmuted;
    video.volume = isUnmuted ? 1 : 0;
    video.preload = isVisible ? "metadata" : "none";

    if (!hasEnteredView || !isVisible || playbackState !== "ready") {
      video.pause();
      return;
    }

    const playVisiblePreview = async () => {
      try {
        await video.play();
      } catch {
        if (!video.muted) {
          video.muted = true;
          video.volume = 0;
          await video.play().catch(() => undefined);
        }
      }
    };

    void playVisiblePreview();

    return () => {
      video.pause();
    };
  }, [hasEnteredView, isUnmuted, isVisible, playbackState]);

  const isLoading = hasEnteredView && playbackState !== "ready" && playbackState !== "error";
  const showError = playbackState === "error";

  return (
    <article
      ref={cardRef}
      className="overflow-hidden rounded-[1rem] border border-white/8 bg-[var(--color-surface)]"
    >
      <div className="relative h-[52vh] overflow-hidden bg-black md:h-[82vh]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${reel.posterSrc})` }}
        />

        <video
          ref={videoRef}
          src={hasEnteredView ? reel.src : undefined}
          poster={reel.posterSrc}
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            playbackState === "ready" ? "opacity-100" : "opacity-0"
          }`}
          muted={!isUnmuted}
          loop
          playsInline
          preload={hasEnteredView && isVisible ? "metadata" : "none"}
          onLoadStart={() => {
            setPlaybackState((current) => (current === "ready" ? current : "loading"));
          }}
          onLoadedData={() => {
            setPlaybackState("ready");
          }}
          onError={() => {
            setPlaybackState("error");
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_46%,rgba(0,0,0,0.4))]" />

        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            playbackState === "ready" ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.76)_100%)]" />

          {isLoading ? (
            <div className="absolute inset-0 animate-pulse bg-[linear-gradient(115deg,rgba(255,255,255,0.03)_10%,rgba(255,255,255,0.12)_35%,rgba(255,255,255,0.03)_60%)]" />
          ) : null}

          {showError ? (
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <div className="max-w-[18rem] rounded-full border border-white/12 bg-black/55 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/62 backdrop-blur-md">
                Video unavailable
              </div>
            </div>
          ) : null}
        </div>

        {!showError ? (
          <button
            type="button"
            onClick={() => onToggleAudio(reel.id)}
            disabled={playbackState !== "ready"}
            className="absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black/55 text-white/88 backdrop-blur-md transition hover:border-white/25 hover:bg-black/72 hover:text-white disabled:cursor-not-allowed disabled:opacity-45"
            aria-label={isUnmuted ? `Mute ${reel.title}` : `Unmute ${reel.title}`}
          >
            {isUnmuted ? <VolumeOnIcon /> : <VolumeOffIcon />}
          </button>
        ) : null}
      </div>
    </article>
  );
}

export function ReelLibraryGrid({ reels }: ReelLibraryGridProps) {
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {reels.map((reel) => (
        <ReelCard
          key={reel.id}
          reel={reel}
          isUnmuted={activeAudioId === reel.id}
          onToggleAudio={(reelId) => {
            setActiveAudioId((current) => (current === reelId ? null : reelId));
          }}
        />
      ))}
    </div>
  );
}
