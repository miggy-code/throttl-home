import { createReadStream, existsSync, statSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import path from "path";
import type { IncomingMessage, ServerResponse } from "http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "../dist/public");

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const reqPath = req.url?.split("?")[0] || "/";
  const filePath = join(publicDir, reqPath === "/" ? "index.html" : reqPath);

  try {
    if (existsSync(filePath) && statSync(filePath).isFile()) {
      res.setHeader("Content-Type", getContentType(filePath));
      createReadStream(filePath).pipe(res);
    } else {
      // Serve index.html for SPA routing
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      createReadStream(join(publicDir, "index.html")).pipe(res);
    }
  } catch (error) {
    console.error("Handler error:", error);
    res.status(500).end("Server error");
  }
}

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const types: Record<string, string> = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
  };
  return types[ext] || "application/octet-stream";
}
