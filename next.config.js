/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "storage.googleapis.com" },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
