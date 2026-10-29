import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cacheComponents (and partialPrefetching, which needs it) is off: on Workers it hangs every request
  // because the runtime's setTimeout doesn't behave the way Cache Components expects.
  // Workers can't run Next's built-in image optimiser without a Cloudflare Images binding. Images in
  // public/images are already resized and compressed by `pnpm images`, so serve them as-is for now.
  // TODO before launch: switch to Cloudflare Images for AVIF/WebP and per-device sizes.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
