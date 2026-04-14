export const sanityConfig = {
  projectId: "k0jnwspu",
  dataset: "production",
  apiVersion: "2025-01-01",
} as const;

export type SanityAsset = {
  _ref?: string | null;
  _type?: string;
  url?: string | null;
};

export type SanityImage = {
  _type?: string;
  asset?: SanityAsset | null;
} | null;

