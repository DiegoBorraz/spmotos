import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";

interface MotoCarouselCardProps {
  id: number;
  marca: string;
  modelo: string;
  anoModelo: number;
  valorAnunciado: number;
  imagemPrincipal: string | null;
  titulo: string;
}

export const MotoCarouselCard: React.FC<MotoCarouselCardProps> = ({
  id,
  marca,
  modelo,
  anoModelo,
  valorAnunciado,
  imagemPrincipal,
  titulo,
}) => (
  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone bg-surface">
    <Link href={`/motos/${id}`} className="relative block aspect-[4/3] bg-stone">
      {imagemPrincipal ? (
        <Image
          src={imagemPrincipal}
          alt={titulo}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 30vw"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-moss">
          Sem foto
        </div>
      )}
    </Link>
    <div className="flex flex-1 flex-col gap-1 p-3 md:p-4">
      <p className="text-sm text-moss">{marca}</p>
      <Link
        href={`/motos/${id}`}
        className="line-clamp-2 text-lg font-semibold text-foreground hover:text-moss"
      >
        {modelo}
      </Link>
      <p className="text-sm text-moss">{anoModelo}</p>
      <p className="text-price-fluid mt-auto pt-2 font-bold text-sale">{formatPrice(valorAnunciado)}</p>
    </div>
  </article>
);
