import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/enablement", destination: "/transformation", permanent: true },
    ];
  },
};

export default nextConfig;
