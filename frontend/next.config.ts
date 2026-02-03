import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   turbopack: {
    root: __dirname, // Sets the project root to the directory of next.config.js
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
