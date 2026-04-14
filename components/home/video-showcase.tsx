"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { siteSettings } from "@/lib/site-data";

gsap.registerPlugin(ScrollTrigger);

export function VideoShowcase() {
  const rootRef = useRef<HTMLElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const wrapperRefs = useRef<Array<HTMLDivElement | null>>([]);
  const wrapperRatioRef = useRef<number[]>([]);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const sectionActiveRef = useRef(false);
  const previousActiveIndexRef = useRef(-1);
  const activeIndexRef = useRef(-1);
  const playbackRunRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [soundUnlocked, setSoundUnlocked] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(true);

  useLayoutEffect(() => {
    if (!rootRef.current) {
      return;
    }

    const context = gsap.context(() => {
      const wrappers = gsap.utils.toArray<HTMLElement>(".video-card-wrap");
      const shell = shellRef.current;
      const progress = progressRef.current;

      if (shell) {
        gsap.set(shell, {
          transformPerspective: 1600,
          transformOrigin: "top center",
          willChange: "transform, opacity",
        });

        gsap.fromTo(
          shell,
          {
            yPercent: 18,
            autoAlpha: 0.16,
            scale: 0.94,
            rotateX: 14,
          },
          {
            yPercent: 0,
            autoAlpha: 1,
            scale: 1,
            rotateX: 0,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top bottom",
              end: "top 36%",
              scrub: 1.1,
            },
          },
        );
      }

      if (progress) {
        gsap.set(progress, { autoAlpha: 0 });

        ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () =>
            gsap.to(progress, { autoAlpha: 1, duration: 0.25, ease: "power2.out" }),
          onEnterBack: () =>
            gsap.to(progress, { autoAlpha: 1, duration: 0.25, ease: "power2.out" }),
          onLeave: () =>
            gsap.to(progress, { autoAlpha: 0, duration: 0.2, ease: "power2.out" }),
          onLeaveBack: () =>
            gsap.to(progress, { autoAlpha: 0, duration: 0.2, ease: "power2.out" }),
        });
      }

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          sectionActiveRef.current = true;
          setActiveIndex(0);
        },
        onEnterBack: () => {
          sectionActiveRef.current = true;
          setActiveIndex(siteSettings.videoShowcase.length - 1);
        },
        onLeave: () => {
          sectionActiveRef.current = false;
          setActiveIndex(-1);
        },
        onLeaveBack: () => {
          sectionActiveRef.current = false;
          setActiveIndex(-1);
        },
      });

      wrappers.forEach((wrapper, index) => {
        const card = wrapper.querySelector<HTMLElement>(".video-card");
        const media = wrapper.querySelector<HTMLElement>(".video-card-media");
        const content = wrapper.querySelector<HTMLElement>(".video-card-content");

        if (index === 0) {
          gsap.fromTo(
            wrapper,
            { yPercent: 16, autoAlpha: 0.2 },
            {
              yPercent: 0,
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: {
                trigger: rootRef.current,
                start: "top bottom",
                end: "top 44%",
                scrub: 1.15,
              },
            },
          );
        }

        if (media) {
          gsap.fromTo(
            media,
            { scale: 1.18, yPercent: 0 },
            {
              scale: 1,
              yPercent: -4,
              ease: "none",
              scrollTrigger: {
                trigger: wrapper,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.6,
              },
            },
          );
        }

        if (content) {
          gsap.from(content, {
            y: 18,
            duration: 0.45,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });
        }

        if (card) {
          gsap.fromTo(
            card,
            { rotateX: 4, transformOrigin: "top center" },
            {
              rotateX: 0,
              ease: "none",
              scrollTrigger: {
                trigger: wrapper,
                start: "top bottom",
                end: "top 24%",
                scrub: true,
              },
            },
          );

          if (index < wrappers.length - 1) {
            const nextWrapper = wrappers[index + 1];

            gsap.to(card, {
              scale: 0.89,
              opacity: 0.14,
              y: -24,
              filter: "blur(20px)",
              ease: "none",
              scrollTrigger: {
                trigger: nextWrapper,
                start: "top 86%",
                end: "top 42%",
                scrub: true,
              },
            });

            if (media) {
              gsap.to(media, {
                filter: "blur(30px)",
                scale: 1.08,
                opacity: 0.32,
                ease: "none",
                scrollTrigger: {
                  trigger: nextWrapper,
                  start: "top 86%",
                  end: "top 40%",
                  scrub: true,
                },
              });
            }

            if (content) {
              gsap.to(content, {
                autoAlpha: 0.28,
                y: -12,
                ease: "none",
                scrollTrigger: {
                  trigger: nextWrapper,
                  start: "top 84%",
                  end: "top 44%",
                  scrub: true,
                },
              });
            }
          }
        }
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          sectionActiveRef.current = true;
          setActiveIndex((current) => (current < 0 ? 0 : current));
          return;
        }

        sectionActiveRef.current = false;
        setActiveIndex(-1);
      },
      { threshold: 0.01 },
    );

    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const wrappers = wrapperRefs.current.filter(Boolean) as HTMLDivElement[];

    if (wrappers.length === 0) {
      return;
    }

    wrapperRatioRef.current = Array.from({ length: wrappers.length }, () => 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLDivElement).dataset.index ?? "-1");
          if (index < 0) {
            return;
          }
          wrapperRatioRef.current[index] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });

        if (!sectionActiveRef.current) {
          return;
        }

        let nextIndex = -1;
        let bestRatio = 0;
        wrapperRatioRef.current.forEach((ratio, index) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            nextIndex = index;
          }
        });

        if (nextIndex >= 0 && bestRatio > 0.08) {
          setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
        }
      },
      {
        threshold: [0, 0.08, 0.16, 0.24, 0.34, 0.5, 0.66, 0.82, 1],
      },
    );

    wrappers.forEach((wrapper, index) => {
      wrapper.dataset.index = String(index);
      observer.observe(wrapper);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const runId = ++playbackRunRef.current;

    const stopAllVideos = () => {
      videoRefs.current.forEach((video) => {
        if (!video) {
          return;
        }

        video.pause();
      });
    };

    let cancelled = false;

    const playVideoUnmuted = async (video: HTMLVideoElement) => {
      try {
        video.muted = false;
        video.volume = 1;
        await video.play();
        if (
          cancelled ||
          playbackRunRef.current !== runId ||
          activeIndexRef.current !== activeIndex ||
          !sectionActiveRef.current
        ) {
          video.pause();
          return;
        }
        setNeedsGesture(false);
      } catch {
        if (!cancelled) {
          setNeedsGesture(true);
        }
      }
    };

    const playActive = async () => {
      if (activeIndex < 0 || !sectionActiveRef.current) {
        previousActiveIndexRef.current = -1;
        stopAllVideos();
        return;
      }

      const isSwitching = previousActiveIndexRef.current !== activeIndex;

      await Promise.all(
        videoRefs.current.map(async (video, index) => {
          if (!video) {
            return;
          }

          if (index !== activeIndex) {
            video.pause();
            return;
          }

          video.loop = true;
          video.playsInline = true;
          video.preload = "auto";

          if (video.readyState < 2) {
            try {
              video.load();
            } catch {
              // Ignore load errors and continue with play attempt.
            }
          }

          if (isSwitching) {
            try {
              video.currentTime = 0;
            } catch {
              // Ignore seek errors for streams/codecs that disallow programmatic seek.
            }
          }

          await playVideoUnmuted(video);
        }),
      );

      previousActiveIndexRef.current = activeIndex;
    };

    void playActive();

    return () => {
      cancelled = true;
    };
  }, [activeIndex, soundUnlocked]);

  useEffect(() => {
    if (soundUnlocked || activeIndex < 0) {
      return;
    }

    const unlockSound = async () => {
      const currentActiveIndex = activeIndexRef.current;

      if (currentActiveIndex < 0 || !sectionActiveRef.current) {
        return;
      }

      setSoundUnlocked(true);

      const video = videoRefs.current[currentActiveIndex];

      if (!video) {
        return;
      }

      video.muted = false;
      video.volume = 1;

      try {
        await video.play();
        setNeedsGesture(false);
      } catch {
        setNeedsGesture(true);
      }
    };

    const handleUserActivation = () => {
      void unlockSound();
    };

    window.addEventListener("pointerdown", handleUserActivation, { passive: true });
    window.addEventListener("mousedown", handleUserActivation, { passive: true });
    window.addEventListener("touchstart", handleUserActivation, { passive: true });
    window.addEventListener("keydown", handleUserActivation);
    window.addEventListener("wheel", handleUserActivation, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handleUserActivation);
      window.removeEventListener("mousedown", handleUserActivation);
      window.removeEventListener("touchstart", handleUserActivation);
      window.removeEventListener("keydown", handleUserActivation);
      window.removeEventListener("wheel", handleUserActivation);
    };
  }, [activeIndex, soundUnlocked]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        sectionActiveRef.current = false;
        setActiveIndex(-1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative z-20 -mt-[14vh] bg-[var(--color-bg)] pb-24 pt-0 md:-mt-[18vh]"
    >
      <div
        ref={shellRef}
        className="relative rounded-t-[2.2rem] bg-[linear-gradient(180deg,rgba(5,5,5,0.18)_0%,rgba(5,5,5,0.78)_14%,rgba(5,5,5,1)_34%)]"
      >
        {siteSettings.videoShowcase.map((item, index) => (
          <div
            key={item.id}
            ref={(element) => {
              wrapperRefs.current[index] = element;
            }}
            className="video-card-wrap sticky top-0 flex min-h-screen items-center justify-center px-4 py-6 md:px-8"
          >
            <article className="video-card relative h-[88vh] w-full overflow-hidden rounded-[1.6rem] border border-white/8 bg-black shadow-[0_18px_80px_rgba(0,0,0,0.5)]">
              <div className="video-card-media absolute inset-0">
                <video
                  ref={(element) => {
                    videoRefs.current[index] = element;
                  }}
                  src={item.src}
                  className="h-full w-full object-cover"
                  preload="auto"
                  playsInline
                  controls={false}
                  onLoadedData={() => {
                    if (index === activeIndexRef.current && sectionActiveRef.current) {
                      const video = videoRefs.current[index];

                      if (video) {
                        video.muted = false;
                        video.volume = 1;
                        void video.play().catch(() => {
                          setNeedsGesture(true);
                        });
                      }
                    }
                  }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.18)_34%,rgba(0,0,0,0.56)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(167,139,250,0.16),transparent_30%)]" />
              </div>

              <div className="video-card-content relative z-10 flex h-full flex-col justify-between p-5 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/24 px-4 py-2 backdrop-blur-md">
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
                      Reel {item.id}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/25" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/48">
                      {item.meta}
                    </span>
                  </div>

                  <div className="rounded-full border border-white/10 bg-black/24 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/62 backdrop-blur-md">
                    {activeIndex === index ? "Playing with sound" : "Queued"}
                  </div>
                </div>

                <div className="max-w-[520px] rounded-[1.35rem] border border-white/10 bg-black/26 p-5 shadow-[0_14px_50px_rgba(0,0,0,0.22)] backdrop-blur-md md:p-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/42">
                    {item.tag}
                  </div>
                  <h2 className="mt-4 max-w-[9ch] font-display text-[clamp(1.75rem,4vw,3.8rem)] font-bold uppercase leading-[0.94] tracking-[-0.06em] text-white">
                    {item.title}
                  </h2>
                  <p className="mt-4 max-w-[34rem] text-sm leading-6 text-white/64 md:text-base md:leading-7">
                    {item.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveIndex(index);
                        setSoundUnlocked(true);
                        const video = videoRefs.current[index];

                        if (video) {
                          video.muted = false;
                          video.volume = 1;
                          void video.play();
                          setNeedsGesture(false);
                        }
                      }}
                      className="rounded-full border border-[var(--color-accent)]/45 bg-[var(--color-accent)] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-black transition hover:brightness-110"
                    >
                      Sound On
                    </button>

                    <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/58 backdrop-blur-md">
                      Scroll switches reels
                    </div>
                  </div>
                </div>
              </div>

              {needsGesture && activeIndex === index ? (
                <div className="pointer-events-none absolute bottom-6 right-6 z-20 rounded-full border border-white/12 bg-black/55 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/72 backdrop-blur-md">
                  Click once if browser blocks sound
                </div>
              ) : null}
            </article>
          </div>
        ))}
      </div>

      <div
        ref={progressRef}
        className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex"
      >
        {siteSettings.videoShowcase.map((item, index) => (
          <span
            key={item.id}
            className={`w-[2px] rounded-full transition-all duration-300 ${
              activeIndex === index ? "h-14 bg-[var(--color-accent)]" : "h-8 bg-white/14"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
