import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TijaratPro — ERP Dashboard",
    template: "%s | TijaratPro",
  },
  description:
    "TijaratPro is a production-grade multi-tenant ERP system for retail and wholesale businesses.",
  keywords: ["ERP", "POS", "inventory", "sales", "TijaratPro"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}