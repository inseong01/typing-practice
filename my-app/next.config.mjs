/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    forceSwcTransforms: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
