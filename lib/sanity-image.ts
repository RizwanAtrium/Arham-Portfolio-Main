import { sanityConfig, type SanityImage } from "@/lib/sanity.config";

type ImageOptions = {
  width?: number;
  height?: number;
  fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "min" | "scale";
};

type ImageSource = SanityImage | string | null | undefined;

function appendParams(url: string, options?: ImageOptions) {
  if (!options) {
    return url;
  }

  const isRelative = url.startsWith("/");
  const nextUrl = new URL(url, isRelative ? "http://local.asset" : undefined);

  if (options.width) {
    nextUrl.searchParams.set("w", String(options.width));
  }

  if (options.height) {
    nextUrl.searchParams.set("h", String(options.height));
  }

  if (options.fit) {
    nextUrl.searchParams.set("fit", options.fit);
  }

  nextUrl.searchParams.set("auto", "format");
  return isRelative ? `${nextUrl.pathname}${nextUrl.search}` : nextUrl.toString();
}

function refToImageUrl(ref: string) {
  const match = /^image-([^-]+)-(\d+x\d+)-([a-z0-9]+)$/i.exec(ref);

  if (!match) {
    return null;
  }

  const [, assetId, dimensions, format] = match;
  return `https://cdn.sanity.io/images/${sanityConfig.projectId}/${sanityConfig.dataset}/${assetId}-${dimensions}.${format}`;
}

export function sanityImageUrl(source: ImageSource, options?: ImageOptions) {
  if (!source) {
    return null;
  }

  if (typeof source === "string") {
    return appendParams(source, options);
  }

  const asset = source.asset;

  if (asset?.url) {
    return appendParams(asset.url, options);
  }

  if (asset?._ref) {
    const baseUrl = refToImageUrl(asset._ref);
    return baseUrl ? appendParams(baseUrl, options) : null;
  }

  return null;
}
