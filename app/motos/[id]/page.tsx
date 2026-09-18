import type { Metadata } from "next";
import type { FC } from "react";
import { notFound } from "next/navigation";
import { MotoGallery } from "@/components/MotoGallery";
import { MotoSpecs } from "@/components/MotoSpecs";
import { PageShell } from "@/components/PageShell";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getMotoById } from "@/lib/clickgarage/repository";
import { copy } from "@/lib/copy";
import { formatPrice } from "@/lib/format";
import { buildWhatsAppHref, motoPageUrl } from "@/lib/whatsapp";

export const revalidate = 300;

interface MotoDetailPageProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params,
}: MotoDetailPageProps): Promise<Metadata> => {
  const { id } = await params;
  const moto = await getMotoById(Number(id));
  if (!moto) {
    return { title: "Moto não encontrada" };
  }
  return {
    title: moto.titulo,
    description: `${moto.titulo} — ${formatPrice(moto.valorAnunciado)}`,
  };
};

const MotoDetailPage: FC<MotoDetailPageProps> = async ({ params }) => {
  const { id } = await params;
  const moto = await getMotoById(Number(id));
  if (!moto) {
    notFound();
  }

  const whatsappHref = buildWhatsAppHref(moto, motoPageUrl(moto.id));

  return (
    <PageShell>
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
        <MotoGallery
          titulo={moto.titulo}
          imagemPrincipal={moto.imagemPrincipal}
          galeria={moto.galeria}
        />
        <div className="flex flex-col gap-4 md:gap-5">
          <p className="text-sm text-moss">
            {moto.marca} · {moto.modelo}
          </p>
          <h1 className="text-display font-bold text-foreground">{moto.titulo}</h1>
          <p className="text-price-fluid font-semibold text-sale">
            {formatPrice(moto.valorAnunciado)}
          </p>
          <MotoSpecs moto={moto} />
          {moto.acessorios.length > 0 ? (
            <section>
              <h2 className="mb-2 text-base font-semibold md:text-lg">{copy.detail.accessories}</h2>
              <ul className="flex flex-wrap gap-2">
                {moto.acessorios.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-stone bg-peach px-3 py-1 text-sm text-brand"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {moto.observacoes ? (
            <section>
              <h2 className="mb-2 text-base font-semibold md:text-lg">{copy.detail.notes}</h2>
              <p className="max-w-prose text-moss">{moto.observacoes}</p>
            </section>
          ) : null}
          <div className="static pt-2 lg:sticky lg:bottom-4 lg:pt-0">
            <WhatsAppButton href={whatsappHref} label={copy.whatsapp} />
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default MotoDetailPage;
