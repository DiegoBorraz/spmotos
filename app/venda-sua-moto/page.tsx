import type { Metadata } from "next";
import type { FC } from "react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PageShell } from "@/components/PageShell";
import { copy } from "@/lib/copy";
import { buildWhatsAppHrefPlain } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: copy.venda.title,
};

const VendaSuaMotoPage: FC = () => {
  const href = buildWhatsAppHrefPlain(
    `Olá! ${copy.whatsappVenda}. Quero avaliar uma moto com vocês.`,
  );

  return (
    <PageShell>
      <div className="mx-auto flex max-w-prose flex-col gap-4">
        <h1 className="text-display font-bold text-foreground">{copy.venda.title}</h1>
        <p className="text-moss">{copy.venda.body}</p>
        <WhatsAppButton href={href} label={copy.whatsappVenda} />
      </div>
    </PageShell>
  );
};

export default VendaSuaMotoPage;
