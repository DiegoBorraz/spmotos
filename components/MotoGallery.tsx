"use client";

import Image from "next/image";
import { useState } from "react";
import { copy } from "@/lib/copy";

interface MotoGalleryProps {
  titulo: string;
  imagemPrincipal: string | null;
  galeria: string[];
}

const buildPhotoAlt = (titulo: string, index: number, total: number): string =>
  total <= 1 ? titulo : `${titulo} — foto ${index + 1} de ${total}`;

export const MotoGallery: React.FC<MotoGalleryProps> = ({
  titulo,
  imagemPrincipal,
  galeria,
}) => {
  const photos = [imagemPrincipal, ...galeria].filter((photo): photo is string => Boolean(photo));
  const uniquePhotos = [...new Set(photos)];
  const [current, setCurrent] = useState<string>(uniquePhotos[0] ?? "");
  const totalPhotos = uniquePhotos.length;

  if (!current) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-stone bg-muted text-moss">
        {copy.card.noPhoto}
      </div>
    );
  }

  const currentIndex = Math.max(0, uniquePhotos.indexOf(current));

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-stone bg-muted">
        <Image
          src={current}
          alt={buildPhotoAlt(titulo, currentIndex, totalPhotos)}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
      {uniquePhotos.length > 1 ? (
        <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
          {uniquePhotos.map((photo, index) => (
            <button
              key={photo}
              type="button"
              onClick={() => setCurrent(photo)}
              aria-label={buildPhotoAlt(titulo, index, totalPhotos)}
              aria-current={photo === current ? "true" : undefined}
              className={`relative aspect-square min-h-[44px] min-w-[4.5rem] shrink-0 snap-start overflow-hidden rounded-lg border focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none md:min-w-0 ${
                photo === current ? "border-coral" : "border-stone"
              }`}
            >
              <Image
                src={photo}
                alt=""
                fill
                className="object-cover"
                sizes="120px"
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
