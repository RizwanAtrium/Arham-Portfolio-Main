import aboutSource from "@/about.json";
import companiesSource from "@/companies.json";
import projectsSource from "@/projects-full.json";
import type { SanityImage } from "@/lib/sanity.config";

type SocialLink = {
  label: string;
  href: string;
};

type StatementPanel = {
  num: string;
  text: string;
};

type VideoShowcaseItem = {
  id: string;
  tag: string;
  title: string;
  description: string;
  src: string;
  meta: string;
};

type Company = {
  _id: string;
  name: string;
  sector: string;
  image: SanityImage;
};

type ProjectMetric = {
  value: string;
  label: string;
};

type ProjectSection = {
  title?: string;
  content?: string;
  image?: SanityImage;
};

type ProjectBehavior = {
  title?: string;
  content?: string;
  highlights?: string[];
};

type ProjectMeta = {
  role?: string;
  duration?: string;
  team?: string;
  company?: string;
};

export type Project = {
  _id: string;
  slug: string;
  tag: string;
  title: string;
  image: SanityImage;
  vision: {
    title?: string;
    content: string;
  };
  meta: ProjectMeta;
  customerProblem?: ProjectSection;
  before?: ProjectSection;
  behavior?: ProjectBehavior;
  after?: ProjectSection;
  businessValue?: {
    title?: string;
    content?: string;
    metrics?: ProjectMetric[];
  };
  futureState?: ProjectSection;
  order?: number | null;
};

type AboutExperience = {
  year: string;
  role: string;
  company: string;
  description: string;
};

type AboutFundamental = {
  num: string;
  name: string;
  supporting: string;
  prose: string;
};

type AboutCompetency = {
  name: string;
  description: string;
  icon: string | null;
};

type AboutToolkit = {
  name: string;
  sub: string;
  icon: string | null;
};

type AboutGalleryItem = {
  alt: string;
  image: SanityImage;
};

type AboutProfile = {
  openingTitle: string;
  openingLead: string;
  introParagraphs: string[];
  stats: Array<{ num: string; label: string }>;
  experience: AboutExperience[];
  fundamentals: AboutFundamental[];
  competencies: AboutCompetency[];
  toolkit: AboutToolkit[];
  gallery: AboutGalleryItem[];
};

const rawAbout = (aboutSource as { result?: Record<string, unknown> }).result ?? {};
const rawCompanies = ((companiesSource as { result?: Record<string, unknown>[] }).result ?? []) as Record<
  string,
  unknown
>[];
const rawProjects = ((projectsSource as { result?: Record<string, unknown>[] }).result ?? []) as Record<
  string,
  unknown
>[];

function normalizeText(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  return value
    .replaceAll("â€”", "—")
    .replaceAll("â€“", "–")
    .replaceAll("â†’", "→")
    .replaceAll("â†‘", "↑")
    .replaceAll("â†“", "↓")
    .replaceAll("â€™", "’")
    .replaceAll("â€œ", "“")
    .replaceAll("â€\u009d", "”")
    .replaceAll("â€˜", "‘")
    .replaceAll("Â©", "©")
    .replaceAll("Â", "")
    .trim();
}

function toPlainText(value: unknown) {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return normalizeText(value);
  }

  if (!Array.isArray(value)) {
    return "";
  }

  return normalizeText(
    value
      .map((block) => {
        if (typeof block === "string") {
          return block;
        }

        if (block && typeof block === "object" && "children" in block) {
          const children = (block as { children?: Array<{ text?: string }> }).children ?? [];
          return children.map((child) => child.text ?? "").join("");
        }

        return "";
      })
      .join(" ")
      .replace(/\s+/g, " "),
  );
}

function asImage(value: unknown): SanityImage {
  if (!value || typeof value !== "object") {
    return null;
  }

  return value as SanityImage;
}

function asStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (typeof item === "string" ? normalizeText(item) : ""))
    .filter((item) => item.length > 0);
}

function mapSection(value: unknown, fallbackTitle: string): ProjectSection | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const section = value as {
    title?: string;
    content?: string;
    image?: unknown;
  };

  return {
    title: normalizeText(section.title) || fallbackTitle,
    content: normalizeText(section.content),
    image: asImage(section.image),
  };
}

function mapProject(value: Record<string, unknown>): Project {
  const meta = (value.meta as ProjectMeta | undefined) ?? {};
  const vision = (value.vision as { title?: string; content?: string } | undefined) ?? {};
  const businessValue =
    (value.businessValue as
      | { title?: string; content?: string; metrics?: Array<{ value?: string; label?: string }> }
      | undefined) ?? undefined;

  return {
    _id: String(value._id ?? value.slug ?? crypto.randomUUID()),
    slug: normalizeText(String(value.slug ?? "")),
    tag: normalizeText(String(value.tag ?? "")),
    title: normalizeText(String(value.title ?? "")),
    image: asImage(value.image),
    vision: {
      title: normalizeText(vision.title) || "Vision",
      content: normalizeText(vision.content),
    },
    meta: {
      role: normalizeText(meta.role),
      duration: normalizeText(meta.duration),
      team: normalizeText(meta.team),
      company: normalizeText(meta.company),
    },
    customerProblem: mapSection(value.customerProblem, "Customer Problem"),
    before: mapSection(value.before, "Before"),
    behavior: value.behavior
      ? {
          title:
            normalizeText(
              (value.behavior as { title?: string; content?: string }).title,
            ) || "What I Did",
          content: normalizeText(
            (value.behavior as { title?: string; content?: string }).content,
          ),
          highlights: asStringArray(
            (value.behavior as { highlights?: unknown }).highlights,
          ),
        }
      : undefined,
    after: mapSection(value.after, "After"),
    businessValue: businessValue
      ? {
          title: normalizeText(businessValue.title) || "Business Value",
          content: normalizeText(businessValue.content),
          metrics: (businessValue.metrics ?? [])
            .map((metric) => ({
              value: normalizeText(metric.value),
              label: normalizeText(metric.label),
            }))
            .filter((metric) => metric.value || metric.label),
        }
      : undefined,
    futureState: mapSection(value.futureState, "Future State"),
    order: typeof value.order === "number" ? value.order : null,
  };
}

const fallbackExperience: AboutExperience[] = [
  {
    year: "2020 - Present",
    role: "LEAD PRODUCT DESIGNER",
    company: "LOWE'S",
    description: "Leading product design across loyalty, workshops, and enterprise-scale retail experiences.",
  },
  {
    year: "2019 - 2020",
    role: "SR. UX DESIGNER",
    company: "ENCAMP",
    description: "Shaped enterprise workflows and product strategy for complex B2B systems.",
  },
  {
    year: "2014 - 2019",
    role: "SR. DESIGNER",
    company: "ALLEGION",
    description: "Built enterprise platforms and co-authored a scalable design system foundation.",
  },
  {
    year: "2009 - 2014",
    role: "LEAD DESIGNER",
    company: "DRIVECENTRIC",
    description: "Directed CRM experience design and brand evolution for automotive software.",
  },
];

const mappedExperience = (
  ((rawAbout.experience as { roles?: Array<Record<string, unknown>> } | null)?.roles ?? []).map(
    (role) => ({
      year: normalizeText(String(role.period ?? "")),
      role: normalizeText(String(role.role ?? "")).toUpperCase(),
      company: normalizeText(String(role.company ?? "")).toUpperCase(),
      description: normalizeText(String(role.description ?? "")),
    }),
  ) as AboutExperience[]
).filter((role) => role.year && role.role && role.company);

export const siteSettings = {
  title: "Arham Mansoor | Product Designer",
  description:
    "Product designer with 20+ years building systems that scale and experiences that stick.",
  location: "Charlotte, NC",
  timezone: "America/New_York",
  email: "hello@arhammansoor.com",
  socialLinks: [
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/arhammansoor",
    },
  ] satisfies SocialLink[],
  heroEyebrow: "Product Designer / Systems / UX",
  heroLines: ["Arham", "Mansoor"],
  heroSubtitle:
    "Product designer with 20+ years building systems that scale and experiences that stick.",
  heroComments: [
    "Systems that scale.",
    "Interfaces that feel inevitable.",
    "Motion with restraint.",
    "Clarity over clutter.",
  ],
  statementPanels: [
    {
      num: "01",
      text: "Product designer with 20+ years building systems that scale and experiences that stick.",
    },
    {
      num: "02",
      text: "I turn enterprise complexity into interfaces teams can trust, use fast, and grow with confidence.",
    },
    {
      num: "03",
      text: "From design systems to product vision, I build the structure behind premium digital experiences.",
    },
  ] satisfies StatementPanel[],
  videoShowcase: [
    {
      id: "01",
      tag: "Luxury Brand Motion",
      title: "Precision-led stories.",
      description:
        "A cinematic showcase with full-bleed motion, rich pacing, and an editorial overlay that keeps the work premium instead of noisy.",
      src: "/videos/jewellery-brand.mp4",
      meta: "Jewellery / AI Video",
    },
    {
      id: "02",
      tag: "Watch Campaign",
      title: "Engineered motion.",
      description:
        "A high-contrast product reel built to own the viewport and keep the pacing deliberate while the page scrolls around it.",
      src: "/videos/patek-motion.mp4",
      meta: "Watch / Motion Reel",
    },
    {
      id: "03",
      tag: "Beauty Campaign",
      title: "Full-frame beauty film.",
      description:
        "The video owns the entire section while the copy stays restrained, so the experience feels deliberate and not like a random embed dropped into the layout.",
      src: "/videos/ravea-lipstick.mp4",
      meta: "Lipstick / Brand Film",
    },
    {
      id: "04",
      tag: "Editorial Reel",
      title: "Editorial motion system.",
      description:
        "Each reel enters as its own scene, stays pinned while active, and hands off to the next one with depth, contrast, and clean control of sound.",
      src: "/videos/debonair-final.mp4",
      meta: "Fashion / Debonair",
    },
    {
      id: "05",
      tag: "Lifestyle Film",
      title: "Lifestyle sequence.",
      description:
        "The section stays visually consistent while the content can shift into a lighter, more emotional tone without breaking the page rhythm.",
      src: "/videos/cheerful-moments.mp4",
      meta: "Lifestyle / Brand Story",
    },
    {
      id: "06",
      tag: "Documentary Frame",
      title: "Narrative documentary reel.",
      description:
        "A more narrative video still feels cohesive here because the structure, spacing, and transitions are doing the heavy lifting.",
      src: "/videos/crime-documentary.mp4",
      meta: "Documentary / Narrative",
    },
    {
      id: "07",
      tag: "Commercial Spot",
      title: "Commercial spotlight.",
      description:
        "Short-form promotional content sits inside the same sticky sequence, giving even smaller assets a polished presentation layer.",
      src: "/videos/shaljit-ad.mp4",
      meta: "Ad / Promo",
    },
  ] satisfies VideoShowcaseItem[],
} as const;

export const projects = rawProjects
  .map(mapProject)
  .filter((project) => project.slug.length > 0)
  .sort((left, right) => {
    const leftOrder = left.order ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = right.order ?? Number.MAX_SAFE_INTEGER;
    return leftOrder - rightOrder || left.title.localeCompare(right.title);
  });

export const featuredProjects = projects.slice(0, 4);

export const companies: Company[] = rawCompanies.map((company) => ({
  _id: String(company._id ?? company.name ?? crypto.randomUUID()),
  name: normalizeText(String(company.name ?? "")),
  sector: normalizeText(String(company.sector ?? "")),
  image: asImage(company.image),
}));

export const aboutProfile: AboutProfile = {
  openingTitle: normalizeText(String(rawAbout.openingTitle ?? "The long game")),
  openingLead:
    normalizeText(String(rawAbout.openingLead ?? "")) ||
    "I've spent 20+ years learning that craft isn't a shortcut - it's the path.",
  introParagraphs: [
    "I design for those who crave clarity without sacrificing energy - transforming complexity into sleek, immersive environments where every detail is intentional.",
    "I'm endlessly curious about what's next in design, technology, and the way teams build together. I still get excited about a well-crafted interface the same way I did twenty years ago.",
    "When I'm off-screen, you'll usually find me tinkering, deep in Minecraft, or spending slow weekends with my wife and our dog Chloe.",
  ],
  stats: [
    { num: "20+", label: "Years Experience" },
    { num: "6", label: "Major Brands" },
    { num: "50+", label: "Products Shipped" },
  ],
  experience: mappedExperience.length ? mappedExperience : fallbackExperience,
  fundamentals: (
    (rawAbout.fundamentals as Array<Record<string, unknown>> | undefined) ?? []
  ).map((item, index) => ({
    num: String(index + 1).padStart(2, "0"),
    name: normalizeText(String(item.title ?? `Foundation ${index + 1}`)),
    supporting: normalizeText(String(item.supporting ?? "")),
    prose: toPlainText(item.prose),
  })),
  competencies: (
    (rawAbout.competencies as Array<Record<string, unknown>> | undefined) ?? []
  ).map((item) => ({
    name: normalizeText(String(item.name ?? "")),
    description: normalizeText(String(item.description ?? "")),
    icon:
      (item.icon as { asset?: { url?: string } } | undefined)?.asset?.url ?? null,
  })),
  toolkit: ((rawAbout.toolkit as Array<Record<string, unknown>> | undefined) ?? []).map(
    (item) => ({
      name: normalizeText(String(item.name ?? "")),
      sub: normalizeText(String(item.sub ?? "")),
      icon:
        (item.icon as { asset?: { url?: string } } | undefined)?.asset?.url ?? null,
    }),
  ),
  gallery: ((rawAbout.gallery as Array<Record<string, unknown>> | undefined) ?? [])
    .filter((item) => item.image)
    .slice(0, 4)
    .map((item, index) => ({
      alt: normalizeText(String(item.alt ?? `Arham Mansoor ${index + 1}`)),
      image: asImage(item.image),
    })),
};

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const currentIndex = projects.findIndex((project) => project.slug === slug);

  if (currentIndex < 0 || projects.length < 2) {
    return null;
  }

  return projects[(currentIndex + 1) % projects.length] ?? null;
}
