"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { companies, projects } from "@/lib/site-data";
import { sanityImageUrl } from "@/lib/sanity-image";
import { SectionTitle } from "@/components/shared/section-title";

gsap.registerPlugin(ScrollTrigger);

export function CompaniesSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const colsRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const rowsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const [preview, setPreview] = useState<{
    title: string;
    src: string | null;
  } | null>(null);

  const previewByCompany = useMemo(
    () =>
      companies.map((company) => {
        const projectMatch = projects.find(
          (project) =>
            project.meta.company?.toLowerCase() === company.name.toLowerCase(),
        ) || { image: null };

        return {
          ...company,
          previewSrc:
            sanityImageUrl(company.image, {
              width: 880,
              height: 520,
              fit: "crop",
            }) ??
            sanityImageUrl(projectMatch?.image ?? null, {
              width: 880,
              height: 520,
              fit: "crop",
            }),
        };
      }),
    [],
  );

  useLayoutEffect(() => {
    if (!rootRef.current) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      return;
    }

    const context = gsap.context(() => {
      const header = headerRef.current;
      const cols = colsRef.current;
      const rows = rowsRef.current.filter(Boolean) as HTMLButtonElement[];

      if (header) {
        gsap.fromTo(
          header,
          { y: 42, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.75,
            ease: "power4.out",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      if (cols) {
        gsap.fromTo(
          cols,
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.45,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 76%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      rows.forEach((row, index) => {
        const name = row.querySelector<HTMLElement>(".company-name");
        const sector = row.querySelector<HTMLElement>(".company-sector");

        gsap.fromTo(
          row,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: "power3.out",
            delay: index * 0.08,
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );

        if (name) {
          gsap.fromTo(
            name,
            { x: -18 },
            {
              x: 0,
              duration: 0.7,
              ease: "power3.out",
              delay: index * 0.08,
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            },
          );
        }

        if (sector) {
          gsap.fromTo(
            sector,
            { x: 18 },
            {
              x: 0,
              duration: 0.6,
              ease: "power3.out",
              delay: index * 0.08,
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            },
          );
        }

      });

      gsap.fromTo(
        rootRef.current,
        { y: 80 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "top 55%",
            scrub: 1.1,
          },
        },
      );

      gsap.fromTo(
        rootRef.current,
        { opacity: 0.4 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "top 75%",
            scrub: 1,
          },
        },
      );

    }, rootRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (!previewRef.current) {
      return;
    }

    gsap.to(previewRef.current, {
      autoAlpha: preview ? 1 : 0,
      scale: preview ? 1 : 0.94,
      duration: preview ? 0.22 : 0.18,
      ease: "power2.out",
      overwrite: true,
    });
  }, [preview]);

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      return;
    }

    const context = gsap.context(() => {
      gsap.set(previewRef.current, { autoAlpha: 0, scale: 0.94 });
    }, rootRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const previewElement = previewRef.current;

    if (!previewElement) {
      return;
    }

    let pointerX = 0;
    let pointerY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;

    const animate = () => {
      x += (pointerX - x) * 0.12;
      y += (pointerY - y) * 0.12;
      previewElement.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = window.requestAnimationFrame(animate);
    };

    const handleMove = (event: MouseEvent) => {
      pointerX = event.clientX + 28;
      pointerY = event.clientY - 96;
    };

    frame = window.requestAnimationFrame(animate);
    window.addEventListener("mousemove", handleMove);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <section ref={rootRef} className="relative z-10 py-28 md:py-44">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div
          ref={headerRef}
          className="mb-12 flex flex-col gap-4 border-b border-white/6 pb-5 md:flex-row md:items-end md:justify-between"
        >
          <SectionTitle primary="Worked" outline="With" />
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/45">
            Enterprise and Global Partners
          </span>
        </div>

        <div
          ref={colsRef}
          className="mb-3 hidden grid-cols-[1fr_220px] px-5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/35 md:grid"
        >
          <span>Partner</span>
          <span>Sector</span>
        </div>

        <div className="border-y border-white/6">
          {previewByCompany.map((company, index) => (
            <button
              key={company._id}
              ref={(element) => {
                rowsRef.current[index] = element;
              }}
              type="button"
              className="company-row grid w-full grid-cols-1 gap-4 border-b border-white/6 px-4 py-8 text-left transition hover:bg-white/[0.03] last:border-b-0 md:grid-cols-[1fr_220px] md:items-center"
              onMouseEnter={() =>
                setPreview({
                  title: company.name,
                  src: company.previewSrc,
                })
              }
              onMouseLeave={() => setPreview(null)}
            >
              <span className="company-name font-display text-[clamp(2rem,4.7vw,4.8rem)] font-bold uppercase leading-none tracking-[-0.05em] text-transparent [text-stroke:1px_rgba(255,255,255,0.25)] transition duration-300 hover:text-[var(--color-accent)] hover:[text-stroke:1px_transparent]">
                {company.name}
              </span>
              <span className="company-sector font-mono text-[12px] uppercase tracking-[0.18em] text-white/45">
                {company.sector}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        ref={previewRef}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[340px] overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_25px_80px_rgba(0,0,0,0.55)] md:block"
        aria-hidden="true"
      >
        {preview?.src ? (
          <img
            src={preview.src}
            alt={preview.title}
            className="h-[210px] w-full object-cover object-center grayscale-[15%]"
          />
        ) : (
          <div className="flex h-[210px] w-full items-center justify-center bg-[radial-gradient(circle_at_top,#1d1d1d,transparent_70%),linear-gradient(135deg,#111,#050505)] font-display text-3xl uppercase tracking-[-0.04em] text-white/60">
            {preview?.title}
          </div>
        )}
      </div>
    </section>
  );
}
