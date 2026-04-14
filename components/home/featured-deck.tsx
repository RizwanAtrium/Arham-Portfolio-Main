"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { featuredProjects } from "@/lib/site-data";
import { sanityImageUrl } from "@/lib/sanity-image";
import { SectionTitle } from "@/components/shared/section-title";

gsap.registerPlugin(ScrollTrigger);

export function FeaturedDeck() {
  const rootRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
          onEnterBack: () => gsap.to(progress, { autoAlpha: 1, duration: 0.25, ease: "power2.out" }),
          onLeave: () => gsap.to(progress, { autoAlpha: 0, duration: 0.2, ease: "power2.out" }),
          onLeaveBack: () =>
            gsap.to(progress, { autoAlpha: 0, duration: 0.2, ease: "power2.out" }),
        });
      }

      wrappers.forEach((wrapper, index) => {
        const image = wrapper.querySelector<HTMLElement>(".deck-image-track");
        const card = wrapper.querySelector<HTMLElement>(".deck-card");

        if (image) {
          gsap.fromTo(
            image,
            { xPercent: 0, yPercent: 0 },
            {
              xPercent: -18,
              yPercent: -8,
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

        if (card) {
          gsap.fromTo(
            card,
            { rotateX: 2.5, transformOrigin: "top center" },
            {
              rotateX: 0,
              ease: "none",
              scrollTrigger: {
                trigger: wrapper,
                start: "top bottom",
                end: "top 30%",
                scrub: true,
              },
            },
          );

          ScrollTrigger.create({
            trigger: wrapper,
            start: "top 52%",
            end: "bottom 52%",
            onEnter: () => setActiveIndex(index),
            onEnterBack: () => setActiveIndex(index),
          });

          if (index < wrappers.length - 1) {
            gsap.to(card, {
              scale: 0.92,
              opacity: 0.16,
              y: -30,
              filter: "blur(6px)",
              ease: "none",
              scrollTrigger: {
                trigger: wrappers[index + 1],
                start: "top bottom",
                end: "top 10%",
                scrub: true,
              },
            });
          }
        }
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative z-10 pb-24">
      <div className="sticky top-0 z-20 mx-auto max-w-[1440px] px-5 pt-6 md:px-10 md:pt-10">
        <div className="pointer-events-none inline-flex rounded-full border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-sm">
          <SectionTitle primary="Featured" outline="Work" />
        </div>
      </div>

      {featuredProjects.map((project, index) => {
        const imageUrl = sanityImageUrl(project.image, {
          width: 2400,
          height: 1400,
          fit: "crop",
        });

        return (
          <div
            key={project._id}
            className="deck-card-wrap sticky top-0 flex min-h-screen items-center justify-center px-4 py-12 md:px-10"
          >
            <article className="deck-card relative flex w-full max-w-[1360px] flex-col overflow-hidden rounded-[1.2rem] border border-white/8 bg-[var(--color-surface)] shadow-[0_18px_80px_rgba(0,0,0,0.4)] md:min-h-[82vh] md:flex-row">
              <div className="relative z-10 flex w-full flex-col justify-between gap-10 border-b border-white/8 p-6 md:w-[42%] md:border-b-0 md:border-r md:p-12">
                <div className="space-y-5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
                    {project.tag}
                  </span>
                  <h3 className="font-display text-[clamp(1.8rem,3vw,3rem)] font-bold leading-[1.02] tracking-[-0.05em]">
                    {project.title}
                  </h3>
                  {project.vision.content ? (
                    <p className="max-w-[34rem] text-base leading-7 text-white/58 md:text-[1.02rem]">
                      {project.vision.content}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-8">
                  {project.businessValue?.metrics?.length ? (
                    <div className="grid gap-5 sm:grid-cols-2">
                      {project.businessValue.metrics.slice(0, 4).map((metric) => (
                        <div key={`${project._id}-${metric.label}`} className="space-y-1">
                          <div className="font-display text-3xl font-bold tracking-[-0.05em]">
                            {metric.value}
                          </div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/42">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-white transition hover:text-[var(--color-accent)]"
                  >
                    View Case Study
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[320px] flex-1 overflow-hidden bg-black md:min-h-0">
                <div className="absolute inset-4 overflow-hidden rounded-lg border border-white/6 md:inset-5">
                  <div className="deck-image-track absolute -left-[10%] -top-[8%] h-[130%] w-[150%]">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={project.title}
                        className="h-full w-full object-cover object-left-top"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top_left,#202020,transparent_60%),linear-gradient(135deg,#0d0d0d,#050505)] font-display text-4xl uppercase text-white/30">
                        {project.title}
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(5,5,5,0.42))]" />
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
        {featuredProjects.map((project, index) => (
          <span
            key={project._id}
            className={`w-[2px] rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "h-12 bg-[var(--color-accent)]"
                : "h-8 bg-white/14"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
