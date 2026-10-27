import type { Metadata } from "next";

type OpenGraph = NonNullable<Metadata["openGraph"]>;

/* A page's `openGraph` replaces the root one wholesale, so pages spread this to keep the shared share image. */
export const sharedOpenGraph = {
  siteName: "코런웨이브",
  type: "website",
  locale: "ko_KR",
  images: [
    {
      url: "/opengraph-image.png",
      width: 1200,
      height: 630,
      alt: "코런웨이브 — Innovation Together, Creating Waves.",
    },
  ],
} satisfies OpenGraph;
