import type { Metadata } from "next";
import type { FC } from "react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PageShell } from "@/components/PageShell";
import { copy } from "@/lib/copy";
import { buildWhatsAppHrefPlain } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: copy.contato.title,
};

const ContatoPage: FC = () => {
  const href = buildWhatsAppHrefPlain(`Olá! Quero falar com a ${copy.brand}.`);

  return (
    <PageShell>
      <div className="mx-auto flex max-w-prose flex-col gap-4">
        <h1 className="text-display font-bold text-foreground">{copy.contato.title}</h1>
        <p className="text-moss">{copy.contato.address}</p>
        <p className="text-moss">{copy.contato.hours}</p>
        <p className="text-moss">{copy.contato.phoneHint}</p>
        <WhatsAppButton href={href} label={copy.whatsapp} />
      </div>
    </PageShell>
  );
};

export default ContatoPage;
