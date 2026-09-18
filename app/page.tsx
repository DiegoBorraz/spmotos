import type { Metadata } from "next";
import type { FC } from "react";
import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { EstoqueFilters } from "@/components/EstoqueFilters";
import { HomeHero } from "@/components/HomeHero";
import { HomeTrustStrip } from "@/components/HomeTrustStrip";
import { MotoGrid } from "@/components/MotoGrid";
import { listMarcas, listMotos } from "@/lib/clickgarage/repository";
import { copy } from "@/lib/copy";
import { parseEstoqueParams, QueryValueMap } from "@/lib/estoque-query";
import { HOME_RECENT_ORDER, pickHeroMoto } from "@/lib/home-hero";
import { buildWhatsAppHrefPlain } from "@/lib/whatsapp";

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
  const params = parseEstoqueParams(query, "estoque");
  const listParams = {
    ...params,
    ordenar: params.ordenar ?? HOME_RECENT_ORDER,
  };

  const [motosRecentesEstoque, motos, marcas] = await Promise.all([
    listMotos({ situacao: "estoque", ordenar: HOME_RECENT_ORDER }),
    listMotos(listParams),
    listMarcas(),
  ]);

  const whatsappHref = buildWhatsAppHrefPlain(`Olá! Quero falar com a ${copy.brand}.`);
  const heroMoto = pickHeroMoto(motosRecentesEstoque);
  const featured = motos.slice(0, 4);
  const rest = motos.slice(4);

  const busca = params.busca ?? "";
  const marca = params.marca ?? "";
  const valorMax = params.valorMax !== undefined ? String(params.valorMax) : "";

  return (
    <>
      <HomeHero heroMoto={heroMoto} />
      <div className="relative z-10 -mt-6 px-4 md:-mt-8 md:px-6">
        <EstoqueFilters marcas={marcas} busca={busca} marca={marca} valorMax={valorMax} />
      </div>
      <div className="bg-page">
        {motos.length === 0 ? (
          <section className="px-4 py-10 md:px-6">
            <EmptyState whatsappHref={whatsappHref} />
          </section>
        ) : (
          <>
            {featured.length > 0 ? (
              <section id="estoque" className="scroll-mt-24 px-4 py-10 md:px-6 md:py-12">
                <div className="mx-auto flex max-w-6xl flex-col gap-6">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="h-8 w-1 rounded-full bg-accent" aria-hidden="true" />
                      <h2 className="text-xl font-bold text-page-foreground md:text-2xl">
                        {copy.home.highlights}
                      </h2>
                    </div>
                    {rest.length > 0 ? (
                      <Link
                        href="#estoque-completo"
                        className="text-sm font-semibold text-moss hover:text-page-foreground"
                      >
                        {copy.home.seeAll}
                      </Link>
                    ) : null}
                  </div>
                  <MotoGrid motos={featured} />
                </div>
              </section>
            ) : null}
            {rest.length > 0 ? (
              <section
                id="estoque-completo"
                className="scroll-mt-24 px-4 pb-12 md:px-6 md:pb-16"
              >
                <div className="mx-auto flex max-w-6xl flex-col gap-6">
                  <h2 className="text-xl font-bold text-page-foreground md:text-2xl">
                    {copy.home.all}
                  </h2>
                  <MotoGrid motos={rest} />
                </div>
              </section>
            ) : null}
          </>
        )}
        <HomeTrustStrip />
      </div>
    </>
  );
};

export default HomePage;
