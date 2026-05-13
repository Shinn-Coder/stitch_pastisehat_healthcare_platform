import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false, // Mematikan strict mode sangat membantu saat hackathon agar tidak double-render

  // Jika kamu butuh fitur gambar dari luar (seperti avatar Google)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;