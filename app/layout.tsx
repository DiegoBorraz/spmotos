import type { Metadata } from "next";
import type { FC, ReactNode } from "react";
import { Geist } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { brandAssets } from "@/lib/brand";
import { copy } from "@/lib/copy";
import { buildDefaultOpenGraph, buildDefaultTwitter, siteMetadataBase } from "@/lib/site-metadata";
import { buildWhatsAppHrefPlain } from "@/lib/whatsapp";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteMetadataBase(),
  title: {
    default: copy.brand,
    template: `%s | ${copy.brand}`,
  },
  description: copy.tagline,
  openGraph: buildDefaultOpenGraph(),
  twitter: buildDefaultTwitter(),
  icons: {
    icon: brandAssets.favicon.src,
    apple: brandAssets.favicon.src,
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="pt-BR" className={`${geistSans.variable} h-full antialiased`}>
    <body className="flex min-h-full flex-col bg-page text-page-foreground">
      <a
        href={`#${copy.a11y.mainContentId}`}
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-accent-cta focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:outline-none"
      >
        {copy.a11y.skipToContent}
      </a>
      <SiteHeader />
      <main id={copy.a11y.mainContentId} className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter
        whatsappHref={buildWhatsAppHrefPlain(`Olá! Quero falar com a ${copy.brand}.`)}
      />
    </body>
  </html>
);

export default RootLayout;
