import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        port: '',
        pathname: '/Route-Academy-**/**',
        search: '',
      },
    ],
  },

  eslint: {
    // ده هيخلي Vercel ما يوقفش الـ build بسبب أخطاء ESLint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ده هيخلي Vercel ما يوقفش الـ build بسبب أخطاء TypeScript
    ignoreBuildErrors: true,
  },
};
export default nextConfig;
