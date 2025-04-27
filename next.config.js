/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "storage.googleapis.com" },
      { hostname: "talentra.io" },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  productionBrowserSourceMaps: true,
  experimental: {
    serverActions: {
      allowedForwardedHosts: ["talentra.io"],
      allowedOrigins: ["talentra.io"],
    },
  },
};

module.exports = nextConfig;
