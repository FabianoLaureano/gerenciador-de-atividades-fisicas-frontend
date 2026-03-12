import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.ufs.sh",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3333",
      },
      {
        protocol: "https",
        hostname: "gerenciador-de-atividades-fisicas-a.vercel.app",
      },
    ],
    dangerouslyAllowSVG: false,
    unoptimized: process.env.NODE_ENV === "development",
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `https://gerenciador-de-atividades-fisicas-a.vercel.app/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
