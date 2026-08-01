import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { profile } from "@/data/profile";
import { asset } from "@/lib/asset";
import "./globals.css";

// Variable axes, not fixed weights: one file per family instead of five, which also
// stops the browser warning about preloaded-but-unused weight files.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://black-leg-nameko.github.io/portfolio";
const ogImage = {
  url: asset("/assets/og.png"),
  width: 1200,
  height: 630,
  alt: `${profile.name} — ${profile.role}`,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.description,
  authors: [{ name: profile.name, url: profile.links.github }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.description,
    type: "website",
    siteName: profile.name,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.description,
    images: [ogImage],
  },
  icons: {
    // app/icon.svg covers modern browsers; the .ico is the fallback for the rest
    icon: [
      { url: asset("/favicon.ico"), sizes: "48x48", type: "image/x-icon" },
      { url: asset("/icon.svg"), type: "image/svg+xml" },
    ],
    apple: asset("/apple-touch-icon.png"),
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full`}>
      {/* No navigation bar: every page is one column of text, so there is no repeated
          block to bypass and nothing for a skip link to skip. */}
      <body className="flex min-h-full flex-col bg-canvas">
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
