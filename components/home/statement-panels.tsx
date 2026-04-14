"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { siteSettings } from "@/lib/site-data";

gsap.registerPlugin(ScrollTrigger);

export function StatementPanels() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const panelsRef = useRef<Array<HTMLDivElement | null>>([]);
  const numbersRef = useRef<Array<HTMLSpanElement | null>>([]);
  const textRef = useRef<Array<HTMLParagraphElement | null>>([]);
  const contentRef = useRef<Array<HTMLSpanElement | null>>([]);
  const typingTweensRef = useRef<Array<gsap.core.Tween | null>>([]);
  const activeIndexRef = useRef(0);
  const selectionRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const toastRef = useRef<HTMLDivElement | null>(null);
  const toastPropRef = useRef<HTMLSpanElement | null>(null);
  const toastValueRef = useRef<HTMLSpanElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current || !stageRef.current) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      panelsRef.current.forEach((panel, index) => {
        if (panel) {
          panel.style.opacity = index === 0 ? "1" : "0";
        }
      });

      contentRef.current.forEach((content, index) => {
        if (content) {
          content.textContent = siteSettings.statementPanels[index]?.text ?? "";
        }
      });

      stageRef.current.style.opacity = "1";
      stageRef.current.style.transform = "none";
      stageRef.current.style.borderRadius = "0";
      stageRef.current.style.boxShadow = "none";
      return;
    }

    const stage = stageRef.current;
    const panels = panelsRef.current.filter(Boolean) as HTMLDivElement[];
    const numbers = numbersRef.current.filter(Boolean) as HTMLSpanElement[];
    const texts = textRef.current.filter(Boolean) as HTMLParagraphElement[];
    const selection = selectionRef.current;
    const label = labelRef.current;
    const toast = toastRef.current;
    const toastProp = toastPropRef.current;
    const toastValue = toastValueRef.current;
    const cursor = cursorRef.current;

    if (
      !panels.length ||
      !selection ||
      !label ||
      !toast ||
      !toastProp ||
      !toastValue ||
      !cursor
    ) {
      return;
    }

    const context = gsap.context(() => {
      gsap.set(stage, {
        scale: 0.5,
        rotateX: 45,
        rotateZ: -10,
        yPercent: 150,
        z: -500,
        opacity: 0,
        borderRadius: "32px",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.1)",
      });

      panels.forEach((panel) => {
        gsap.set(panel, { autoAlpha: 0 });
      });
      gsap.set(numbers, { autoAlpha: 0, y: 16 });
      gsap.set(texts, { autoAlpha: 0, y: 30 });
      gsap.set(selection, { autoAlpha: 0 });
      gsap.set(cursor, { autoAlpha: 0 });
      gsap.set(toast, { autoAlpha: 0 });

      contentRef.current.forEach((content) => {
        if (content) {
          content.textContent = "";
        }
      });

      const placeSelection = (target: HTMLElement) => {
        const bounds = target.getBoundingClientRect();

        gsap.to(selection, {
          autoAlpha: 1,
          duration: 0.14,
          ease: "none",
          x: bounds.left - 6,
          y: bounds.top - 6,
          width: bounds.width + 12,
          height: bounds.height + 12,
        });

        return bounds;
      };

      const placeTextAccents = (index: number) => {
        const target = contentRef.current[index];

        if (!target || !target.textContent?.trim()) {
          return;
        }

        const bounds = placeSelection(target);

        label.textContent = `p / Statement ${siteSettings.statementPanels[index]?.num ?? "00"}`;
        toastProp.textContent = "content";
        toastValue.textContent = "editing...";

        gsap.to(cursor, {
          autoAlpha: 1,
          duration: 0.18,
          ease: "none",
          x: bounds.right - 60,
          y: bounds.bottom + 16,
        });

        gsap.to(toast, {
          autoAlpha: 1,
          duration: 0.18,
          ease: "none",
          x: Math.min(bounds.right - 40, window.innerWidth - 220),
          y: bounds.bottom + 12,
        });
      };

      const moveCounterAccents = (index: number) => {
        const number = numbers[index];

        if (!number) {
          return;
        }

        activeIndexRef.current = index;
        const bounds = placeSelection(number);

        label.textContent = "span / Counter";
        toastProp.textContent = "alignment";
        toastValue.textContent = "center";

        gsap.to(cursor, {
          autoAlpha: 1,
          duration: 0.18,
          ease: "none",
          x: bounds.right + 12,
          y: bounds.top - 4,
        });

        gsap.fromTo(
          toast,
          { autoAlpha: 0, scale: 0.96 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.18,
            ease: "power2.out",
            x: bounds.right + 40,
            y: bounds.top - 36,
          },
        );
      };

      const typePanel = (index: number) => {
        const target = contentRef.current[index];
        const source = siteSettings.statementPanels[index]?.text ?? "";

        if (!target) {
          return;
        }

        typingTweensRef.current[index]?.kill();
        target.innerHTML = "";

        const state = { count: 0 };
        typingTweensRef.current[index] = gsap.to(state, {
          count: source.length,
          duration: 1.05,
          ease: "none",
          onUpdate: () => {
            const value = source.slice(0, Math.floor(state.count));
            target.innerHTML = `${value}<span class="intro-cursor"></span>`;
            placeTextAccents(index);
          },
          onComplete: () => {
            target.textContent = source;
            toastValue.textContent = index === panels.length - 1 ? "done" : "set";
            placeTextAccents(index);
          },
        });
      };

      const hideAccents = () => {
        gsap.to([selection, cursor, toast], {
          autoAlpha: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: `+=${(panels.length + 1) * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onLeave: hideAccents,
          onLeaveBack: hideAccents,
          onEnterBack: () => {
            gsap.set(panels[0], { autoAlpha: 1 });
            moveCounterAccents(0);
            typePanel(0);
          },
        },
      });

      tl.to(stage, {
        scale: 1,
        rotateX: 0,
        rotateZ: 0,
        yPercent: 0,
        z: 0,
        opacity: 1,
        borderRadius: "0px",
        boxShadow: "none",
        duration: 1.2,
        ease: "power3.inOut",
      })
        .set(panels[0], { autoAlpha: 1 }, 0.22)
        .to(
          numbers[0],
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.22,
            onStart: () => moveCounterAccents(0),
          },
          0.36,
        )
        .fromTo(
          texts[0],
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.42,
            ease: "power3.out",
            onStart: () => typePanel(0),
          },
          0.78,
        )
        .to(
          {},
          {
            duration: 0.72,
            onUpdate: () => placeTextAccents(0),
          },
          1.2,
        );

      panels.slice(1).forEach((panel, panelOffset) => {
        const index = panelOffset + 1;
        const previousPanel = panels[index - 1];
        const previousNumber = numbers[index - 1];
        const num = numbers[index];
        const text = texts[index];
        const startAt = 1.95 + panelOffset * 1.55;

        tl.to(
          previousPanel,
          {
            autoAlpha: 0,
            duration: 0.32,
            ease: "power2.inOut",
          },
          startAt,
        )
          .to(
            previousNumber,
            {
              autoAlpha: 0,
              y: -12,
              duration: 0.22,
              ease: "power2.inOut",
            },
            startAt,
          )
          .set(panel, { autoAlpha: 1 }, startAt + 0.08)
          .to(
            num,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.22,
              onStart: () => moveCounterAccents(index),
            },
            startAt + 0.18,
          )
          .fromTo(
            text,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.42,
              ease: "power3.out",
              onStart: () => typePanel(index),
            },
            startAt + 0.52,
          )
          .to(
            {},
            {
              duration: 0.74,
              onUpdate: () => placeTextAccents(index),
            },
            startAt + 0.94,
          );
      });

      const handleResize = () => {
        placeTextAccents(activeIndexRef.current);
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        typingTweensRef.current.forEach((tween) => tween?.kill());
      };
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef} className="intro-panels relative z-10 -mt-[18vh] md:-mt-[24vh]">
      <div className="intro-pin">
        <div ref={stageRef} className="intro-stage">
          {siteSettings.statementPanels.map((panel, index) => (
            <div
              key={panel.num}
              ref={(element) => {
                panelsRef.current[index] = element;
              }}
              className="intro-panel"
            >
              <div className="intro-panel__inner">
                <span
                  ref={(element) => {
                    numbersRef.current[index] = element;
                  }}
                  className="intro-panel__num"
                >
                  {panel.num}
                </span>
                <p
                  ref={(element) => {
                    textRef.current[index] = element;
                  }}
                  className="intro-panel__text tracking-[-0.04em] text-white/92"
                >
                  <span
                    ref={(element) => {
                      contentRef.current[index] = element;
                    }}
                  />
                </p>
              </div>
            </div>
          ))}

          <div ref={selectionRef} className="intro-asel">
            <div ref={labelRef} className="intro-asel-lbl" />
            <div className="intro-asel-handle h-tl" />
            <div className="intro-asel-handle h-tr" />
            <div className="intro-asel-handle h-bl" />
            <div className="intro-asel-handle h-br" />
          </div>
        </div>

        <div ref={cursorRef} className="intro-ac hidden md:block">
          <div className="flex items-center gap-2">
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
              <path
                d="M0.5 0.5L13 10.5H5.5L2.5 17.5L0.5 0.5Z"
                fill="#a78bfa"
                stroke="rgba(0,0,0,0.3)"
                strokeWidth="0.5"
              />
            </svg>
            <div className="intro-ac-tag">Arham Mansoor</div>
          </div>
        </div>

        <div ref={toastRef} className="intro-toast">
          <div className="intro-toast-inner">
            <span ref={toastPropRef} className="intro-toast-prop">
              content
            </span>
            <span className="intro-toast-arrow">-&gt;</span>
            <span ref={toastValueRef} className="intro-toast-val">
              editing...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
