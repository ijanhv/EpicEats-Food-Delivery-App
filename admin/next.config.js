/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com", "res.cloudinary.com"],
  },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],

  },
};

module.exports = nextConfig;
