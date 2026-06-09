import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "crealtivadigital.com",
      },
    ],
  },
};

export default nextConfig;
