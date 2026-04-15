"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { FeaturedReelGroup } from "@/lib/reel-types";
import { SectionTitle } from "@/components/shared/section-title";

gsap.registerPlugin(ScrollTrigger);

type FeaturedDeckProps = {
  featuredGroups: FeaturedReelGroup[];
};

function PlayIcon() {
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/55 backdrop-blur-md">
      <span
        aria-hidden="true"
        className="ml-0.5 block h-0 w-0 border-y-[7px] border-l-[12px] border-y-transparent border-l-white"
      />
    </span>
  );
}

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

export function FeaturedDeck({ featuredGroups }: FeaturedDeckProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const videoRefs = useRef<Array<Array<HTMLVideoElement | null>>>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isSectionActive, setIsSectionActive] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [activeReelByGroup, setActiveReelByGroup] = useState<Record<string, number>>(() =>
    Object.fromEntries(featuredGroups.map((group) => [group.id, 0])),
  );

  useEffect(() => {
    setActiveReelByGroup(Object.fromEntries(featuredGroups.map((group) => [group.id, 0])));
    videoRefs.current = Array.from({ length: featuredGroups.length }, () =>
      Array.from({ length: 3 }, () => null),
    );
  }, [featuredGroups]);

  useLayoutEffect(() => {
    if (!rootRef.current) {
      return;
    }

    const context = gsap.context(() => {
      const wrappers = gsap.utils.toArray<HTMLElement>(".deck-card-wrap");

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => setIsSectionActive(true),
        onEnterBack: () => setIsSectionActive(true),
        onLeave: () => setIsSectionActive(false),
        onLeaveBack: () => setIsSectionActive(false),
      });

      wrappers.forEach((wrapper, index) => {
        const card = wrapper.querySelector<HTMLElement>(".deck-card");
        const media = wrapper.querySelector<HTMLElement>(".deck-media-shell");
        const direction = index % 2 === 0 ? 18 : -18;

        if (card) {
          gsap.fromTo(
            card,
            {
              xPercent: direction,
              autoAlpha: 0,
              rotateX: 2.5,
              transformOrigin: "top center",
            },
            {
              xPercent: 0,
              autoAlpha: 1,
              rotateX: 0,
              ease: "none",
              scrollTrigger: {
                trigger: wrapper,
                start: "top 78%",
                end: "top 42%",
                scrub: 1.05,
              },
            },
          );

          ScrollTrigger.create({
            trigger: wrapper,
            start: "top 44%",
            end: "bottom 44%",
            onEnter: () => setActiveCardIndex(index),
            onEnterBack: () => setActiveCardIndex(index),
          });

          if (index < wrappers.length - 1) {
            gsap.to(card, {
              scale: 0.93,
              opacity: 0.18,
              y: -26,
              filter: "blur(8px)",
              ease: "none",
              scrollTrigger: {
                trigger: wrappers[index + 1],
                start: "top 76%",
                end: "top 24%",
                scrub: true,
              },
            });
          }
        }

        if (media) {
          gsap.fromTo(
            media,
            { xPercent: direction * 0.55 },
            {
              xPercent: 0,
              ease: "none",
              scrollTrigger: {
                trigger: wrapper,
                start: "top 82%",
                end: "top 48%",
                scrub: 1.25,
              },
            },
          );
        }
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const markInteracted = () => {
      setHasInteracted(true);
    };

    window.addEventListener("pointerdown", markInteracted, { passive: true });
    window.addEventListener("touchstart", markInteracted, { passive: true });
    window.addEventListener("wheel", markInteracted, { passive: true });
    window.addEventListener("keydown", markInteracted);

    return () => {
      window.removeEventListener("pointerdown", markInteracted);
      window.removeEventListener("touchstart", markInteracted);
      window.removeEventListener("wheel", markInteracted);
      window.removeEventListener("keydown", markInteracted);
    };
  }, []);

  useEffect(() => {
    const cleanups: Array<() => void> = [];

    videoRefs.current.forEach((groupVideos, groupIndex) => {
      const group = featuredGroups[groupIndex];

      if (!group) {
        return;
      }

      const activeReelIndex = activeReelByGroup[group.id] ?? 0;

      groupVideos.forEach((video, reelIndex) => {
        if (!video) {
          return;
        }

        const shouldPlay =
          isSectionActive && groupIndex === activeCardIndex && reelIndex === activeReelIndex;

        video.muted = shouldPlay ? !hasInteracted || isSoundMuted : true;
        video.loop = false;
        video.playsInline = true;
        video.preload = shouldPlay ? "auto" : "metadata";

        if (!shouldPlay) {
          video.pause();

          try {
            video.currentTime = 0;
          } catch {
            // Ignore seek errors for partially loaded videos.
          }

          return;
        }

        const playVideo = async () => {
          try {
            await video.play();
          } catch {
            if (!video.muted) {
              video.muted = true;
              setIsSoundMuted(true);

              try {
                await video.play();
              } catch {
                // Ignore autoplay errors after muted fallback.
              }
            }
          }
        };

        const handleEnded = () => {
          setActiveReelByGroup((current) => {
            if ((current[group.id] ?? 0) !== reelIndex) {
              return current;
            }

            return {
              ...current,
              [group.id]: (reelIndex + 1) % group.reels.length,
            };
          });
        };

        video.addEventListener("ended", handleEnded);
        cleanups.push(() => video.removeEventListener("ended", handleEnded));

        if (video.readyState < 2) {
          const handleLoaded = () => {
            video.removeEventListener("loadeddata", handleLoaded);
            void playVideo();
          };

          video.addEventListener("loadeddata", handleLoaded);
          cleanups.push(() => video.removeEventListener("loadeddata", handleLoaded));

          try {
            video.load();
          } catch {
            // Ignore load errors and fall back to natural loading.
          }

          return;
        }

        void playVideo();
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [
    activeCardIndex,
    activeReelByGroup,
    featuredGroups,
    hasInteracted,
    isSectionActive,
    isSoundMuted,
  ]);

  const handleReelChange = (cardIndex: number, groupId: string, reelIndex: number) => {
    setActiveCardIndex(cardIndex);
    setActiveReelByGroup((current) =>
      current[groupId] === reelIndex ? current : { ...current, [groupId]: reelIndex },
    );
  };

  const handleSoundToggle = () => {
    setHasInteracted(true);
    setIsSoundMuted((current) => !current);
  };

  return (
    <section ref={rootRef} className="relative z-10 pb-20">
      <div className="sticky top-0 z-20 mx-auto max-w-[1320px] px-4 pt-4 md:px-10 md:pt-6">
        <div className="flex items-center justify-between gap-3">
          <div className="pointer-events-none inline-flex max-w-[calc(100%-8.25rem)] shrink rounded-full border border-white/10 bg-black/40 px-3 py-2.5 backdrop-blur-sm md:max-w-full md:px-4 md:py-3">
            <SectionTitle
              primary="Featured"
              outline="Edits"
              className="text-[clamp(1.5rem,4vw,3.25rem)] leading-[0.9] md:text-[clamp(2rem,4vw,3.25rem)]"
            />
          </div>

          <Link
            href="/work"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3.5 py-2.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/78 transition hover:border-[var(--color-accent)]/45 hover:text-[var(--color-accent)] md:gap-3 md:px-5 md:py-3 md:text-[11px] md:tracking-[0.24em]"
          >
            See More
            <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      </div>

      {featuredGroups.map((group, index) => {
        const activeReelIndex = activeReelByGroup[group.id] ?? 0;

        return (
          <div
            key={group.id}
            className="deck-card-wrap sticky top-0 flex min-h-[54vh] items-start justify-center px-4 py-6 md:min-h-[100vh] md:px-10 md:py-8"
          >
            <article className="deck-card relative w-full max-w-[1380px] overflow-hidden rounded-[1rem] border border-white/8 bg-[var(--color-surface)] shadow-[0_18px_80px_rgba(0,0,0,0.4)]">
              <div className="deck-media-shell grid gap-2 p-2 md:min-h-[82vh] md:grid-cols-3 md:gap-3 md:p-3">
                {group.reels.map((reel, reelIndex) => {
                  const isActive = reelIndex === activeReelIndex;
                  const isPlayingReel = isSectionActive && index === activeCardIndex && isActive;
                  const isAudioOn = isPlayingReel && hasInteracted && !isSoundMuted;

                  return (
                    <div
                      key={reel.id}
                      className={`group relative aspect-[16/10] overflow-hidden rounded-[0.9rem] border bg-black text-left transition md:h-full md:aspect-auto ${
                        isActive
                          ? "border-white/18"
                          : "border-white/8 hover:border-white/20"
                      }`}
                    >
                      <video
                        src={reel.src}
                        poster={reel.posterSrc}
                        ref={(element) => {
                          if (!videoRefs.current[index]) {
                            videoRefs.current[index] = [];
                          }

                          videoRefs.current[index][reelIndex] = element;
                        }}
                        className={`absolute inset-0 h-full w-full object-cover transition duration-300 ${
                          isActive
                            ? "scale-100 blur-0"
                            : "scale-110 blur-[14px] group-hover:scale-[1.14]"
                        }`}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                      <div
                        className={`absolute inset-0 transition ${
                          isActive ? "bg-black/10" : "bg-black/48"
                        }`}
                      />
                      {!isActive ? (
                        <div className="relative z-10 flex h-full items-center justify-center p-4">
                          <PlayIcon />
                        </div>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => handleReelChange(index, group.id, reelIndex)}
                        className="absolute inset-0 z-10"
                        aria-label={`Play ${reel.title}`}
                      />
                      {isPlayingReel ? (
                        <button
                          type="button"
                          onClick={handleSoundToggle}
                          className="absolute bottom-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/14 bg-black/58 text-white/90 backdrop-blur-md transition hover:border-white/24 hover:bg-black/72"
                          aria-label={isAudioOn ? `Mute ${reel.title}` : `Unmute ${reel.title}`}
                        >
                          {isAudioOn ? <VolumeOnIcon /> : <VolumeOffIcon />}
                        </button>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </article>
          </div>
        );
      })}
    </section>
  );
}
