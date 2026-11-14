import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cacheComponents (and partialPrefetching, which needs it) is off: on Workers it hangs every request
  // because the runtime's setTimeout doesn't behave the way Cache Components expects.
  // Workers can't run Next's built-in image optimiser without a Cloudflare Images binding. Images in
  // public/images are already resized and compressed by `pnpm images`, so serve them as-is for now.
  // TODO before launch: switch to Cloudflare Images for AVIF/WebP and per-device sizes.
  images: { unoptimized: true },
  // Pages that aren't built yet show a "Coming soon" page. Remove each line once its page exists.
  // Temporary (307) so browsers don't remember them.
  async redirects() {
    return ["/cakes", "/cakes/:path*", "/cupcakes", "/custom-cakes", "/cart", "/privacy"].map(
      (source) => ({ source, destination: "/coming-soon", permanent: false }),
    );
  },
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

// Gives `next dev` the same Cloudflare bindings (local D1) and .dev.vars secrets as the deployed Worker.
initOpenNextCloudflareForDev();
