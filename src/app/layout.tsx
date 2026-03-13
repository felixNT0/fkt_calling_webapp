import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfdff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f1a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "FKT Calls | Premium Video Conferencing",
  description: "Experience crystal-clear video meetings with FKT Calls. Secure, high-performance virtual collaboration for teams worldwide.",
  keywords: ["video call", "meetings", "conferencing", "remote work", "collaboration", "fkt calls"],
  authors: [{ name: "Nexus Team" }],
  openGraph: {
    title: "FKT Calls | Next-Gen Video Meetings",
    description: "Seamless, crystal-clear video and audio for your professional and personal meetings.",
    url: "https://fkt-calls.app",
    siteName: "FKT Calls",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FKT Calls Premium Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FKT Calls | High-Quality Video Meetings",
    description: "Seamless, crystal-clear video and audio for your professional and personal meetings.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${inter.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
