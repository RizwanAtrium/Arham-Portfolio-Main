"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { siteSettings } from "@/lib/site-data";

function formatEasternTime() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: siteSettings.timezone,
  }).format(new Date());
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState(() => formatEasternTime());
  const [hidden, setHidden] = useState(false);

  const links = useMemo(
    () => [
      { href: "/work", label: "Work" },
      { href: "/about", label: "About" },
    ],
    [],
  );

  useEffect(() => {
    const timer = window.setInterval(() => setTime(formatEasternTime()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setHidden(currentY > lastY && currentY > 80 && !menuOpen);
      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-6 md:px-10">
          <Link
            href="/"
            className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white mix-blend-difference"
          >
            Arham Mansoor
          </Link>
          <div className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-white/55 md:block">
            {siteSettings.location} - {time} EST
          </div>
          <nav className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-sm uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="inline-flex items-center gap-3 md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
              {menuOpen ? "Close" : "Menu"}
            </span>
            <span className="flex h-5 w-7 flex-col justify-between">
              <span
                className={`h-px bg-white transition ${
                  menuOpen ? "translate-y-[9px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px bg-white transition ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`h-px bg-white transition ${
                  menuOpen ? "-translate-y-[9px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-[rgba(5,5,5,0.98)] transition ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        } md:hidden`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-4xl font-bold uppercase tracking-[-0.04em] text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
