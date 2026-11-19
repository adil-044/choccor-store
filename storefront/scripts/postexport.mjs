import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "out");
if (!existsSync(outDir)) {
  console.warn("postexport: out/ missing — skip .nojekyll");
  process.exit(0);
}

writeFileSync(join(outDir, ".nojekyll"), "");
console.log("Wrote out/.nojekyll");
