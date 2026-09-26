import { MotoGallery } from "@/components/MotoGallery";
import { MotoSpecs } from "@/components/MotoSpecs";
import { WhatsAppContactButtons } from "@/components/WhatsAppContactButtons";
import { PublicMoto } from "@/lib/clickgarage/types";
import { copy } from "@/lib/copy";
import { formatPrice } from "@/lib/format";
import { WhatsAppContactLink } from "@/lib/store-whatsapp";

interface MotoDetailViewProps {
  moto: PublicMoto;
  whatsappLinks: WhatsAppContactLink[];
  titleId?: string;
  galleryKeyboardRootRef?: React.RefObject<HTMLElement | null>;
}

export const MotoDetailView: React.FC<MotoDetailViewProps> = ({
  moto,
  whatsappLinks,
  titleId,
  galleryKeyboardRootRef,
}) => (
  <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10 2xl:gap-14">
    <div className="min-w-0">
      <MotoGallery
        titulo={moto.titulo}
        imagemPrincipal={moto.imagemPrincipal}
        galeria={moto.galeria}
        keyboardRootRef={galleryKeyboardRootRef}
      />
    </div>
    <div className="flex min-w-0 flex-col gap-4 md:gap-5">
      <p className="text-sm text-moss">
        {moto.marca} · {moto.modelo}
      </p>
      <h1
        id={titleId}
        className="text-display text-pretty break-words font-bold text-foreground"
      >
        {moto.titulo}
      </h1>
      <p className="text-price-fluid font-semibold text-sale">
        {formatPrice(moto.valorAnunciado)}
      </p>
      <MotoSpecs moto={moto} />
      {moto.acessorios.length > 0 ? (
        <section className="min-w-0">
          <h2 className="text-section-title mb-2 text-foreground">{copy.detail.accessories}</h2>
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
        <section className="min-w-0">
          <h2 className="text-section-title mb-2 text-foreground">{copy.detail.notes}</h2>
          <p className="max-w-prose text-pretty break-words whitespace-pre-line text-moss">
            {moto.observacoes}
          </p>
        </section>
      ) : null}
      <div className="pt-2">
        <WhatsAppContactButtons links={whatsappLinks} action="negotiate" />
      </div>
    </div>
  </div>
);
