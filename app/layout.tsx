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
  const cookieStore = cookies();
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