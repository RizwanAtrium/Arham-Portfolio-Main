export type ReelVideo = {
  id: string;
  title: string;
  src: string;
  posterSrc: string;
  fileName: string;
};

export type FeaturedReelGroup = {
  id: string;
  reels: ReelVideo[];
};
