"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    if (isTouch) {
      return;
    }

    const cursor = document.getElementById("custom-cursor");

    if (!cursor) {
      return;
    }

    setEnabled(true);

    const handleMove = (event: MouseEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <div
      id="custom-cursor"
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden -translate-x-1/2 -translate-y-1/2 md:block"
    >
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-md">
        <div className="h-3 w-3 rounded-full bg-[var(--color-accent)] shadow-[0_0_18px_rgba(228,254,154,0.8)]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
          You
        </span>
      </div>
    </div>
  );
}
