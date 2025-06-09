/** @type {import('next').NextConfig} */
const nextConfig = {
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

  webpack(config) {
    // Apply Babel to @slosarek/docxtemplater-image-module-free to bypass SWC issues
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/@slosarek\/docxtemplater-image-module-free/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;
