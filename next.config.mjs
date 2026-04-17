/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  outputFileTracingIncludes: {
    "/": ["./content/**/*"],
    "/story/[slug]": ["./content/**/*"],
    "/topic/[tag]": ["./content/**/*"]
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }
    ]
  }
};

export default nextConfig;
