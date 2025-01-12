import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    buildActivity: false,
    // autoPrerender: false, // TO FIX: Key not recognized
  },
  experimental: {
    // disableNextDevTools: true, // TO FIX: Key not recognized
  },
};

export default nextConfig;