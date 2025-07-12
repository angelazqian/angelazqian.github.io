import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === 'production';
const repo = 'angelazqian.github.io';
module.exports = {
  output: 'export',
  basePath: isProd ? '/' + repo : '',
  assetPrefix: isProd ? '/' + repo + '/' : '',
};
const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'export',
  basePath: isProd ? '/' + repo : '',
  assetPrefix: isProd ? '/' + repo + '/' : '',
};

export default nextConfig;
