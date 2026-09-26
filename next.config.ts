import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Celular na rede local / 127.0.0.1: sem isso o dev bloqueia JS client e o menu não abre. */
  allowedDevOrigins: ["127.0.0.1", "192.168.8.142"],
  async redirects() {
    return [
      {
        source: "/estoque",
        destination: "/",
        permanent: true,
      },
      {
        source: "/vendidas",
        destination: "/",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.clickgarage.com.br",
      },
      {
        protocol: "https",
        hostname: "clickgarage-prod.s3.us-west-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
