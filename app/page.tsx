import type { Metadata } from "next";
import type { FC } from "react";
import { Suspense } from "react";
import { EmptyState } from "@/components/EmptyState";
import { EstoqueFilters } from "@/components/EstoqueFilters";
import { HomeEstoqueGrid } from "@/components/HomeEstoqueGrid";
import { HomeHero } from "@/components/HomeHero";
import { HomeTrustStrip } from "@/components/HomeTrustStrip";
import { MotoDetailMissingModal, MotoDetailModal } from "@/components/MotoDetailModal";
import {
  ESTOQUE_BATCH_SIZE,
  getMotoById,
  listMotos,
  listMotosBatch,
  marcasFromMotos,
} from "@/lib/clickgarage/repository";
import { copy } from "@/lib/copy";
import { parseEstoqueParams, parseMotoDetailId, QueryValueMap } from "@/lib/estoque-query";
import { HOME_RECENT_ORDER } from "@/lib/home-hero";
import {
  buildWhatsAppHrefForMotoLinks,
  buildWhatsAppHrefPlainLinks,
  motoPageUrl,
} from "@/lib/whatsapp";

export const revalidate = 300;

export const metadata: Metadata = {
  title: copy.nav.home,
  description: copy.tagline,
};

interface HomePageProps {
  searchParams: Promise<QueryValueMap>;
}

const HomePage: FC<HomePageProps> = async ({ searchParams }) => {
  const query = await searchParams;
  const params = parseEstoqueParams(query);
  const listParams = {
    ...params,
    ordenar: params.ordenar ?? HOME_RECENT_ORDER,
  };

  const estoqueBase = await listMotos({ ordenar: HOME_RECENT_ORDER });
  const { items: initialItems, total } = await listMotosBatch(
    listParams,
    0,
    ESTOQUE_BATCH_SIZE,
  );

  const whatsappLinks = buildWhatsAppHrefPlainLinks(`Olá! Quero falar com a ${copy.brand}.`);
  const marcas = marcasFromMotos(estoqueBase);

  const busca = params.busca ?? "";
  const marca = params.marca ?? "";
  const valorMax = params.valorMax !== undefined ? String(params.valorMax) : "";

  const motoId = parseMotoDetailId(query);
  const detailMoto = motoId ? await getMotoById(motoId) : null;
  const detailWhatsappLinks =
    detailMoto !== null
      ? buildWhatsAppHrefForMotoLinks(detailMoto, motoPageUrl(detailMoto.id))
      : [];

  return (
    <>
      <HomeHero />
      <div className="relative z-10 mt-4 md:-mt-8">
        <EstoqueFilters marcas={marcas} busca={busca} marca={marca} valorMax={valorMax} />
      </div>
      <div className="bg-page">
        {total === 0 ? (
          <section className="py-10 md:py-12">
            <div className="site-container">
              <EmptyState whatsappLinks={whatsappLinks} />
            </div>
          </section>
        ) : (
          <section id="estoque" className="scroll-mt-header py-10 md:py-12 2xl:py-14">
            <div className="site-container flex flex-col gap-6 2xl:gap-8">
              <div className="flex items-center gap-3">
                <span className="h-8 w-1 rounded-full bg-accent" aria-hidden="true" />
                <h2 className="text-section-title text-page-foreground">
                  {copy.home.estoqueTitle}
                </h2>
              </div>
              <HomeEstoqueGrid
                key={JSON.stringify(listParams)}
                initialItems={initialItems}
                total={total}
                listParams={listParams}
              />
            </div>
          </section>
        )}
        <HomeTrustStrip />
      </div>
      {motoId && detailMoto ? (
        <Suspense fallback={null}>
          <MotoDetailModal moto={detailMoto} whatsappLinks={detailWhatsappLinks} />
        </Suspense>
      ) : null}
      {motoId && !detailMoto ? (
        <Suspense fallback={null}>
          <MotoDetailMissingModal motoId={motoId} />
        </Suspense>
      ) : null}
    </>
  );
};

export default HomePage;
