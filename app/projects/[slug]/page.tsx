import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getNextProject, getProjectBySlug, projects } from "@/lib/site-data";
import { sanityImageUrl } from "@/lib/sanity-image";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Arham Mansoor`,
    description: project.vision.content,
  };
}

function renderSection(
  title: string | undefined,
  content: string | undefined,
  image?: string | null,
) {
  if (!content) {
    return null;
  }

  return (
    <section className="space-y-5">
      <h2 className="font-display text-3xl font-bold tracking-[-0.04em]">
        {title}
      </h2>
      <p className="text-base leading-8 text-white/66">{content}</p>
      {image ? (
        <div className="overflow-hidden rounded-[1rem] border border-white/8 bg-[var(--color-surface)]">
          <img src={image} alt={title || "Project section"} className="w-full object-cover" />
        </div>
      ) : null}
    </section>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(slug);
  const heroImage = sanityImageUrl(project.image, {
    width: 2400,
    height: 1500,
    fit: "crop",
  });
  const beforeImage = sanityImageUrl(project.before?.image ?? null, {
    width: 1600,
    height: 900,
    fit: "crop",
  });
  const afterImage = sanityImageUrl(project.after?.image ?? null, {
    width: 1600,
    height: 900,
    fit: "crop",
  });

  return (
    <article className="pb-20 pt-24 md:pb-32 md:pt-28">
      <section className="relative overflow-hidden border-b border-white/6">
        {heroImage ? (
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.45),rgba(5,5,5,0.92)_72%,rgba(5,5,5,1))]" />
        <div className="page-frame relative z-10 py-20 md:py-28">
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
            {project.tag}
          </div>
          <h1 className="mt-5 max-w-5xl font-display text-[clamp(2.6rem,5vw,5.4rem)] font-bold leading-[0.92] tracking-[-0.06em]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68">
            {project.vision.content}
          </p>
        </div>
      </section>

      <div className="page-frame mt-10 grid gap-10 md:mt-14 md:grid-cols-[240px_1fr]">
        <aside className="space-y-6 rounded-[1rem] border border-white/8 bg-[var(--color-surface)] p-6">
          {project.meta.role ? (
            <div className="space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/42">
                Role
              </div>
              <div className="font-display text-xl font-semibold tracking-[-0.04em]">
                {project.meta.role}
              </div>
            </div>
          ) : null}
          {project.meta.team ? (
            <div className="space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/42">
                Team
              </div>
              <div className="text-sm leading-7 text-white/68">{project.meta.team}</div>
            </div>
          ) : null}
          {project.meta.duration ? (
            <div className="space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/42">
                Duration
              </div>
              <div className="text-sm leading-7 text-white/68">{project.meta.duration}</div>
            </div>
          ) : null}
          {project.meta.company ? (
            <div className="space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/42">
                Company
              </div>
              <div className="text-sm leading-7 text-white/68">{project.meta.company}</div>
            </div>
          ) : null}
        </aside>

        <div className="space-y-12">
          {renderSection(
            project.customerProblem?.title ?? "The Challenge",
            project.customerProblem?.content,
          )}
          {renderSection(project.before?.title ?? "Before", project.before?.content, beforeImage)}
          {project.behavior?.content ? (
            <section className="space-y-5">
              <h2 className="font-display text-3xl font-bold tracking-[-0.04em]">
                {project.behavior.title ?? "What I Did"}
              </h2>
              <p className="text-base leading-8 text-white/66">
                {project.behavior.content}
              </p>
              {project.behavior.highlights?.length ? (
                <ul className="space-y-3 text-base leading-8 text-white/62">
                  {project.behavior.highlights
                    .filter((item) => item.trim().length > 0)
                    .map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 border-b border-white/6 pb-3 last:border-b-0"
                      >
                        <span className="mt-[11px] h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                </ul>
              ) : null}
            </section>
          ) : null}
          {renderSection(project.after?.title ?? "After", project.after?.content, afterImage)}
          {renderSection(
            project.businessValue?.title ?? "Business Value",
            project.businessValue?.content,
          )}
          {renderSection(
            project.futureState?.title ?? "Future State",
            project.futureState?.content,
          )}
        </div>
      </div>

      {project.businessValue?.metrics?.length ? (
        <section className="mt-16 border-y border-white/6 bg-[var(--color-surface)] py-12 md:mt-24">
          <div className="page-frame grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {project.businessValue.metrics.map((metric) => (
              <div key={`${project._id}-${metric.label}`} className="space-y-2">
                <div className="font-display text-4xl font-bold tracking-[-0.05em]">
                  {metric.value}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/42">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {nextProject ? (
        <section className="page-frame mt-16 md:mt-24">
          <div className="rounded-[1rem] border border-white/8 bg-[var(--color-surface)] px-6 py-7">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/42">
              Next Project
            </div>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="mt-3 inline-flex font-display text-3xl font-bold tracking-[-0.05em] transition hover:text-[var(--color-accent)]"
            >
              {nextProject.title}
            </Link>
          </div>
        </section>
      ) : null}
    </article>
  );
}
