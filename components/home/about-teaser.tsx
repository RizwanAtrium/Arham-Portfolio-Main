"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AboutTeaser() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from(".about-teaser-line", {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });

      gsap.from(".about-teaser-copy", {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 py-28 text-center md:py-40">
      <div className="mx-auto max-w-[880px] px-5 md:px-10">
        <h2 className="font-display text-[clamp(2.3rem,6vw,5.5rem)] font-bold uppercase leading-[0.94] tracking-[-0.06em]">
          <span className="block overflow-hidden">
            <span className="about-teaser-line block">THE EDITOR</span>
          </span>
          <span className="block overflow-hidden">
            <span className="about-teaser-line block">
              BEHIND THE <span className="outline-copy">MOTION.</span>
            </span>
          </span>
        </h2>
        <p className="about-teaser-copy mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/56">
          AI-assisted workflows, sharper pacing, cleaner captions, and premium
          finishing built for brands, founders, and social-first campaigns.
        </p>
        <Link
          href="/about"
          className="about-teaser-copy mt-10 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)] transition hover:text-white"
        >
          View Full Profile
          <span aria-hidden="true">-&gt;</span>
        </Link>
      </div>
    </section>
  );
}
