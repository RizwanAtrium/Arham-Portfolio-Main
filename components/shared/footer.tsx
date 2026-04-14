import Link from "next/link";

import { siteSettings } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/6 py-20 md:py-28">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 md:flex-row md:items-end md:justify-between md:px-10">
        <div className="font-display text-[clamp(2rem,4.2vw,4rem)] font-bold uppercase leading-none tracking-[-0.04em]">
          LET&apos;S <span className="outline-copy">TALK.</span>
        </div>
        <div className="flex flex-wrap items-center gap-5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/65">
          <a href={`mailto:${siteSettings.email}`} className="transition hover:text-white">
            {siteSettings.email}
          </a>
          {siteSettings.socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <Link href="/privacy" className="transition hover:text-white">
            Privacy
          </Link>
          <span className="text-white/35">Copyright 2026 Arham Mansoor.</span>
        </div>
      </div>
    </footer>
  );
}
