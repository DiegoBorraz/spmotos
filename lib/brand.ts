import type { StaticImageData } from "next/image";
import logoSpMotos from "../public/logo-spmotos.png";

interface BrandAssets {
  logo: StaticImageData;
}

export const brandAssets: BrandAssets = {
  logo: logoSpMotos,
};
