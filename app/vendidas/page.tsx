import type { Metadata } from "next";
import type { FC } from "react";
import { EmptyState } from "@/components/EmptyState";
import { MotoGrid } from "@/components/MotoGrid";
import { PageShell } from "@/components/PageShell";
import { listMotos } from "@/lib/clickgarage/repository";
import { copy } from "@/lib/copy";
import { buildWhatsAppHrefPlain } from "@/lib/whatsapp";

export const revalidate = 300;

export const metadata: Metadata = {
  title: copy.vendidas.title,
};

const VendidasPage: FC = async () => {
  const motos = await listMotos({ situacao: "vendido" });
  const whatsappHref = buildWhatsAppHrefPlain(`Olá! Quero falar com a ${copy.brand}.`);

  return (
    <PageShell>
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="max-w-prose">
          <h1 className="text-display font-bold text-foreground">{copy.vendidas.title}</h1>
          <p className="mt-2 text-moss">{copy.vendidas.body}</p>
        </div>
        {motos.length === 0 ? (
          <EmptyState whatsappHref={whatsappHref} />
        ) : (
          <MotoGrid motos={motos} />
        )}
      </div>
    </PageShell>
  );
};

export default VendidasPage;
