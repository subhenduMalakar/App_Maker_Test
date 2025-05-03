/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: false,
  },
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
