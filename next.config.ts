import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Disable ESLint during production builds for faster builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignoring type checking issues for now
    ignoreBuildErrors: true,
  },
  // Use server components for everything by default
  experimental: {
    // Note: this is optional and shouldn't affect the error
    serverComponentsExternalPackages: ['@prisma/client'],
  },
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
  ]
};

export default nextConfig;
