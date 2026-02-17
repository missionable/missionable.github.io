import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/missionable",
  images: { unoptimized: true },
};

export default nextConfig;
