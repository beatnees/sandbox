import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/sandbox",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
