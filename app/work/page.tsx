import { SectionTitle } from "@/components/shared/section-title";
import { allReels, featuredEdits } from "@/lib/site-data";
import { sanityImageUrl } from "@/lib/sanity-image";

export default function WorkPage() {
  return (
    <div className="pb-20 pt-28 md:pb-32 md:pt-36">
      <section className="page-frame">
        <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
          Reel Library
        </div>
        <h1 className="mt-4 font-display text-[clamp(4rem,11vw,8rem)] font-bold uppercase leading-[0.86] tracking-[-0.08em]">
          ALL REELS
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-white/62 md:text-lg">
          Featured edit stacks plus the full reel library in one place. Every video here is
          optimized for brand motion, creator content, social-first storytelling, and commercial
          delivery.
        </p>
      </section>

      <section className="page-frame mt-14 space-y-12 md:mt-20">
        {featuredEdits.map((edit) => (
          <article
            key={edit.id}
            id={edit.slug}
            className="rounded-[1.2rem] border border-white/8 bg-[var(--color-surface)] p-6 md:p-8"
          >
            <div className="md:flex md:items-end md:justify-between">
              <div className="space-y-4">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
                  {edit.tag}
                </div>
                <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1] tracking-[-0.05em]">
                  {edit.title}
                </h2>
                <p className="max-w-3xl text-base leading-8 text-white/58">{edit.description}</p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 md:mt-0 md:w-[380px]">
                {edit.metrics.slice(0, 4).map((metric) => (
                  <div key={`${edit.id}-${metric.label}`} className="space-y-1">
                    <div className="font-display text-3xl font-bold tracking-[-0.05em]">
                      {metric.value}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/42">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {edit.reels.map((reel) => {
                const posterUrl = sanityImageUrl(reel.poster, {
                  width: 960,
                  height: 1200,
                  fit: "crop",
                });

                return (
                  <article
                    key={`${edit.id}-${reel.id}`}
                    className="overflow-hidden rounded-[1rem] border border-white/8 bg-black"
                  >
                    <div className="relative aspect-[9/14] overflow-hidden">
                      <video
                        src={reel.src}
                        poster={posterUrl ?? undefined}
                        className="h-full w-full object-cover"
                        muted
                        loop
                        autoPlay
                        playsInline
                        preload="metadata"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.12)_38%,rgba(0,0,0,0.52)_100%)]" />
                    </div>
                    <div className="space-y-2 border-t border-white/8 px-4 py-4">
                      <div className="font-display text-xl font-bold tracking-[-0.04em]">
                        {reel.title}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                        {reel.tag}
                      </div>
                      <p className="text-sm leading-7 text-white/56">{reel.meta}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </article>
        ))}
      </section>

      <section className="page-frame mt-20 md:mt-28">
        <SectionTitle primary="Full" outline="Library" />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {allReels.map((reel) => {
            const posterUrl = sanityImageUrl(reel.poster, {
              width: 960,
              height: 1200,
              fit: "crop",
            });

            return (
              <article
                key={reel.id}
                className="overflow-hidden rounded-[1rem] border border-white/8 bg-[var(--color-surface)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <video
                    src={reel.src}
                    poster={posterUrl ?? undefined}
                    className="h-full w-full object-cover"
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_46%,rgba(0,0,0,0.4))]" />
                </div>
                <div className="space-y-2 px-5 py-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/42">
                    {reel.tag}
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-[-0.04em]">
                    {reel.title}
                  </h3>
                  <p className="text-sm leading-7 text-white/58">{reel.meta}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
