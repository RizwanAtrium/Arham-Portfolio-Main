"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { siteSettings } from "@/lib/site-data";

gsap.registerPlugin(ScrollTrigger);

export function HeroScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const artboardRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const commentRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const redlineRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        ".hero-eyebrow",
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
        },
      );

      gsap.fromTo(
        ".hero-line",
        {
          yPercent: 120,
        },
        {
          yPercent: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.08,
          delay: 0.3,
        },
      );

      gsap.fromTo(
        ".hero-subtitle",
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.8,
        },
      );

      gsap.fromTo(
        ".hero-comment-shell",
        { autoAlpha: 0, x: 24 },
        { autoAlpha: 1, x: 0, duration: 0.7, ease: "power3.out", delay: 1 },
      );

      if (artboardRef.current && wrapRef.current && canvasRef.current) {
        const overlayTargets = [
          commentRef.current?.parentElement,
          marqueeRef.current,
          redlineRef.current,
        ].filter(Boolean);

        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.1,
            },
          })
          .to(
            artboardRef.current,
            {
              scale: 0.74,
              rotateX: 17,
              rotateZ: -10,
              yPercent: 14,
              z: -240,
              ease: "none",
            },
            0,
          )
          .to(
            wrapRef.current,
            {
              yPercent: -8,
              scale: 0.78,
              autoAlpha: 0.04,
              ease: "none",
            },
            0,
          )
          .to(
            canvasRef.current,
            {
              scale: 1.06,
              autoAlpha: 0.2,
              ease: "none",
            },
            0,
          )
          .to(overlayTargets, { autoAlpha: 0, ease: "none" }, 0);
      }
    }, sectionRef);

    let commentIndex = 0;
    const comment = commentRef.current;

    const animateComment = () => {
      if (!comment) {
        return;
      }

      comment.textContent = siteSettings.heroComments[commentIndex];
      gsap.fromTo(
        comment,
        { autoAlpha: 0, y: 8, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" },
      );
      gsap.to(comment, {
        autoAlpha: 0,
        y: -8,
        duration: 0.25,
        ease: "power2.in",
        delay: 2.3,
      });
      commentIndex = (commentIndex + 1) % siteSettings.heroComments.length;
    };

    const interval = window.setInterval(animateComment, 2600);
    window.setTimeout(animateComment, 1200);

    return () => {
      window.clearInterval(interval);
      context.revert();
    };
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    const marquee = marqueeRef.current;
    const redline = redlineRef.current;

    if (!content || !marquee || !redline) {
      return;
    }

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let animationFrame = 0;
    let x = pointerX;
    let y = pointerY;

    const update = () => {
      x += (pointerX - x) * 0.08;
      y += (pointerY - y) * 0.08;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const driftX = (x - centerX) * 0.018;
      const driftY = (y - centerY) * 0.018;

      content.style.transform = `translate3d(${driftX}px, ${driftY}px, 0)`;
      marquee.style.transform = `translate3d(${x - 120}px, ${y - 80}px, 0)`;
      redline.style.transform = `translate3d(${Math.min(centerX + 160, x)}px, ${Math.min(
        centerY + 200,
        y,
      )}px, 0)`;

      const dx = Math.round(x - centerX);
      const dy = Math.round(y - centerY);
      redline.textContent = `dx: ${dx}, dy: ${dy}`;

      animationFrame = window.requestAnimationFrame(update);
    };

    const handleMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
    };

    const handleLeave = () => {
      pointerX = window.innerWidth / 2;
      pointerY = window.innerHeight / 2;
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);
    animationFrame = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let pointerX = -9999;
    let pointerY = -9999;
    let smoothX = -9999;
    let smoothY = -9999;
    let tick = 0;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      smoothX += (pointerX - smoothX) * 0.08;
      smoothY += (pointerY - smoothY) * 0.08;
      tick += 0.018;

      const gap = 28;
      const radius = 1.2;

      for (let dotX = gap; dotX < width; dotX += gap) {
        for (let dotY = gap; dotY < height; dotY += gap) {
          const dx = dotX - smoothX;
          const dy = dotY - smoothY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - distance / 180);
          const offsetX = distance ? (dx / distance) * influence * 18 : 0;
          const offsetY = distance ? (dy / distance) * influence * 18 : 0;
          const phase = Math.sin((dotX + dotY) * 0.014 + tick) * 0.5 + 0.5;
          const ambient = 0.22 + phase * 0.32;
          const alpha = influence > 0.08 ? 0.88 : ambient;
          const dotRadius = radius + phase * 0.4 + influence * 1.4;

          context.beginPath();
          context.fillStyle =
            influence > 0.08
              ? `rgba(228,254,154,${alpha})`
              : `rgba(255,255,255,${alpha * 0.34})`;
          context.arc(dotX + offsetX, dotY + offsetY, dotRadius, 0, Math.PI * 2);
          context.fill();
        }
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
    };

    const handlePointerLeave = () => {
      pointerX = -9999;
      pointerY = -9999;
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[178vh] md:h-[186vh]">
      <div className="camera-track">
        <div ref={artboardRef} className="artboard hero-artboard">
          <canvas
            ref={canvasRef}
            className="hero-canvas-grid"
            aria-hidden="true"
          />
          <div className="hero-stage-outline" aria-hidden="true" />
          <div className="hero-stage-shadow" aria-hidden="true" />

          <div className="hero-comment-shell pointer-events-none absolute right-5 top-28 z-20 hidden rounded-[18px] border border-[var(--color-andy)]/30 bg-[rgba(167,139,250,0.08)] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-andy)] md:block">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--color-andy)]" />
              Arham Mansoor
            </div>
            <div ref={commentRef} className="min-h-[1.25rem] text-white/80" />
          </div>

          <div
            ref={marqueeRef}
            aria-hidden="true"
            className="hero-marquee hidden h-24 w-36 md:block"
          />

          <div
            ref={redlineRef}
            aria-hidden="true"
            className="redline-pill hidden md:block"
          />

          <section className="hero-ic">
            <div
              ref={wrapRef}
              className="hero-ic-wrap transition-transform duration-300"
            >
              <div
                ref={contentRef}
                className="flex flex-col items-center text-center transition-transform duration-300"
              >
                <span className="hero-eyebrow hero-ic-eye">
                  {siteSettings.heroEyebrow}
                </span>

                <div style={{ display: "block" }}>
                  <div className="mask-wrap">
                    <div className="hero-line drag-text">
                      {siteSettings.heroLines[0]}
                    </div>
                  </div>
                </div>

                <div style={{ display: "block" }}>
                  <div className="mask-wrap">
                    <div className="hero-line drag-text outline-copy">
                      {siteSettings.heroLines[1]}
                    </div>
                  </div>
                </div>

                <span className="hero-subtitle hero-ic-sub">
                  {siteSettings.heroSubtitle}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
