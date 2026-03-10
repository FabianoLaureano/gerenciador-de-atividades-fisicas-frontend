import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.ufs.sh",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `https://gerenciador-de-atividades-fisicas-a.vercel.app/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
