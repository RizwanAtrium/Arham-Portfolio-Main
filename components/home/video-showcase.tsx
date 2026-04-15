"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { siteSettings } from "@/lib/site-data";

gsap.registerPlugin(ScrollTrigger);

type VideoLoadState = "idle" | "loading" | "ready" | "error";

export function VideoShowcase() {
  const rootRef = useRef<HTMLElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const wrapperRefs = useRef<Array<HTMLDivElement | null>>([]);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const sectionActiveRef = useRef(false);
  const previousActiveIndexRef = useRef(-1);
  const activeIndexRef = useRef(-1);
  const playbackRunRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loadedVideoIndices, setLoadedVideoIndices] = useState<number[]>([]);
  const [soundUnlocked, setSoundUnlocked] = useState(false);
  const [videoLoadStates, setVideoLoadStates] = useState<Record<number, VideoLoadState>>(() =>
    Object.fromEntries(
      siteSettings.videoShowcase.map((_, index) => [index, "idle" as VideoLoadState]),
    ),
  );
  const [needsGesture, setNeedsGesture] = useState(true);

  const playMutedFallback = async (video: HTMLVideoElement) => {
    video.muted = true;
    video.volume = 0;

    try {
      await video.play();
    } catch {
      // Ignore muted autoplay failures and leave the poster visible instead.
    }
  };

  const ensureVideosLoaded = (indices: number[]) => {
    setLoadedVideoIndices((current) => {
      const next = new Set(current);

      indices
        .filter((index) => index >= 0 && index < siteSettings.videoShowcase.length)
        .forEach((index) => next.add(index));

      if (next.size === current.length) {
        return current;
      }

      return Array.from(next).sort((left, right) => left - right);
    });
  };

  const updateVideoLoadState = (index: number, nextState: VideoLoadState) => {
    setVideoLoadStates((current) =>
      current[index] === nextState ? current : { ...current, [index]: nextState },
    );
  };

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

    let frame = 0;

    const syncActiveIndex = () => {
      if (!sectionActiveRef.current) {
        return;
      }

      const activationY = window.innerHeight * 0.45;
      let nextIndex = -1;
      let fallbackIndex = -1;
      let closestDistance = Number.POSITIVE_INFINITY;

      wrappers.forEach((wrapper, index) => {
        const rect = wrapper.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - activationY);

        if (distance < closestDistance) {
          closestDistance = distance;
          fallbackIndex = index;
        }

        if (rect.top <= activationY && rect.bottom > activationY) {
          nextIndex = index;
        }
      });

      const resolvedIndex = nextIndex >= 0 ? nextIndex : fallbackIndex;

      if (resolvedIndex >= 0) {
        setActiveIndex((current) => (current === resolvedIndex ? current : resolvedIndex));
      }
    };

    const requestSync = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        syncActiveIndex();
      });
    };

    requestSync();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, []);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex < 0) {
      return;
    }

    ensureVideosLoaded([activeIndex - 1, activeIndex, activeIndex + 1]);
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
        if (cancelled) {
          return;
        }

        setNeedsGesture(true);
        await playMutedFallback(video);
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

          if (!loadedVideoIndices.includes(index) || videoLoadStates[index] === "error") {
            video.pause();
            return;
          }

          video.loop = false;
          video.playsInline = true;
          video.preload = "auto";

          if (videoLoadStates[index] !== "ready") {
            try {
              video.load();
            } catch {
              // Ignore load errors while the active source is attaching.
            }

            return;
          }

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
  }, [activeIndex, loadedVideoIndices, soundUnlocked, videoLoadStates]);

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
        {siteSettings.videoShowcase.map((item, index) => {
          const hasLoadedSource = loadedVideoIndices.includes(index);
          const loadState = videoLoadStates[index] ?? "idle";
          const isLoading = hasLoadedSource && loadState !== "ready" && loadState !== "error";
          const showError = loadState === "error";

          return (
            <div
              key={item.id}
              ref={(element) => {
                wrapperRefs.current[index] = element;
              }}
              className="video-card-wrap sticky top-0 flex min-h-screen items-center justify-center px-4 py-6 md:px-8"
            >
              <article className="video-card relative h-[72svh] min-h-[34rem] w-full overflow-hidden rounded-[1.35rem] border border-white/8 bg-black shadow-[0_18px_80px_rgba(0,0,0,0.5)] md:h-[88vh] md:rounded-[1.6rem]">
                <div className="video-card-media absolute inset-0">
                  <video
                    ref={(element) => {
                      videoRefs.current[index] = element;
                    }}
                    src={hasLoadedSource ? item.src : undefined}
                    poster={item.poster}
                    className={`pointer-events-none h-full w-full object-cover transition-opacity duration-300 ${
                      loadState === "ready" ? "opacity-100" : "opacity-0"
                    }`}
                    preload={activeIndex === index ? "metadata" : "none"}
                    playsInline
                    controls={false}
                    disablePictureInPicture
                    controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
                    onLoadStart={() => {
                      updateVideoLoadState(index, "loading");
                    }}
                    onLoadedData={() => {
                      updateVideoLoadState(index, "ready");

                      if (index === activeIndexRef.current && sectionActiveRef.current) {
                        const video = videoRefs.current[index];

                        if (video) {
                          video.muted = false;
                          video.volume = 1;
                          void video.play().catch(() => {
                            setNeedsGesture(true);
                            void playMutedFallback(video);
                          });
                        }
                      }
                    }}
                    onError={() => {
                      updateVideoLoadState(index, "error");
                    }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.1)_28%,rgba(0,0,0,0.38)_68%,rgba(0,0,0,0.8)_100%)] md:bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.18)_34%,rgba(0,0,0,0.56)_100%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(167,139,250,0.16),transparent_30%)]" />
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      loadState === "ready" ? "pointer-events-none opacity-0" : "opacity-100"
                    }`}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.74)_100%)]" />

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
                </div>

              <div className="video-card-content relative z-10 flex h-full flex-col justify-between p-4 md:p-8">
                <div className="flex items-start justify-between gap-2 md:gap-4">
                  <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/24 px-3 py-2 backdrop-blur-md md:px-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
                      Reel {item.id}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/25" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/48">
                      {item.meta}
                    </span>
                  </div>
                </div>

                <div className="mb-2 w-full max-w-[520px] self-end rounded-[1.15rem] border border-white/10 bg-black/30 p-4 shadow-[0_14px_50px_rgba(0,0,0,0.22)] backdrop-blur-md md:mb-0 md:rounded-[1.35rem] md:p-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/42">
                    {item.tag}
                  </div>
                  <h2 className="mt-3 max-w-[9ch] font-display text-[clamp(1.75rem,8vw,3.8rem)] font-bold uppercase leading-[0.94] tracking-[-0.06em] text-white md:mt-4">
                    {item.title}
                  </h2>
                  <p className="mt-3 hidden max-w-[34rem] text-sm leading-6 text-white/64 md:mt-4 md:block md:text-base md:leading-7">
                    {item.description}
                  </p>

                  <div className="mt-5 hidden flex-wrap items-center gap-3 md:flex">
                    <button
                      type="button"
                      onClick={() => {
                        ensureVideosLoaded([index]);
                        setActiveIndex(index);
                        setSoundUnlocked(true);
                        const video = videoRefs.current[index];

                        if (video) {
                          video.muted = false;
                          video.volume = 1;
                          void video.play().then(
                            () => {
                              setNeedsGesture(false);
                            },
                            async () => {
                              setNeedsGesture(true);
                              await playMutedFallback(video);
                            },
                          );
                        }
                      }}
                      disabled={showError || loadState !== "ready"}
                      className="rounded-full border border-[var(--color-accent)]/45 bg-[var(--color-accent)] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      Sound On
                    </button>

                    <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/58 backdrop-blur-md">
                      Scroll switches reels
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
          );
        })}
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
