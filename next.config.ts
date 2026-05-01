import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // AR: يحافظ هذا التحويل على casing رابط البريد payment-History مع مسار الملفات المتاح على ويندوز.
      // EN: This rewrite preserves the payment-History email URL casing while mapping to the available Windows filesystem route.
      {
        source: "/portal/:token/payment-History",
        destination: "/portal/:token/payment-history",
      },
    ];
  },
};

export default nextConfig;
