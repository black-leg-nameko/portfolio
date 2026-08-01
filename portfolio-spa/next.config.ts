import type { NextConfig } from "next";

// GitHub Pages serves this site from /portfolio; Vercel serves it from the root.
// The Pages workflow sets NEXT_PUBLIC_BASE_PATH, everything else leaves it empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactCompiler: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
