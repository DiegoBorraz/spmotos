import type { Metadata } from "next";
import type { FC, ReactNode } from "react";
import { Geist } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { brandAssets } from "@/lib/brand";
import { copy } from "@/lib/copy";
import { buildWhatsAppHrefPlain } from "@/lib/whatsapp";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: copy.brand,
    template: `%s | ${copy.brand}`,
  },
  description: copy.tagline,
  icons: {
    icon: brandAssets.logo.src,
    apple: brandAssets.logo.src,
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="pt-BR" className={`${geistSans.variable} h-full antialiased`}>
    <body className="flex min-h-full flex-col bg-page text-page-foreground">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter
        whatsappHref={buildWhatsAppHrefPlain(`Olá! Quero falar com a ${copy.brand}.`)}
      />
    </body>
  </html>
);

export default RootLayout;
