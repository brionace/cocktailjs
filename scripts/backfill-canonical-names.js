#!/usr/bin/env node
import { query } from "../src/db/client.js";
import { normalizeRecipeName } from "../src/services/ingredientNormalizer.js";

async function run() {
  console.log("Starting backfill of canonical names (ai_cache)...");
  const batchSize = 50;
  const res = await query("SELECT id, result FROM ai_cache WHERE endpoint=$1", [
    "recipes",
  ]);
  const rows = res.rows || [];
  console.log(`Found ${rows.length} cache rows`);
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    for (const r of batch) {
      const id = r.id;
      const payload = r.result || {};
      if (!payload || !Array.isArray(payload.recipes)) continue;
      let modified = false;
      for (const rec of payload.recipes) {
        try {
          const can = normalizeRecipeName(rec.name || rec.title || "");
          if (rec.canonicalName !== can) {
            rec.canonicalName = can;
            modified = true;
          }
        } catch (e) {
          // best-effort: lowercase fallback
          const can = String(rec.name || rec.title || "").toLowerCase();
          if (rec.canonicalName !== can) {
            rec.canonicalName = can;
            modified = true;
          }
        }
      }
      if (modified) {
        try {
          await query("UPDATE ai_cache SET result=$1 WHERE id=$2", [
            payload,
            id,
          ]);
          console.log(`Updated row ${id}`);
        } catch (e) {
          console.error(`Failed to update row ${id}:`, e.message || e);
        }
      }
    }
  }
  console.log("Backfill complete");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
