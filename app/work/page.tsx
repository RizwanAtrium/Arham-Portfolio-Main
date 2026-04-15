import Link from "next/link";

import { SectionTitle } from "@/components/shared/section-title";
import { projects } from "@/lib/site-data";
import { sanityImageUrl } from "@/lib/sanity-image";

export default function WorkPage() {
  return (
    <div className="pb-20 pt-28 md:pb-32 md:pt-36">
      <section className="page-frame">
        <h1 className="font-display text-[clamp(4rem,11vw,8rem)] font-bold uppercase leading-[0.86] tracking-[-0.08em]">
          WORK
        </h1>
      </section>

      <section className="page-frame mt-10 space-y-8 md:mt-14">
        {projects.map((project) => {
          const imageUrl = sanityImageUrl(project.image, {
            width: 2200,
            height: 1320,
            fit: "crop",
          });

          return (
            <article
              key={project._id}
              className="group overflow-hidden rounded-[1.2rem] border border-white/8 bg-[var(--color-surface)] md:grid md:grid-cols-[0.92fr_1.08fr]"
            >
              <div className="flex flex-col justify-between gap-8 p-6 md:p-10">
                <div className="space-y-4">
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
                    {project.tag}
                  </div>
                  <h2 className="font-display text-[clamp(1.9rem,3vw,3rem)] font-bold leading-[1.02] tracking-[-0.05em]">
                    {project.title}
                  </h2>
                  <p className="max-w-2xl text-base leading-8 text-white/58">
                    {project.vision.content}
                  </p>
                </div>

                <div className="space-y-7">
                  {project.businessValue?.metrics?.length ? (
                    <div className="grid gap-5 sm:grid-cols-2">
                      {project.businessValue.metrics.slice(0, 4).map((metric) => (
                        <div key={`${project._id}-${metric.label}`} className="space-y-1">
                          <div className="font-display text-3xl font-bold tracking-[-0.05em]">
                            {metric.value}
                          </div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/42">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-white transition hover:text-[var(--color-accent)]"
                  >
                    View Case Study
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[280px] overflow-hidden bg-black md:min-h-full">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,#202020,transparent_60%),linear-gradient(135deg,#0d0d0d,#050505)] font-display text-4xl uppercase text-white/30">
                    {project.title}
                  </div>
                )}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(5,5,5,0.45))]" />
              </div>
            </article>
          );
        })}
      </section>

      <section className="page-frame mt-20 md:mt-28">
        <SectionTitle primary="Edited" outline="To Convert" />
      </section>
    </div>
  );
}
