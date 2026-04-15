type DriveHostedFile = {
  fileName: string;
  fileId: string;
};

const GOOGLE_DRIVE_DOWNLOAD_BASE = "https://drive.usercontent.google.com/download";

function buildDriveDownloadUrl(fileId: string) {
  return `${GOOGLE_DRIVE_DOWNLOAD_BASE}?id=${encodeURIComponent(fileId)}&export=download`;
}

const showcaseVideoIds: Record<string, string> = {
  "cheerful-moments.mp4": "14BHpSGHXVMhpP06OuxjzCUEoDENAjVkB",
  "crime-documentary.mp4": "1xEqjcyLltzot5TyXx9QrgbU6e3HvNkJJ",
  "debonair-final.mp4": "171-HFVATpn3WR7M6hTZBAJk0wIMWPrSg",
  "jewellery-brand.mp4": "12rJVg3G7-Qtsbf_pq2arLLy7TnuRwpLR",
  "patek-motion.mp4": "1-YwMzi-jzTBJWaFzWj_8Ol5S6TPDv_xx",
  "ravea-lipstick.mp4": "1HPaFhJTZIPdkAUqq5w7iSlZrkkT6K2qr",
  "shaljit-ad.mp4": "1KfXTGkBZGZMT_wAwedbFN85kP5tkRKLF",
};

export const driveReelFiles: DriveHostedFile[] = [
  { fileName: "2.mp4", fileId: "1U5S4Vqwgpujt2bMMu_RNqObxC1hkfTxM" },
  { fileName: "Aesthetician Podcast.mp4", fileId: "1DdgTumzTEHa25ueM8V91Xwn21F064OaK" },
  { fileName: "AGFA SODA - AI VIDEOS.mp4", fileId: "1zdKsEI1I0vfgX13NaogwOqNdVZmh0CwD" },
  { fileName: "AI Reel example (1) (1).mp4", fileId: "1RaEp5weP0YgK49az25f-vb0j-u3GrkjI" },
  { fileName: "AI-RL_1.mp4", fileId: "1fc0H9fI38_b7Nk5ME2a6eIJR3NRtctU-" },
  { fileName: "AI-RL_2.mp4", fileId: "14Yq177XN5MsonrAgWxRv03oeuzagBcAI" },
  { fileName: "AI-RL_3.mp4", fileId: "1nZKRdmBPeTvE-0F3_UIRpQPsqkOazNTk" },
  {
    fileName: "ALOURA \u2014 SCRIPT 03_Excersie Paradox.mp4",
    fileId: "1tQ5FbVQhNeTQn4kyhXt2dUi6zGzuXysH",
  },
  { fileName: "Arab old Man_Captions.mp4", fileId: "1HS2_1UN-AM_UnR1lyG22yWFYlBwqpyv6" },
  { fileName: "ART GALLERY - AI VIDEO.mp4", fileId: "1Lw5sgnZD7toyrKlnMssiTn-tCkI9uQOu" },
  { fileName: "Cash Home Buyers AI.mp4", fileId: "1gcuLMVPnWR-r6S9r_pUyqW9H9PcP2JEa" },
  { fileName: "Completed Ring - Example.mp4", fileId: "1PKnd0REYGymuqGHa8e4nEcKrYhGd90QX" },
  { fileName: "Dental Shaman Video Reel.mp4", fileId: "1RFNQs-GHlu_aPycBIunSs60b9Vy4Usaj" },
  { fileName: "FInal Export.mp4", fileId: "1s_hiNK8DA920gXJ7cEp5jDklef8iGMHk" },
  { fileName: "FINALE (Teaser).mp4", fileId: "1KOd5O_oA4Z9oi8k5Ash7DVnMR7zsDinu" },
  {
    fileName:
      "freepik_ultrarealistic-ugc-style-video-of-an-old-lady-an-elderly-female-dentist-sitting-in-a-cozy-home-office-at-night-wearing-glasses-with-thin-metal-ropestyle-holders-hanging-naturally-from-the_0001.mp4",
    fileId: "1pdUykVaY6UNxKSgj0zuckGXjp4ZKnHsO",
  },
  { fileName: "Leo Benichou_Trail Video.mp4", fileId: "1USTL_4bMylPvASFfygdqu7Y3l1-WovbD" },
  { fileName: "Medieval Knight meets vlogger.mp4", fileId: "1U2sYLPHQ5RQe3kYgVVXy9qwaxu_gTTT9" },
  { fileName: "podcast clip - updated captions.mp4", fileId: "1_tqPsDDkSV8ask0LNrQdiwuHpxc4hEeW" },
  { fileName: "Post-Baby Reclamation 1.mp4", fileId: "1Usoi6cKNhiKs63hkAQp2SqxRKXEfYSG1" },
  { fileName: "REAL ESTATE - TRENDY.mp4", fileId: "1617-Odn4gU-pWwf1nbfoUJQPG7TaYqUd" },
  { fileName: "Real Estate Ai.mp4", fileId: "1QLRRAmenbMbzri7OQgp_6gVvmg9kjUZ0" },
  { fileName: "Real estate Reel 2.mp4", fileId: "1y5WYfIVZGsK2vwovRe7NbEbcF8ZETZw8" },
  { fileName: "Script 3 Sample Updated.mp4", fileId: "1WDEdDjvOuFoEvtZj6_iUc5PGvSyKOJ20" },
  { fileName: "Script 4 Sample.mp4", fileId: "1Wzd-9i6T-Sya4UBvhGiJ-tD-mOgGNB7f" },
  { fileName: "Swapperly_Promo.mp4", fileId: "1QbNcX_Tmsqk4zjCF2pBU7liV1GkCnFxt" },
  { fileName: "Swappery_Altered.mp4", fileId: "1xTr1OTKEy7hDYfxWPlJcfRToypJuKISY" },
  { fileName: "The Guardians_Altered.mp4", fileId: "1OczhY_prkWJKZ6p_F-VxUNJroM02Bumr" },
  { fileName: "The Guardians_Video 2.mp4", fileId: "1iXp5xCfB0ubv3648TM08SGhsgrGukWuI" },
  {
    fileName: "The NOIR Member_Altered_Captions_Addon.mp4",
    fileId: "1g0UrC2rIdvFn2NoxpENiqTsC0A4mjAZN",
  },
  { fileName: "THOR AI REAL ESTATE.mp4", fileId: "1lY-fpOe3sRsijuEjt1kHgvImktlrhcsH" },
  { fileName: "Tim Schucker_Video1.mp4", fileId: "1jTp3qqlWI8b0qQJwQo6sXFxJB-EnlguW" },
  { fileName: "Tim Schucker_Video2.mp4", fileId: "1KF_PjQge8xwmJi2C8rz7Z4YHz8c37vvx" },
  { fileName: "Tim Schucker_Video2_Variant 2.mp4", fileId: "1aV9Lo4M-etk_2XTpCDAfaLlyGEoZkK6e" },
  { fileName: "Tim Schucker_Video3.mp4", fileId: "1QPsGmEs0KGRMJ-qsX2hVfd2lWlbjoeTN" },
  { fileName: "Trial_1.mp4", fileId: "1Eq1tscddT_JkVxLu5FRkFlSB4qneP43O" },
  { fileName: "Trial_1_UGC.mp4", fileId: "1TYg4FSLD4UE8jBYw7YDhB2kiKB8Ts5Ed" },
  { fileName: "VELOCITY SHOE BRAND.mp4", fileId: "1Ce-maGislhZwl4ZkSSQfqHZpsjGQSNmK" },
  { fileName: "Video 3 Render.mp4", fileId: "10FAfn0Wu7cR3oGJIeYkg447kLWrlhxP6" },
  { fileName: "WARDROBE - AI CGI.mp4", fileId: "1-06Qx3yU5fjYdf28G-wge6oxU3hXi83Q" },
  { fileName: "WARDROBE AI VIDEO.mp4", fileId: "1EFbbLkov0OLwCqobDghvhbwigMm8dvzd" },
  {
    fileName: "Weight Loss Gap Investigative Script 2(1).mp4",
    fileId: "1JF1SC27NBspxTcSjvSaNX9hVQiaodqIQ",
  },
  { fileName: "Weight loss Script 3 Podcast.mp4", fileId: "1IRy2_lVX6x0GyIKFSRBRWHSV-hjE8-Ur" },
  {
    fileName: "Wright Brothers\u2019 First Flight_Revised_Captions.mp4",
    fileId: "1i1Pngx5jzLz2ysZX5uOdeB_i0MQ5-0dJ",
  },
];

const driveReelFileIdByName = new Map(
  driveReelFiles.map((entry) => [entry.fileName, entry.fileId]),
);

export function getDriveShowcaseUrl(fileName: string) {
  const fileId = showcaseVideoIds[fileName];
  return fileId ? buildDriveDownloadUrl(fileId) : null;
}

export function getDriveReelUrl(fileName: string) {
  const fileId = driveReelFileIdByName.get(fileName);
  return fileId ? buildDriveDownloadUrl(fileId) : null;
}
