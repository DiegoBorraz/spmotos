import type { Metadata } from "next";
import { copy } from "@/lib/copy";
import { getSiteUrl } from "@/lib/env";

const OG_IMAGE_PATH = "/logo-spmotos.webp";

export const siteMetadataBase = (): URL => new URL(getSiteUrl());

export const buildDefaultOpenGraph = (): NonNullable<Metadata["openGraph"]> => ({
  type: "website",
  locale: "pt_BR",
  siteName: copy.brand,
  title: copy.brand,
  description: copy.tagline,
  images: [
    {
      url: OG_IMAGE_PATH,
      alt: copy.brand,
    },
  ],
});

export const buildDefaultTwitter = (): NonNullable<Metadata["twitter"]> => ({
  card: "summary_large_image",
  title: copy.brand,
  description: copy.tagline,
  images: [OG_IMAGE_PATH],
});
