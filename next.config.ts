import type { NextConfig } from "next";

const securityHeaders = [
  // Prevents clickjacking — stops your site being embedded in an iframe on another domain
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Stops browsers from guessing file types (MIME sniffing attacks)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Forces HTTPS for 1 year once deployed (browsers won't allow plain HTTP)
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  // Controls how much referrer info is sent when clicking links
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restricts browser features (camera, microphone, etc.) — none needed for this site
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
