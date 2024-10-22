/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    forceSwcTransforms: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/musicList",
        destination: "https://apis.naver.com/vibeWeb/musicapiweb/vibe/v1/chart/track/total?start=1&display=100"
      },
      {
        source: "/api/musicLyric/:id",
        destination: "https://apis.naver.com/vibeWeb/musicapiweb/vibe/v4/lyric/:id"
      },
    ]
  }
};

export default nextConfig;
