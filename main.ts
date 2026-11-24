import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Copies the one-line out-of-office reply into the output dir, untouched.
const dir = path.dirname(fileURLToPath(import.meta.url));
const text = fs.readFileSync(path.join(dir, "entry.txt"), "utf8").trim();
const lines = text.split("\n");
// The reply must stay a single short line, or the judge cannot read it.
if (lines.length !== 1 || text.length < 1 || text.length > 140) {
  console.error(`entry must be one line of 1-140 chars, got ${lines.length} line(s) and ${text.length} chars`);
  process.exit(1);
}
const out = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, "entry.txt"), text);
