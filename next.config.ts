import type { NextConfig } from "next";
const repo = 'angelazqian.github.io';
module.exports = {
  output: 'export',
  basePath: '/' + repo,
  assetPrefix: '/' + repo + '/',
};
const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
