import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/estoque",
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
        hostname: "carimagesapi.com",
        pathname: "/image",
      },
      {
        protocol: "https",
        hostname: "cdn.carimagesapi.com",
      },
    ],
  },
};

export default nextConfig;
