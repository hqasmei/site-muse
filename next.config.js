// next.config.js
const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['utfs.io', 'res.cloudinary.com'],
  },
};

module.exports = withContentlayer(nextConfig);
