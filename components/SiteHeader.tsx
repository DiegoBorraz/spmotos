import { Suspense } from "react";
import { HeaderContactBar } from "@/components/HeaderContactBar";
import { HeaderFrame } from "@/components/HeaderFrame";
import { HeaderNav } from "@/components/HeaderNav";
import { HeaderSearch } from "@/components/HeaderSearch";
import { copy } from "@/lib/copy";
import { buildWhatsAppHrefPlain } from "@/lib/whatsapp";

const HeaderSearchFallback: React.FC = () => (
  <div className="hidden h-11 w-full max-w-xs rounded-full border border-chrome-border lg:block" />
);

export const SiteHeader: React.FC = () => {
  const whatsappHref = buildWhatsAppHrefPlain(`Olá! Quero falar com a ${copy.brand}.`);

  return (
  <HeaderFrame>
    <HeaderContactBar whatsappHref={whatsappHref} />
    <div className="mx-auto flex max-w-6xl flex-col gap-2 overflow-visible px-4 py-2 lg:flex-row lg:items-center lg:gap-6 lg:px-6 lg:py-3">
      <HeaderNav />
      <div className="hidden w-full items-center justify-end lg:flex lg:w-auto lg:shrink-0">
        <Suspense fallback={<HeaderSearchFallback />}>
          <HeaderSearch />
        </Suspense>
      </div>
    </div>
  </HeaderFrame>
  );
};
