import { aboutProfile } from "@/lib/site-data";
import { sanityImageUrl } from "@/lib/sanity-image";
import { SectionTitle } from "@/components/shared/section-title";

export default function AboutPage() {
  return (
    <div className="pb-20 pt-28 md:pb-32 md:pt-36">
      <section className="page-frame grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-start">
        <div className="space-y-8">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
              01 / The Edit Mindset
            </span>
            <h1 className="mt-4 font-display text-[clamp(4rem,11vw,8rem)] font-bold uppercase leading-[0.86] tracking-[-0.08em]">
              ABOUT
            </h1>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-8 text-white/70">
            <p className="font-display text-[clamp(1.6rem,3vw,2.35rem)] leading-[1.15] tracking-[-0.04em] text-white">
              {aboutProfile.openingLead}
            </p>
            {aboutProfile.introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {aboutProfile.gallery.map((item, index) => {
            const src = sanityImageUrl(item.image, {
              width: 1080,
              height: 1440,
              fit: "crop",
            });

            return (
              <figure
                key={`${item.alt}-${index}`}
                className={`overflow-hidden rounded-[1rem] border border-white/8 bg-[var(--color-surface)] ${
                  index % 2 === 0 ? "sm:translate-y-8" : ""
                }`}
              >
                {src ? (
                  <img
                    src={src}
                    alt={item.alt}
                    className="h-full min-h-[260px] w-full object-cover"
                  />
                ) : null}
                <figcaption className="border-t border-white/6 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                  {item.alt}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      <section className="mt-20 border-y border-white/6 bg-[var(--color-surface)] py-12 md:mt-28">
        <div className="page-frame grid gap-8 md:grid-cols-3">
          {aboutProfile.stats.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <div className="font-display text-5xl font-bold tracking-[-0.06em] md:text-6xl">
                {stat.num}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-frame mt-20 md:mt-28">
        <SectionTitle primary="Career" outline="Timeline" />
        <div className="mt-8 border-y border-white/6">
          {aboutProfile.experience.map((item) => (
            <div
              key={`${item.year}-${item.company}`}
              className="grid gap-3 border-b border-white/6 px-2 py-6 last:border-b-0 md:grid-cols-[170px_1fr_1fr]"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
                {item.year}
              </div>
              <div className="font-display text-xl font-semibold uppercase tracking-[-0.03em]">
                {item.role}
              </div>
              <div className="space-y-1">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
                  {item.company}
                </div>
                {item.description ? (
                  <div className="text-sm leading-7 text-white/55">{item.description}</div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-frame mt-20 md:mt-28">
        <SectionTitle primary="Core" outline="Foundations" />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {aboutProfile.fundamentals.map((item) => (
            <article
              key={item.num}
              className="rounded-[1rem] border border-white/8 bg-[var(--color-surface)] p-6 md:p-7"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
                {item.num}
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold tracking-[-0.04em]">
                {item.name}
              </h2>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/42">
                {item.supporting}
              </p>
              <p className="mt-5 text-base leading-8 text-white/66">{item.prose}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-frame mt-20 md:mt-28">
        <SectionTitle primary="Core" outline="Competencies" />
        <div className="mt-8 border-y border-white/6">
          {aboutProfile.competencies.map((item) => (
            <div
              key={item.name}
              className="grid gap-4 border-b border-white/6 px-2 py-6 last:border-b-0 md:grid-cols-[72px_260px_1fr] md:items-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/8 bg-white/[0.04]">
                {item.icon ? (
                  <img src={item.icon} alt={item.name} className="h-7 w-7 object-contain" />
                ) : (
                  <span className="font-display text-2xl">◇</span>
                )}
              </div>
              <div className="font-display text-2xl font-semibold tracking-[-0.04em]">
                {item.name}
              </div>
              <div className="text-base leading-8 text-white/60">{item.description}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-frame mt-20 md:mt-28">
        <SectionTitle primary="My" outline="Toolkit" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aboutProfile.toolkit.map((item) => (
            <article
              key={item.name}
              className="rounded-[1rem] border border-white/8 bg-[var(--color-surface)] p-6"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/8 bg-white/[0.04]">
                {item.icon ? (
                  <img src={item.icon} alt={item.name} className="h-7 w-7 object-contain" />
                ) : (
                  <span className="font-display text-2xl">+</span>
                )}
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold tracking-[-0.04em]">
                {item.name}
              </h2>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
                {item.sub}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
