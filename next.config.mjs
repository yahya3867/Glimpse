/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90, 100],
  },
  // Suppress hydration warnings caused by browser extensions
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /node_modules/ },
    ];
    return config;
  },
};

export default nextConfig;
