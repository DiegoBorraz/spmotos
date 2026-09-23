import Image from "next/image";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { brandAssets } from "@/lib/brand";
import { copy } from "@/lib/copy";

interface SiteFooterProps {
  whatsappHref: string;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ whatsappHref }) => (
  <footer className="mt-auto border-t border-chrome-border bg-chrome text-chrome-foreground">
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between md:px-6 md:py-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <Image
          src={brandAssets.logo}
          alt={copy.brand}
          className="h-12 w-auto object-contain object-left sm:h-14"
        />
        <div className="flex flex-col gap-0.5 text-sm text-chrome-muted">
          <p>{copy.contato.address}</p>
          <p>{copy.footer}</p>
        </div>
      </div>
      <WhatsAppButton href={whatsappHref} label={copy.whatsapp} />
    </div>
  </footer>
);
