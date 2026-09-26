/** Largura alinhada ao `sizes` da foto principal da galeria (~768px no desktop). */
const GALLERY_MAIN_PRELOAD_WIDTH = 828;

export const buildNextImagePreloadUrl = (src: string): string =>
  `/_next/image?url=${encodeURIComponent(src)}&w=${GALLERY_MAIN_PRELOAD_WIDTH}&q=75`;

export const preloadGalleryPhoto = (src: string): void => {
  if (typeof window === "undefined") {
    return;
  }
  const img = new window.Image();
  img.decoding = "async";
  img.src = buildNextImagePreloadUrl(src);
};
