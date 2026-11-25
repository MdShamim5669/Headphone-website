import type { Metadata, Viewport } from "next";
import { Inter, Kaushan_Script } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import Cursor from "@/components/layout/Cursor";
import ThemeSync from "@/components/layout/ThemeSync";
import CookieBanner from "@/components/layout/CookieBanner";
import { SITE } from "@/lib/products";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const script = Kaushan_Script({ subsets: ["latin"], weight: "400", variable: "--font-script", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "SONIQ — 3D Headphone Store", template: "%s | SONIQ" },
  description: "Premium wireless headphones you can spin, zoom and explore in 3D. Free shipping over $150.",
  openGraph: { type: "website", siteName: "SONIQ" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};
export const viewport: Viewport = { themeColor: "#03140f", width: "device-width", initialScale: 1 };

const orgLd = { "@context": "https://schema.org", "@type": "Organization", name: "SONIQ", url: SITE.url, logo: `${SITE.url}/logo.svg` };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${script.variable}`}>
      <body className="font-sans antialiased has-cursor">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] btn btn-accent">Skip to content</a>
        <ThemeSync />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <CartDrawer />
        <Cursor />
        <CookieBanner />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </body>
    </html>
  );
}
