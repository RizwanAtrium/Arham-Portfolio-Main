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

export type ReelItem = {
  id: string;
  title: string;
  tag: string;
  src: string;
  meta: string;
  poster: SanityImage;
};

export type FeaturedEdit = {
  id: string;
  slug: string;
  tag: string;
  title: string;
  description: string;
  metrics: ProjectMetric[];
  reels: ReelItem[];
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

function localImage(url: string): SanityImage {
  return {
    asset: {
      url,
    },
  };
}

export const siteSettings = {
  title: "Arham Mansoor | AI Video Editor",
  description:
    "AI video editor and video editor crafting paid ads, reels, launch films, and social edits that hold attention.",
  location: "Charlotte, NC",
  timezone: "America/New_York",
  email: "hello@arhammansoor.com",
  socialLinks: [
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/arhammansoor",
    },
  ] satisfies SocialLink[],
  heroEyebrow: "AI Video Editor / Video Editor / Motion",
  heroLines: ["AI Video", "Editor"],
  heroSubtitle:
    "I create AI-assisted ads, social reels, and polished brand edits that feel premium, move fast, and stay platform-ready.",
  heroComments: [
    "Hooks built for retention.",
    "Cuts with intent.",
    "AI speed, human taste.",
    "Sound that lands clean.",
  ],
  statementPanels: [
    {
      num: "01",
      text: "AI-assisted editing workflows built for short-form ads, brand reels, and content that needs to move fast without looking cheap.",
    },
    {
      num: "02",
      text: "I turn raw footage, prompts, motion assets, and talking-head material into clean, scroll-stopping edits shaped for real platforms.",
    },
    {
      num: "03",
      text: "From hooks and captions to pacing, sound, and export systems, I build editing that is designed to perform, not just decorate.",
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

export const companies: Company[] = [
  {
    _id: "dtc-brands",
    name: "DTC Brands",
    sector: "Ads / Launch Films",
    image: localImage("/images/cinema-rig.jpg"),
  },
  {
    _id: "founders",
    name: "Founders",
    sector: "Personal Brand Reels",
    image: localImage("/images/gimbal-setup.jpg"),
  },
  {
    _id: "podcasts",
    name: "Podcasts",
    sector: "Clips / Cutdowns",
    image: localImage("/images/podcast-video-desk.jpg"),
  },
  {
    _id: "agencies",
    name: "Agencies",
    sector: "White-Label Editing",
    image: localImage("/images/editing-workstation.jpg"),
  },
];

export const projects: Project[] = [
  {
    _id: "ai-ad-creative-system",
    slug: "ai-ad-creative-system",
    tag: "AI Ad Creative",
    title: "AI Ads That Still Feel Human",
    image: localImage("/images/cinema-rig.jpg"),
    vision: {
      title: "Vision",
      content:
        "A fast-turnaround creative system for paid ads that combines AI-assisted ideation with hands-on editing, pacing, and finishing.",
    },
    meta: {
      role: "AI Video Editor / Creative Lead",
      duration: "Ongoing",
      team: "Solo edit workflow with AI-assisted concepting, cleanup, captions, and variant production.",
      company: "DTC Brands",
    },
    customerProblem: {
      title: "The Challenge",
      content:
        "Brands need more ad volume than ever, but templated edits and generic AI outputs usually flatten the offer instead of sharpening it.",
    },
    before: {
      title: "Before",
      content:
        "Creative output was slower, hooks were inconsistent, and each new variation felt like rebuilding the same ad from scratch.",
      image: localImage("/images/filmmaker-desk.jpg"),
    },
    behavior: {
      title: "What I Build",
      content:
        "I structure the offer, define the hook, shape the visual rhythm, and turn one source concept into a flexible ad package with polished pacing and clean finishing.",
      highlights: [
        "Hook-first openings built for the first two seconds.",
        "AI-assisted ideation to speed up concept exploration without lowering visual taste.",
        "Caption hierarchy, motion accents, and audio beats tuned for paid social.",
        "Multi-format delivery for vertical, square, and landscape placements.",
      ],
    },
    after: {
      title: "After",
      content:
        "Each campaign leaves with a tighter creative system: hero ads, backup hooks, platform variations, and edit decisions that feel consistent across the whole launch.",
      image: localImage("/images/camera-monitor-desk.jpg"),
    },
    businessValue: {
      title: "Delivery Value",
      content:
        "The work is designed to increase creative output without turning the content into obvious template work.",
      metrics: [
        { value: "24-48h", label: "First Cut Window" },
        { value: "3 Formats", label: "Core Aspect Ratios" },
        { value: "Hook-First", label: "Edit Structure" },
        { value: "AI + Human", label: "Workflow Blend" },
      ],
    },
    futureState: {
      title: "Where It Goes Next",
      content:
        "The same system can scale into a monthly ad engine with repeatable frameworks for launches, offers, retargeting, and seasonal promotions.",
    },
    order: 1,
  },
  {
    _id: "personal-brand-reels",
    slug: "personal-brand-reels",
    tag: "Creator Reels",
    title: "Personal Brand Reels With Retention",
    image: localImage("/images/gimbal-setup.jpg"),
    vision: {
      title: "Vision",
      content:
        "Short-form edits for founders and creators who need sharper pacing, clearer structure, and a stronger on-screen presence.",
    },
    meta: {
      role: "Video Editor",
      duration: "Retainer / Ongoing",
      team: "Direct creator collaboration with scripting notes, edit shaping, captions, and platform exports.",
      company: "Founders",
    },
    customerProblem: {
      title: "The Challenge",
      content:
        "Talking-head content often has a strong idea but weak retention because the edit does not support the message strongly enough.",
    },
    before: {
      title: "Before",
      content:
        "Long pauses, soft openings, cluttered captions, and flat pacing made solid insights feel slower than they needed to be.",
      image: localImage("/images/laptop-editing-screen.jpg"),
    },
    behavior: {
      title: "How I Approach It",
      content:
        "I tighten the script in the timeline, remove drag, emphasize the strongest line, and build visual momentum with captions, cut rhythm, and selective motion.",
      highlights: [
        "Cleaner cold opens and stronger line ordering.",
        "Caption systems that support the point instead of decorating it.",
        "Rhythm changes that hold attention without feeling gimmicky.",
        "Exports tailored for reels, shorts, and story placements.",
      ],
    },
    after: {
      title: "After",
      content:
        "The final edit feels more confident, easier to watch, and more aligned with the creator's positioning as soon as the video starts.",
      image: localImage("/images/camera-table.jpg"),
    },
    businessValue: {
      title: "Delivery Value",
      content:
        "Creator content moves faster when the edit itself is doing strategic work, not just assembly.",
      metrics: [
        { value: "9:16", label: "Primary Delivery" },
        { value: "Clean Captions", label: "Readable on Mobile" },
        { value: "Fast Turn", label: "Repeatable Publishing" },
        { value: "Brand Safe", label: "Consistent Visual Tone" },
      ],
    },
    futureState: {
      title: "Where It Goes Next",
      content:
        "With a stable edit language in place, long-form recordings can turn into a reliable weekly reel pipeline instead of one-off content bursts.",
    },
    order: 2,
  },
  {
    _id: "podcast-social-cutdowns",
    slug: "podcast-social-cutdowns",
    tag: "Podcast Editing",
    title: "Podcast Episodes Turned Into Daily Content",
    image: localImage("/images/podcast-video-desk.jpg"),
    vision: {
      title: "Vision",
      content:
        "Repurpose long recordings into short clips that keep the original voice intact while making the format feel native to social platforms.",
    },
    meta: {
      role: "Video Editor / Content Repurposing",
      duration: "Episode-based",
      team: "Editor-led selection, clipping, captioning, sound cleanup, and multi-post packaging.",
      company: "Podcasts",
    },
    customerProblem: {
      title: "The Challenge",
      content:
        "One full episode can contain dozens of usable moments, but without a system, most of that value never becomes publishable content.",
    },
    before: {
      title: "Before",
      content:
        "The show existed mainly as a long episode, leaving social content inconsistent, time-consuming, and hard to maintain.",
      image: localImage("/images/editing-workstation.jpg"),
    },
    behavior: {
      title: "What I Build",
      content:
        "I identify clip-worthy moments, tighten the pacing, clean the audio, and build cutdowns that feel intentional rather than like random excerpts.",
      highlights: [
        "Clip selection around tension, insight, and quotable lines.",
        "Caption pacing that supports comprehension even without audio.",
        "Micro-intros and end frames when the platform needs extra context.",
        "Batched export structure for faster publishing after every recording.",
      ],
    },
    after: {
      title: "After",
      content:
        "Each episode becomes a content bank: high-value clips ready for reels, shorts, teasers, and ongoing audience touchpoints.",
      image: localImage("/images/camera-monitor-desk.jpg"),
    },
    businessValue: {
      title: "Delivery Value",
      content:
        "The podcast stops being a single asset and becomes a repeatable content engine.",
      metrics: [
        { value: "1 Episode", label: "Multiple Clip Outputs" },
        { value: "Audio Clean", label: "Speech Forward" },
        { value: "Captioned", label: "Social Ready" },
        { value: "Batchable", label: "Weekly Workflow" },
      ],
    },
    futureState: {
      title: "Where It Goes Next",
      content:
        "The same system can expand into thumbnails, motion promos, episode trailers, and guest quote packages for every release.",
    },
    order: 3,
  },
  {
    _id: "white-label-agency-finishing",
    slug: "white-label-agency-finishing",
    tag: "Agency Support",
    title: "White-Label Editing For Agencies",
    image: localImage("/images/editing-workstation.jpg"),
    vision: {
      title: "Vision",
      content:
        "Reliable post-production support for agencies that need more capacity without compromising quality or missing delivery windows.",
    },
    meta: {
      role: "Video Editor / Finishing Partner",
      duration: "Project-based + Retainer",
      team: "Agency-led creative direction with independent edit, cleanup, captions, exports, and revision handling.",
      company: "Agencies",
    },
    customerProblem: {
      title: "The Challenge",
      content:
        "Agency teams often have the strategy and client relationship in place, but post-production bottlenecks still slow campaign delivery.",
    },
    before: {
      title: "Before",
      content:
        "Internal teams were spending too much energy juggling edit rounds, aspect ratios, and polish work at the end of a launch.",
      image: localImage("/images/filmmaker-desk.jpg"),
    },
    behavior: {
      title: "How I Fit In",
      content:
        "I slot into the existing process, pick up the brief fast, and handle the post-production layer with minimal overhead for the agency team.",
      highlights: [
        "Fast adaptation to existing brand language and campaign references.",
        "Revision rounds that stay organized and client-safe.",
        "Export discipline for paid, organic, pitch, and presentation use cases.",
        "Clean finishing so the agency can stay focused on strategy and clients.",
      ],
    },
    after: {
      title: "After",
      content:
        "The agency keeps momentum, delivers sharper work, and has more room to focus on creative direction instead of timeline cleanup.",
      image: localImage("/images/cinema-rig.jpg"),
    },
    businessValue: {
      title: "Delivery Value",
      content:
        "This setup is built for dependable overflow support and polished client-facing output.",
      metrics: [
        { value: "White-Label", label: "Behind-the-Scenes Support" },
        { value: "Multi-Use", label: "Paid + Organic + Pitch" },
        { value: "Revision Ready", label: "Feedback-Friendly Workflow" },
        { value: "Consistent", label: "Quality Under Deadline" },
      ],
    },
    futureState: {
      title: "Where It Goes Next",
      content:
        "Over time this becomes a repeatable production lane that agencies can lean on whenever launches stack up or internal bandwidth gets tight.",
    },
    order: 4,
  },
  {
    _id: "product-launch-motion-packs",
    slug: "product-launch-motion-packs",
    tag: "Product Launch",
    title: "Launch Films, Cutdowns, and Motion Packs",
    image: localImage("/images/camera-monitor-desk.jpg"),
    vision: {
      title: "Vision",
      content:
        "One launch idea turned into a cohesive motion package across hero videos, teasers, short social edits, and supporting cutdowns.",
    },
    meta: {
      role: "Video Editor / Motion Assembly",
      duration: "Campaign-based",
      team: "Editor-led post with AI-assisted frame ideation, asset organization, and channel-ready export planning.",
      company: "DTC Brands",
    },
    customerProblem: {
      title: "The Challenge",
      content:
        "Product launches need more than one hero asset, but the visual language often breaks apart once the campaign expands into smaller placements.",
    },
    before: {
      title: "Before",
      content:
        "Assets were being made one by one, which made the campaign feel fragmented and slower to ship.",
      image: localImage("/images/camera-table.jpg"),
    },
    behavior: {
      title: "What I Build",
      content:
        "I create a launch structure that starts with the core story and then scales into shorter, tighter, more platform-native edits without losing the campaign feel.",
      highlights: [
        "Hero edit anchored to the core message and visual mood.",
        "Short-form derivatives built from the same motion language.",
        "Format planning from the start so each channel gets a proper version.",
        "Asset handling that keeps launches organized from preview to final export.",
      ],
    },
    after: {
      title: "After",
      content:
        "The campaign feels unified across channels, even when the final deliverables vary in length, ratio, and intensity.",
      image: localImage("/images/gimbal-setup.jpg"),
    },
    businessValue: {
      title: "Delivery Value",
      content:
        "A single launch becomes easier to manage and visually stronger once the editing system is designed up front.",
      metrics: [
        { value: "Hero + Cutdowns", label: "Launch Stack" },
        { value: "Unified", label: "Motion Language" },
        { value: "Planned", label: "Channel Variants" },
        { value: "Organized", label: "Asset Delivery" },
      ],
    },
    futureState: {
      title: "Where It Goes Next",
      content:
        "This structure can grow into a reusable campaign framework for future drops, offers, and seasonal releases.",
    },
    order: 5,
  },
  {
    _id: "narrative-brand-story-edits",
    slug: "narrative-brand-story-edits",
    tag: "Brand Story",
    title: "Narrative Edits That Still Convert",
    image: localImage("/images/laptop-editing-screen.jpg"),
    vision: {
      title: "Vision",
      content:
        "Story-led edits for founders and brands that need more emotion and clarity without drifting into slow, self-indulgent pacing.",
    },
    meta: {
      role: "Video Editor / Story Shaping",
      duration: "Project-based",
      team: "Collaborative scripting, selects, pacing, music direction, color feel, and final delivery.",
      company: "Founders",
    },
    customerProblem: {
      title: "The Challenge",
      content:
        "Narrative videos can build trust, but without disciplined editing they often become too long, too vague, or too soft for modern attention spans.",
    },
    before: {
      title: "Before",
      content:
        "The story existed in raw interviews and loose b-roll, but the emotional thread and the viewer payoff were not yet clear.",
      image: localImage("/images/podcast-video-desk.jpg"),
    },
    behavior: {
      title: "What I Focus On",
      content:
        "I shape the structure around the strongest emotional beats, keep the pacing moving, and make sure the viewer always knows why the story matters.",
      highlights: [
        "Narrative sequencing that earns attention instead of assuming it.",
        "Sound, silence, and music cues used with restraint.",
        "Visual contrast between intimate details and broader brand context.",
        "Endings designed to feel complete while still pointing toward action.",
      ],
    },
    after: {
      title: "After",
      content:
        "The final piece feels cinematic and clear at the same time, giving the brand more depth without losing momentum.",
      image: localImage("/images/filmmaker-desk.jpg"),
    },
    businessValue: {
      title: "Delivery Value",
      content:
        "This type of edit deepens trust and gives the brand more range than purely promotional content alone.",
      metrics: [
        { value: "Story-Led", label: "Emotional Structure" },
        { value: "Cinematic", label: "Premium Feel" },
        { value: "Clear", label: "Message Discipline" },
        { value: "Flexible", label: "Trailer + Full Cut" },
      ],
    },
    futureState: {
      title: "Where It Goes Next",
      content:
        "Narrative edits can branch into founder films, campaign intros, testimonial hybrids, and deeper brand storytelling assets.",
    },
    order: 6,
  },
];

export const featuredProjects = projects.slice(0, 4);

export const allReels: ReelItem[] = [
  {
    id: "jewellery-brand",
    title: "Jewellery Brand Spot",
    tag: "Luxury Ad",
    src: "/videos/jewellery-brand.mp4",
    meta: "Premium product-led ad cut",
    poster: localImage("/images/cinema-rig.jpg"),
  },
  {
    id: "patek-motion",
    title: "Watch Motion Reel",
    tag: "Product Motion",
    src: "/videos/patek-motion.mp4",
    meta: "High-contrast watch edit",
    poster: localImage("/images/camera-monitor-desk.jpg"),
  },
  {
    id: "ravea-lipstick",
    title: "Beauty Campaign Reel",
    tag: "Beauty Edit",
    src: "/videos/ravea-lipstick.mp4",
    meta: "Beauty launch-focused social reel",
    poster: localImage("/images/laptop-editing-screen.jpg"),
  },
  {
    id: "debonair-final",
    title: "Editorial Fashion Cut",
    tag: "Editorial",
    src: "/videos/debonair-final.mp4",
    meta: "Fashion-forward pacing and polish",
    poster: localImage("/images/filmmaker-desk.jpg"),
  },
  {
    id: "cheerful-moments",
    title: "Lifestyle Story Reel",
    tag: "Lifestyle",
    src: "/videos/cheerful-moments.mp4",
    meta: "Warm, upbeat branded storytelling",
    poster: localImage("/images/gimbal-setup.jpg"),
  },
  {
    id: "crime-documentary",
    title: "Narrative Documentary Teaser",
    tag: "Narrative",
    src: "/videos/crime-documentary.mp4",
    meta: "Documentary tone shaped for scroll",
    poster: localImage("/images/podcast-video-desk.jpg"),
  },
  {
    id: "shaljit-ad",
    title: "Short Commercial Spot",
    tag: "Promo",
    src: "/videos/shaljit-ad.mp4",
    meta: "Tighter promo cut for fast delivery",
    poster: localImage("/images/camera-table.jpg"),
  },
];

export const featuredEdits: FeaturedEdit[] = [
  {
    id: "featured-ai-ads",
    slug: "featured-ai-ads",
    tag: "AI Ad Creative",
    title: "AI Ads That Still Feel Human",
    description:
      "Three reel directions for paid social, product launches, and conversion-driven edits that need premium pacing without slowing production down.",
    metrics: [
      { value: "24-48h", label: "First Cut Window" },
      { value: "3 Formats", label: "Core Aspect Ratios" },
      { value: "Hook-First", label: "Edit Structure" },
      { value: "AI + Human", label: "Workflow Blend" },
    ],
    reels: [allReels[0], allReels[6], allReels[1]],
  },
  {
    id: "featured-creator-reels",
    slug: "featured-creator-reels",
    tag: "Creator Reels",
    title: "Personal Brand Reels With Retention",
    description:
      "A focused reel stack for creators and founders where the opening line, caption rhythm, and pacing carry the whole watch-through.",
    metrics: [
      { value: "9:16", label: "Primary Delivery" },
      { value: "Clean Captions", label: "Readable on Mobile" },
      { value: "Fast Turn", label: "Repeatable Publishing" },
      { value: "Brand Safe", label: "Consistent Visual Tone" },
    ],
    reels: [allReels[4], allReels[3], allReels[2]],
  },
  {
    id: "featured-podcast-cuts",
    slug: "featured-podcast-cuts",
    tag: "Podcast Editing",
    title: "Podcast Episodes Turned Into Daily Content",
    description:
      "A reel set built around cutdowns, teasers, and narrative social moments so one recording can feed multiple publishing windows.",
    metrics: [
      { value: "1 Episode", label: "Multiple Clip Outputs" },
      { value: "Audio Clean", label: "Speech Forward" },
      { value: "Captioned", label: "Social Ready" },
      { value: "Batchable", label: "Weekly Workflow" },
    ],
    reels: [allReels[5], allReels[4], allReels[6]],
  },
  {
    id: "featured-agency-support",
    slug: "featured-agency-support",
    tag: "Agency Support",
    title: "White-Label Editing For Agencies",
    description:
      "Three polished reel directions showing how overflow editing, finishing, and export cleanup can stay fast without looking templated.",
    metrics: [
      { value: "White-Label", label: "Behind-the-Scenes Support" },
      { value: "Multi-Use", label: "Paid + Organic + Pitch" },
      { value: "Revision Ready", label: "Feedback-Friendly Workflow" },
      { value: "Consistent", label: "Quality Under Deadline" },
    ],
    reels: [allReels[1], allReels[0], allReels[2]],
  },
];

export const aboutProfile: AboutProfile = {
  openingTitle: "The editor behind the momentum",
  openingLead:
    "I combine AI-assisted workflow speed with hands-on editing craft so the final video still feels sharp, intentional, and premium.",
  introParagraphs: [
    "My work lives where strategy and post-production meet: short-form ads, creator reels, podcast clips, launch videos, and social edits built to hold attention fast.",
    "I use AI where it meaningfully speeds up the process: ideation, rough assembly, transcription, cleanup, frame exploration, and repetitive versioning. Then I shape the final result by hand through pacing, structure, captions, sound, and finish.",
    "When brands, founders, or agencies need more output without losing taste, I build systems that keep content moving and keep quality stable.",
  ],
  stats: [
    { num: "24-48h", label: "Fast First Cuts" },
    { num: "3", label: "Core Aspect Ratios" },
    { num: "AI + Human", label: "Editing Workflow" },
  ],
  experience: [
    {
      year: "2024 - Present",
      role: "AI VIDEO EDITOR",
      company: "FREELANCE STUDIO",
      description:
        "Building ad creatives, short-form brand edits, and AI-assisted video workflows for products, creators, and campaigns.",
    },
    {
      year: "2022 - 2024",
      role: "VIDEO EDITOR",
      company: "CREATOR & BRAND PROJECTS",
      description:
        "Delivered reels, founder videos, launch cutdowns, and content systems designed for repeat publishing.",
    },
    {
      year: "2020 - 2022",
      role: "POST-PRODUCTION PARTNER",
      company: "AGENCY COLLABORATIONS",
      description:
        "Supported agencies with white-label editing, polish passes, captions, exports, and final delivery under deadline.",
    },
    {
      year: "2018 - 2020",
      role: "CONTENT EDITOR",
      company: "SOCIAL-FIRST CAMPAIGNS",
      description:
        "Turned raw footage into platform-ready edits with stronger hooks, clearer messaging, and cleaner motion pacing.",
    },
  ],
  fundamentals: [
    {
      num: "01",
      name: "Hook First",
      supporting: "THE OPENING HAS TO EARN THE WATCH",
      prose:
        "The first seconds decide whether the rest of the edit matters. I build openings around tension, clarity, curiosity, or payoff so the viewer has a reason to stay.",
    },
    {
      num: "02",
      name: "Edit For The Platform",
      supporting: "FORMAT CHANGES THE JOB",
      prose:
        "A good cut is not platform-agnostic. Vertical, square, paid, organic, silent autoplay, and story-driven content all need different pacing and different information density.",
    },
    {
      num: "03",
      name: "Speed Without Slop",
      supporting: "AI SHOULD REMOVE DRAG, NOT TASTE",
      prose:
        "AI helps me move faster through ideation, cleanup, rough assembly, and repetitive tasks, but the final decisions still come from editing judgment, not automation alone.",
    },
    {
      num: "04",
      name: "Finish Matters",
      supporting: "THE LAST 10 PERCENT CHANGES EVERYTHING",
      prose:
        "Timing, sound, caption hierarchy, visual restraint, and export discipline are what make an edit feel considered instead of rushed, even when the turnaround is fast.",
    },
  ],
  competencies: [
    {
      name: "AI-Assisted Editing",
      description:
        "Using prompts, cleanup tools, transcription, ideation, and rapid variant workflows without letting the work lose its polish.",
      icon: null,
    },
    {
      name: "Story Pacing",
      description:
        "Shaping attention across hooks, build, payoff, and transitions so the viewer keeps moving with the edit.",
      icon: null,
    },
    {
      name: "Captions & Messaging",
      description:
        "Designing captions and on-screen text that clarify the point, improve retention, and stay readable on mobile.",
      icon: null,
    },
    {
      name: "Color, Sound, Finish",
      description:
        "Bringing sharpness to the final delivery through audio balance, restrained polish, and premium visual consistency.",
      icon: null,
    },
    {
      name: "Multi-Format Delivery",
      description:
        "Preparing the same creative idea for reels, shorts, ads, stories, hero edits, and supporting cutdowns.",
      icon: null,
    },
  ],
  toolkit: [
    {
      name: "Premiere Pro",
      sub: "Primary editing timeline and finishing workflow",
      icon: null,
    },
    {
      name: "After Effects",
      sub: "Motion accents, titles, and supporting animation",
      icon: null,
    },
    {
      name: "DaVinci Resolve",
      sub: "Color shaping and look refinement",
      icon: null,
    },
    {
      name: "CapCut",
      sub: "Fast social-first iteration when speed matters",
      icon: null,
    },
    {
      name: "Runway + AI Tools",
      sub: "Concept frames, cleanup, and accelerated workflows",
      icon: null,
    },
    {
      name: "Frame.io / Notion",
      sub: "Feedback, review loops, and delivery organization",
      icon: null,
    },
  ],
  gallery: [
    {
      alt: "AI-assisted editing desk setup",
      image: localImage("/images/filmmaker-desk.jpg"),
    },
    {
      alt: "Color grading and post-production workstation",
      image: localImage("/images/editing-workstation.jpg"),
    },
    {
      alt: "Cinema camera and rig on production desk",
      image: localImage("/images/cinema-rig.jpg"),
    },
    {
      alt: "Creator studio ready for social video production",
      image: localImage("/images/podcast-video-desk.jpg"),
    },
  ],
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
