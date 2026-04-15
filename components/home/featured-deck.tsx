"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { featuredEdits } from "@/lib/site-data";
import { sanityImageUrl } from "@/lib/sanity-image";
import { SectionTitle } from "@/components/shared/section-title";

gsap.registerPlugin(ScrollTrigger);

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

export function FeaturedDeck() {
  const rootRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const activeVideoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [activeReelByEdit, setActiveReelByEdit] = useState<Record<string, number>>(() =>
    Object.fromEntries(featuredEdits.map((edit) => [edit.id, 0])),
  );

  useLayoutEffect(() => {
    if (!rootRef.current) {
      return;
    }

    const context = gsap.context(() => {
      const wrappers = gsap.utils.toArray<HTMLElement>(".deck-card-wrap");
      const progress = progressRef.current;

      if (progress) {
        gsap.set(progress, { autoAlpha: 0 });

        ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => gsap.to(progress, { autoAlpha: 1, duration: 0.25, ease: "power2.out" }),
          onEnterBack: () =>
            gsap.to(progress, { autoAlpha: 1, duration: 0.25, ease: "power2.out" }),
          onLeave: () => gsap.to(progress, { autoAlpha: 0, duration: 0.2, ease: "power2.out" }),
          onLeaveBack: () =>
            gsap.to(progress, { autoAlpha: 0, duration: 0.2, ease: "power2.out" }),
        });
      }

      wrappers.forEach((wrapper, index) => {
        const card = wrapper.querySelector<HTMLElement>(".deck-card");
        const media = wrapper.querySelector<HTMLElement>(".deck-media-shell");
        const direction = index % 2 === 0 ? 18 : -18;

        if (card) {
          gsap.fromTo(
            card,
            {
              xPercent: direction,
              autoAlpha: 0.22,
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
                start: "top bottom",
                end: "top 34%",
                scrub: 1.05,
              },
            },
          );

          ScrollTrigger.create({
            trigger: wrapper,
            start: "top 52%",
            end: "bottom 52%",
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
                start: "top bottom",
                end: "top 14%",
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
                start: "top bottom",
                end: "top 40%",
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
    const cleanups: Array<() => void> = [];

    activeVideoRefs.current.forEach((video, index) => {
      if (!video) {
        return;
      }

      const shouldPlay = index === activeCardIndex;

      video.muted = true;
      video.loop = true;
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
          video.currentTime = 0;
        } catch {
          // Ignore seek errors for partially loaded videos.
        }

        try {
          await video.play();
        } catch {
          // Ignore autoplay errors; muted playback is expected to succeed.
        }
      };

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

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [activeCardIndex, activeReelByEdit]);

  const handleReelChange = (cardIndex: number, editId: string, reelIndex: number) => {
    setActiveCardIndex(cardIndex);
    setActiveReelByEdit((current) =>
      current[editId] === reelIndex ? current : { ...current, [editId]: reelIndex },
    );
  };

  return (
    <section ref={rootRef} className="relative z-10 pb-24">
      <div className="sticky top-0 z-20 mx-auto max-w-[1440px] px-5 pt-6 md:px-10 md:pt-10">
        <div className="flex items-center justify-between gap-4">
          <div className="pointer-events-none inline-flex rounded-full border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-sm">
            <SectionTitle primary="Featured" outline="Edits" />
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/45 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-white/78 transition hover:border-[var(--color-accent)]/45 hover:text-[var(--color-accent)]"
          >
            See More
            <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      </div>

      {featuredEdits.map((edit, index) => {
        const activeReelIndex = activeReelByEdit[edit.id] ?? 0;
        const activeReel = edit.reels[activeReelIndex] ?? edit.reels[0];
        const activePoster = sanityImageUrl(activeReel.poster, {
          width: 1800,
          height: 1200,
          fit: "crop",
        });
        const previewReels = edit.reels
          .map((reel, reelIndex) => ({ reel, reelIndex }))
          .filter((item) => item.reelIndex !== activeReelIndex);

        return (
          <div
            key={edit.id}
            className="deck-card-wrap sticky top-0 flex min-h-screen items-center justify-center px-4 py-12 md:px-10"
          >
            <article className="deck-card relative flex w-full max-w-[1360px] flex-col overflow-hidden rounded-[1.2rem] border border-white/8 bg-[var(--color-surface)] shadow-[0_18px_80px_rgba(0,0,0,0.4)] md:min-h-[82vh] md:flex-row">
              <div className="relative z-10 flex w-full flex-col justify-between gap-10 border-b border-white/8 p-6 md:w-[42%] md:border-b-0 md:border-r md:p-12">
                <div className="space-y-5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
                    {edit.tag}
                  </span>
                  <h3 className="font-display text-[clamp(1.8rem,3vw,3rem)] font-bold leading-[1.02] tracking-[-0.05em]">
                    {edit.title}
                  </h3>
                  <p className="max-w-[34rem] text-base leading-7 text-white/58 md:text-[1.02rem]">
                    {edit.description}
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {edit.metrics.map((metric) => (
                      <div key={`${edit.id}-${metric.label}`} className="space-y-1">
                        <div className="font-display text-3xl font-bold tracking-[-0.05em]">
                          {metric.value}
                        </div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/42">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/work#${edit.slug}`}
                    className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-white transition hover:text-[var(--color-accent)]"
                  >
                    Open Reel Set
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                </div>
              </div>

              <div className="deck-media-shell relative min-h-[360px] flex-1 overflow-hidden bg-black md:min-h-0">
                <div className="grid h-full gap-4 p-4 md:grid-cols-[minmax(0,1fr)_196px] md:p-5">
                  <div className="relative overflow-hidden rounded-[1rem] border border-white/6 bg-black">
                    <video
                      key={`${edit.id}-${activeReel.id}`}
                      ref={(element) => {
                        activeVideoRefs.current[index] = element;
                      }}
                      src={activeReel.src}
                      poster={activePoster ?? undefined}
                      className="h-full w-full object-cover"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.18)_46%,rgba(0,0,0,0.62)_100%)]" />
                    <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/74 backdrop-blur-md">
                        Autoplaying
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/40 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/74 backdrop-blur-md">
                        {activeReel.tag}
                      </span>
                    </div>
                    <div className="absolute inset-x-4 bottom-4 rounded-[1rem] border border-white/10 bg-black/34 p-4 backdrop-blur-md">
                      <div className="font-display text-2xl font-bold tracking-[-0.04em] text-white">
                        {activeReel.title}
                      </div>
                      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/52">
                        {activeReel.meta}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-rows-2">
                    {previewReels.map(({ reel, reelIndex }) => {
                      const previewPoster = sanityImageUrl(reel.poster, {
                        width: 720,
                        height: 960,
                        fit: "crop",
                      });

                      return (
                        <button
                          key={reel.id}
                          type="button"
                          onClick={() => handleReelChange(index, edit.id, reelIndex)}
                          className="group relative overflow-hidden rounded-[1rem] border border-white/8 bg-black text-left transition hover:border-white/20"
                          aria-label={`Play ${reel.title}`}
                        >
                          <video
                            src={reel.src}
                            poster={previewPoster ?? undefined}
                            className="absolute inset-0 h-full w-full scale-110 object-cover blur-[14px] transition duration-300 group-hover:scale-[1.14]"
                            muted
                            playsInline
                            preload="metadata"
                          />
                          <div className="absolute inset-0 bg-black/48" />
                          <div className="relative z-10 flex h-full flex-col justify-between p-4">
                            <div className="flex justify-end">
                              <PlayIcon />
                            </div>
                            <div>
                              <div className="font-display text-lg font-bold leading-tight tracking-[-0.04em] text-white">
                                {reel.title}
                              </div>
                              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/54">
                                {reel.tag}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </article>
          </div>
        );
      })}

      <div
        ref={progressRef}
        className="deck-progress pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex"
      >
        {featuredEdits.map((edit, index) => (
          <span
            key={edit.id}
            className={`w-[2px] rounded-full transition-all duration-300 ${
              activeCardIndex === index ? "h-12 bg-[var(--color-accent)]" : "h-8 bg-white/14"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
