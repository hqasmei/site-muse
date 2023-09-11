/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['utfs.io'],
  },
};

module.exports = nextConfig;
