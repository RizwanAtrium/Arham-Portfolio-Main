import { getAllReels } from "@/lib/reels";
import { SectionTitle } from "@/components/shared/section-title";
import { ReelLibraryGrid } from "@/components/work/reel-library-grid";

export default async function WorkPage() {
  const reels = await getAllReels();

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
          All 44 reels from the source folder, shown in one page for quick browsing.
        </p>
      </section>

      <section className="page-frame mt-14 md:mt-20">
        <SectionTitle primary="Full" outline="Library" />
        <ReelLibraryGrid reels={reels} />
      </section>
    </div>
  );
}
