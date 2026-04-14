import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="flex min-h-screen items-center justify-center px-5 pt-24 text-center md:px-10">
      <div className="max-w-3xl">
        <div className="font-display text-[clamp(5rem,16vw,12rem)] font-bold uppercase leading-none tracking-[-0.08em]">
          404
        </div>
        <p className="mt-6 font-display text-[clamp(1.7rem,4vw,3rem)] tracking-[-0.04em]">
          This page does not exist.
        </p>
        <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-white/58">
          But you do, and that is what matters. Let&apos;s get you back to
          something useful.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)] transition hover:text-white"
        >
          Take Me Home
          <span aria-hidden="true">-&gt;</span>
        </Link>
      </div>
    </section>
  );
}
