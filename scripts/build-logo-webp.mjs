/**
 * Converte public/spmotos-logonovo.jpeg → public/logo-spmotos.webp
 * (Coloque o JPEG master em public/ antes de rodar npm run logo:webp.)
 * Remove o xadrez (cinzas baixa saturação) e preserva o logo branco.
 * Ajuste CHROMA_MAX / LUMA_MIN / LUMA_MAX se sobrar halo ou comer borda do logo.
 */
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

const INPUT = path.join(rootDir, "public/spmotos-logonovo.jpeg");
const OUTPUT = path.join(rootDir, "public/logo-spmotos.webp");
const FAVICON_OUTPUT = path.join(rootDir, "public/logo-spmotos-favicon.webp");

/** Diferença máxima R/G/B para considerar pixel “cinza” (xadrez). */
const CHROMA_MAX = 36;
/** Faixa de luminância do fundo xadrez (exclui branco do logo ~245+). */
const LUMA_MIN = 52;
const LUMA_MAX = 220;

const luma = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b;

const isCheckerBackground = (r, g, b) => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const chroma = max - min;
  const y = luma(r, g, b);
  return chroma <= CHROMA_MAX && y >= LUMA_MIN && y <= LUMA_MAX;
};

const makeTransparentLogo = async (inputPath) => {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (isCheckerBackground(r, g, b)) {
      data[i + 3] = 0;
    }
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png();
};

const run = async () => {
  if (!existsSync(INPUT)) {
    throw new Error(`Arquivo de origem não encontrado: ${INPUT}`);
  }

  const rgbaPipeline = await makeTransparentLogo(INPUT);

  await rgbaPipeline
    .webp({ quality: 86, effort: 5, alphaQuality: 90 })
    .toFile(OUTPUT);

  const chrome = { r: 11, g: 13, b: 12, alpha: 255 };

  await sharp(OUTPUT)
    .resize(32, 32, { fit: "contain", background: chrome })
    .webp({ quality: 90, effort: 4 })
    .toFile(FAVICON_OUTPUT);

  const mainStats = await sharp(OUTPUT).metadata();
  console.log(`Gerado: ${OUTPUT} (${mainStats.width}×${mainStats.height})`);
  console.log(`Gerado: ${FAVICON_OUTPUT} (32×32, fundo chrome para aba clara)`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
