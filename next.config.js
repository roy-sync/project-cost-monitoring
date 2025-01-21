/** @type {import('next').NextConfig} */
const nextConfig = {
  // next.config.js
  env: {
    // API_BASE_URL: "http://206.189.147.71:10100/api/", // Replace with your Laravel API base URL
    // API_BASE_URL: `${process.env.NEXTAUTH_URL}`,
    API_BASE_URL: `http://206.189.147.71:54030/`,
    AUTH_TOKEN: `${process.env.NEXTAUTH_SECRET}`,
  },

  // staticPageGenerationTimeout: 200,
};

module.exports = nextConfig;
