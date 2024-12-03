/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: true,
  // Specify the environment variable as a runtime configuration
  env: {
    MONGODB_URI: process.env.MONGODB_URI, // Ensure runtime access
  },



};

export default nextConfig;
