import { readFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import path from "path";
import type { IncomingMessage, ServerResponse } from "http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "../dist/public");

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    // Serve index.html for all requests (SPA routing)
    // Vercel handles static files automatically via publicDirectory
    const indexPath = join(publicDir, "index.html");
    const html = readFileSync(indexPath, "utf-8");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(html);
  } catch (error) {
    console.error("Handler error:", error);
    res.status(500).end("Server error");
  }
}
