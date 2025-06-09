/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false, // Disable minification to prevent instanceof issues

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'talentra.io',
        pathname: '**',
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  productionBrowserSourceMaps: true,

  experimental: {
    serverActions: {
      allowedOrigins: ['talentra.io'],
      allowedForwardedHosts: ['talentra.io'],
    },
  },
};

module.exports = nextConfig;
