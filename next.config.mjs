/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  outputFileTracingIncludes: {
    "/": ["./content/**/*"],
    "/story/[slug]": ["./content/**/*"],
    "/topic/[tag]": ["./content/**/*"]
  }
};

export default nextConfig;
