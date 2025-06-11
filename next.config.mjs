/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['via.placeholder.com'],
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
