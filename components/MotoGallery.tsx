"use client";

import Image from "next/image";
import { useState } from "react";

interface MotoGalleryProps {
  titulo: string;
  imagemPrincipal: string | null;
  galeria: string[];
}

export const MotoGallery: React.FC<MotoGalleryProps> = ({
  titulo,
  imagemPrincipal,
  galeria,
}) => {
  const photos = [imagemPrincipal, ...galeria].filter((photo): photo is string => Boolean(photo));
  const uniquePhotos = [...new Set(photos)];
  const [current, setCurrent] = useState<string>(uniquePhotos[0] ?? "");

  if (!current) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-stone bg-muted text-moss">
        Sem foto
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-stone bg-muted">
        <Image
          src={current}
          alt={titulo}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      {uniquePhotos.length > 1 ? (
        <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
          {uniquePhotos.map((photo) => (
            <button
              key={photo}
              type="button"
              onClick={() => setCurrent(photo)}
              className={`relative aspect-square min-h-[44px] min-w-[4.5rem] shrink-0 snap-start overflow-hidden rounded-lg border focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none md:min-w-0 ${
                photo === current ? "border-coral" : "border-stone"
              }`}
            >
              <Image src={photo} alt={titulo} fill className="object-cover" sizes="120px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
