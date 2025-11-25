import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {}, // 👈 This removes the Turbopack warning

  webpack: (config) => {
    config.module.rules.push({
      test: /\.ts$/,
      include: /public\/videos\/hls/,
      type: "asset/resource",
    });

    return config;
  },
};

export default nextConfig;
