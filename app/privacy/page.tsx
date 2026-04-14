const privacySections = [
  {
    heading: "What this site collects",
    paragraphs: [
      "When you visit this site, analytics tools and standard server logs may collect technical data such as your IP address, approximate location, browser version, device category, session identifiers, pages viewed, and time spent on page.",
      "This information helps improve the portfolio experience. There are no accounts, logins, or registration flows on this site.",
    ],
    bullets: [
      "IP address",
      "Approximate geolocation derived from IP",
      "Browser and device information",
      "Pages viewed and time on page",
    ],
  },
  {
    heading: "AI chat data",
    paragraphs: [
      "The original site includes an AI-powered chat interface. When it is used, the question, response, timestamp, referring URL, and device context may be logged to improve the quality of future responses.",
      "That data is not sold or shared for advertising.",
    ],
  },
  {
    heading: "Voice chat data",
    paragraphs: [
      "If voice mode is enabled, browser speech recognition can transcribe microphone input locally before sending the transcribed text as a regular chat message.",
      "Generated voice responses may rely on a third-party text-to-speech provider for playback.",
    ],
  },
  {
    heading: "Analytics tools",
    paragraphs: [
      "The reference site uses analytics services such as Google Analytics 4 and FullStory for aggregate usage insights and session-level UX diagnostics.",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "Analytics tools may use cookies or similar technologies. These are intended for measurement and usability analysis rather than advertising.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "If privacy laws in your region apply, you may have rights to request access, correction, deletion, restriction, objection, or portability for data associated with you.",
      "For the original portfolio, requests are handled through the contact email listed in the footer.",
    ],
  },
  {
    heading: "Data retention",
    paragraphs: [
      "Analytics and chat logs are retained only as long as needed for portfolio analytics and quality improvement, then deleted according to the original site's retention rules.",
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
          Last updated: March 2026
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
