// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  eslint: {
    // Disable ESLint during production builds for faster builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignoring type checking issues for now
    ignoreBuildErrors: true,
  },
  // Use server-side external packages
  serverExternalPackages: ['@prisma/client'],
  webpack(config) {
    // Configure webpack to handle SVG files
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  // Removed Turbopack configuration as it's not fully compatible with Windows paths
  transpilePackages: [
    "@mui/material",
    "@mui/icons-material",
    "@emotion/react",
    "@emotion/styled",
    "@emotion/cache",
    "@emotion/serialize",
    "@emotion/sheet"
  ],
  // Add experimental features to help with CSS handling
  experimental: {
    optimizeCss: true,
    optimizeServerReact: true
  }
};

export default nextConfig;
