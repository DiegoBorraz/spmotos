import fs from "node:fs";
import { siteFeedResponseSchema } from "../lib/clickgarage/site-feed/schema";

const path = process.argv[2] ?? "exemplo.json";
const raw = fs.readFileSync(path, "utf8");
const json: unknown = JSON.parse(raw);
const result = siteFeedResponseSchema.safeParse(json);

if (result.success) {
  console.log(`OK — ${result.data.length} itens (${path})`);
  process.exit(0);
}

console.error(`Falha Zod (${path}):`);
for (const issue of result.error.issues) {
  console.error(`  [${issue.path.join(".")}] ${issue.message} (${issue.code})`);
}
process.exit(1);
