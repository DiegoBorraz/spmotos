import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

const INPUT = path.join(rootDir, "public/banner.jpeg");
const OUTPUT = path.join(rootDir, "public/banner.webp");

const run = async () => {
  if (!existsSync(INPUT)) {
    throw new Error(`Arquivo de origem não encontrado: ${INPUT}`);
  }

  await sharp(INPUT).webp({ quality: 85, effort: 5 }).toFile(OUTPUT);
  const meta = await sharp(OUTPUT).metadata();
  console.log(`Gerado: ${OUTPUT} (${meta.width}×${meta.height})`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
