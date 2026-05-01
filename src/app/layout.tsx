import type { Metadata } from "next";

import { QueryProvider } from "@/components/providers";
import { TooltipProvider } from "@/components/shared/tooltip";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawalFont = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Dhaman Dashboard",
  description: "Architecture scaffold for the Dhaman dashboard application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className="h-full antialiased"
    >
      <body className={`flex min-h-full flex-col text-start ${tajawalFont.className}`}>
        <QueryProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
