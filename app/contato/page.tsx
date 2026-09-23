import type { Metadata } from "next";
import type { FC } from "react";
import { ContatoDirections } from "@/components/ContatoDirections";
import { ContatoInfoCard } from "@/components/ContatoInfoCard";
import { StoreMapEmbed } from "@/components/StoreMapEmbed";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PageShell } from "@/components/PageShell";
import { copy } from "@/lib/copy";
import { buildWhatsAppHrefPlain } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: copy.contato.title,
  description: copy.contato.metaDescription,
  openGraph: {
    title: copy.contato.title,
    description: copy.contato.metaDescription,
  },
};

const ContatoPage: FC = () => {
  const href = buildWhatsAppHrefPlain(`Olá! Quero falar com a ${copy.brand}.`);

  return (
    <PageShell>
      <article className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex max-w-prose flex-col gap-3">
          <h1 className="text-display font-bold text-foreground">{copy.contato.title}</h1>
          <p className="leading-relaxed text-moss">{copy.contato.intro}</p>
        </header>

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-start lg:gap-10">
          <div className="flex flex-col gap-8">
            <ContatoInfoCard whatsappHref={href} />
            <ContatoDirections />
          </div>

          <section className="flex flex-col gap-3" aria-labelledby="contato-map-heading">
            <h2 id="contato-map-heading" className="text-lg font-bold text-foreground">
              {copy.contato.mapHeading}
            </h2>
            <StoreMapEmbed />
          </section>
        </div>

        <footer className="border-t border-stone pt-6">
          <WhatsAppButton href={href} label={copy.whatsapp} />
        </footer>
      </article>
    </PageShell>
  );
};

export default ContatoPage;
