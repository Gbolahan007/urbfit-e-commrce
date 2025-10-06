/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qhpaeudwolpmkcyhzlmm.supabase.co",
        port: "",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "quuyxcrwetravuewswgm.supabase.co",
        port: "",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
