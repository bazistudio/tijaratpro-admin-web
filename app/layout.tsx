import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { cookies } from "next/headers";
import { I18nProvider } from "@/providers/I18nProvider";
import { defaultLocale, localeDirections, Locale } from "@/lib/i18n/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TijaratPro — Enterprise ERP & POS Solutions",
    template: "%s | TijaratPro",
  },
  description:
    "TijaratPro is a production-grade multi-tenant ERP system for retail and wholesale businesses. Streamline your inventory, sales, and analytics.",
  keywords: ["ERP", "POS", "inventory", "sales", "TijaratPro", "SaaS", "multi-tenant"],
  authors: [{ name: "TijaratPro Team" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tijaratpro.com",
    siteName: "TijaratPro",
    title: "TijaratPro — Powering Your Business Growth",
    description: "Modern ERP and POS platform for retail excellence.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TijaratPro Dashboard Preview",
      },
    ],
  },
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || defaultLocale;
  const dir = localeDirections[locale] || 'ltr';

  return (
    <html lang={locale} dir={dir} className={inter.variable} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased min-h-screen">
        <I18nProvider initialLocale={locale}>
          <Providers>
            {children}
          </Providers>
        </I18nProvider>
      </body>
    </html>
  );
}