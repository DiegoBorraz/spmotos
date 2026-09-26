import Image from "next/image";
import { WhatsAppContactButtons } from "@/components/WhatsAppContactButtons";
import { brandAssets } from "@/lib/brand";
import { copy } from "@/lib/copy";
import { WhatsAppContactLink } from "@/lib/store-whatsapp";

interface SiteFooterProps {
  whatsappLinks: WhatsAppContactLink[];
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ whatsappLinks }) => (
  <footer className="mt-auto border-t border-chrome-border bg-chrome text-chrome-foreground">
    <div className="site-container flex flex-col gap-6 py-6 md:py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
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
        <div className="w-full min-w-0 sm:max-w-md">
          <WhatsAppContactButtons
            links={whatsappLinks}
            action="negotiate"
            surface="chrome"
          />
        </div>
      </div>
    </div>
  </footer>
);
