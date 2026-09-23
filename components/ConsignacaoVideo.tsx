"use client";

import { CONSIGNACAO_VIDEO_MP4, CONSIGNACAO_VIDEO_POSTER } from "@/lib/venda-video";

interface ConsignacaoVideoProps {
  ariaLabel: string;
  fallbackText: string;
}

export const ConsignacaoVideo: React.FC<ConsignacaoVideoProps> = ({
  ariaLabel,
  fallbackText,
}) => (
  <div className="mx-auto flex aspect-[9/16] w-full max-h-[min(70vh,640px)] max-w-[min(100%,20rem)] flex-col gap-2">
    <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-stone bg-chrome">
      <video
        className="h-full w-full object-contain"
        controls
        playsInline
        preload="none"
        poster={CONSIGNACAO_VIDEO_POSTER}
        aria-label={ariaLabel}
      >
      <source src={CONSIGNACAO_VIDEO_MP4} type="video/mp4" />
        {fallbackText}
      </video>
    </div>
  </div>
);
