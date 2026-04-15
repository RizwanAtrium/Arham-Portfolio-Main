const privacySections = [
  {
    heading: "What this site collects",
    paragraphs: [
      "When you visit this site, standard analytics and server logs may collect technical information such as browser type, device category, approximate location, pages viewed, and time spent on page.",
      "This information is used to understand how the portfolio performs and how visitors move through the work.",
    ],
    bullets: [
      "IP address and approximate region",
      "Browser and device information",
      "Pages viewed and time on page",
      "Referral source or landing page data",
    ],
  },
  {
    heading: "Contact and inquiries",
    paragraphs: [
      "If you contact me by email or through a linked social profile, the information you provide is used only to respond to your inquiry or discuss project work.",
      "I do not sell inquiry data or use it for third-party advertising.",
    ],
  },
  {
    heading: "Project material",
    paragraphs: [
      "If files, briefs, footage references, or feedback are shared during a project discussion, that material is treated as private working material and used only for production, review, and delivery.",
      "Any retained files are kept only as long as needed for active collaboration, archival, or agreed project support.",
    ],
  },
  {
    heading: "Analytics tools",
    paragraphs: [
      "Analytics tools may be used for aggregate traffic insights, performance monitoring, and basic UX diagnostics across the portfolio.",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "Analytics tools may use cookies or similar technologies. These are intended for measurement and site improvement rather than ad targeting.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "If privacy laws in your region apply, you may have rights to request access, correction, deletion, restriction, objection, or portability for data associated with you.",
      "Requests related to personal data can be made through the contact email listed in the footer.",
    ],
  },
  {
    heading: "Data retention",
    paragraphs: [
      "Analytics data and inquiry records are retained only as long as needed for portfolio performance review, communication history, and legitimate business follow-up.",
    ],
  },
  {
    heading: "Children",
    paragraphs: [
      "The site is not intended for children under 13 and is not designed to knowingly collect personal data from minors.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="pb-20 pt-28 md:pb-32 md:pt-36">
      <section className="page-frame">
        <h1 className="font-display text-[clamp(4rem,11vw,8rem)] font-bold uppercase leading-[0.86] tracking-[-0.08em]">
          PRIVACY
        </h1>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white/42">
          Last updated: April 2026
        </p>
      </section>

      <section className="page-frame mt-10 md:mt-14">
        <div className="rounded-[1rem] border border-white/8 bg-[var(--color-surface)] p-6 md:p-8">
          <div className="space-y-10">
            {privacySections.map((section) => (
              <div key={section.heading} className="space-y-4">
                <h2 className="font-display text-3xl font-bold tracking-[-0.04em]">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-8 text-white/66">
                    {paragraph}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="space-y-2 text-base leading-8 text-white/62">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-[11px] h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
