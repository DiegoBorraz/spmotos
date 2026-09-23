import type { StaticImageData } from "next/image";
import logoFavicon from "../public/logo-spmotos-favicon.webp";
import logoSpMotos from "../public/logo-spmotos.webp";

interface BrandAssets {
  logo: StaticImageData;
  favicon: StaticImageData;
}

export const brandAssets: BrandAssets = {
  logo: logoSpMotos,
  favicon: logoFavicon,
};
