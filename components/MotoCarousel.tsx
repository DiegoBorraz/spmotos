"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useSyncExternalStore } from "react";
import { MotoCarouselCard } from "@/components/MotoCarouselCard";
import { copy } from "@/lib/copy";
import { PublicMoto } from "@/lib/clickgarage/types";

interface MotoCarouselProps {
  motos: PublicMoto[];
}

interface CarouselArrowProps {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}

const CarouselArrow: React.FC<CarouselArrowProps> = ({ direction, disabled, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={direction === "prev" ? copy.carousel.prev : copy.carousel.next}
    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-stone bg-surface px-3 text-sm font-medium text-foreground hover:bg-muted focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40"
  >
    {direction === "prev" ? "←" : "→"}
  </button>
);

export const MotoCarousel: React.FC<MotoCarouselProps> = ({ motos }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: motos.length > 3,
  });

  const subscribe = useCallback(
    (onStoreChange: () => void): (() => void) => {
      if (!emblaApi) {
        return () => undefined;
      }
      emblaApi.on("select", onStoreChange);
      emblaApi.on("reInit", onStoreChange);
      return () => {
        emblaApi.off("select", onStoreChange);
        emblaApi.off("reInit", onStoreChange);
      };
    },
    [emblaApi],
  );

  const canScrollPrev = useSyncExternalStore(
    subscribe,
    () => emblaApi?.canScrollPrev() ?? false,
    () => false,
  );
  const canScrollNext = useSyncExternalStore(
    subscribe,
    () => emblaApi?.canScrollNext() ?? false,
    () => false,
  );

  const scrollPrev = useCallback((): void => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback((): void => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  if (motos.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end gap-2">
        <CarouselArrow direction="prev" disabled={!canScrollPrev} onClick={scrollPrev} />
        <CarouselArrow direction="next" disabled={!canScrollNext} onClick={scrollNext} />
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {motos.map((moto) => (
            <div
              key={moto.id}
              className="min-w-0 shrink-0 grow-0 basis-[80%] pr-4 sm:basis-1/2 lg:basis-1/3"
            >
              <MotoCarouselCard
                id={moto.id}
                marca={moto.marca}
                modelo={moto.modelo}
                anoModelo={moto.anoModelo}
                valorAnunciado={moto.valorAnunciado}
                imagemPrincipal={moto.imagemPrincipal}
                titulo={moto.titulo}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
