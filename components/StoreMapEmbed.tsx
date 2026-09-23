import Link from "next/link";
import { copy } from "@/lib/copy";
import { buildOsmEmbedUrl, buildOsmFullMapUrl } from "@/lib/store-location";

export const StoreMapEmbed: React.FC = () => {
  const embedUrl = buildOsmEmbedUrl();
  const fullMapUrl = buildOsmFullMapUrl();

  return (
    <div className="flex flex-col gap-2">
      <iframe
        title={copy.contato.mapIframeTitle}
        src={embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="min-h-[280px] w-full rounded-xl border border-stone sm:min-h-[320px] lg:min-h-[360px]"
      />
      <Link
        href={fullMapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-semibold text-foreground underline-offset-2 hover:underline"
      >
        {copy.contato.openMapLabel}
      </Link>
    </div>
  );
};
