/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
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
