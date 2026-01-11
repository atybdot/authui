import type { Metadata } from "next";

import { Geist_Mono, Manrope } from "next/font/google";
import Providers from "@/components/providers";
import "@/styles/index.css";
import "@formatjs/intl-relativetimeformat/locale-data/en";
import "@formatjs/intl-relativetimeformat/polyfill.js";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const manrope = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://authui.atyb.me"),
  title: {
    default: "authui - Customizable Authentication UI Components",
    template: "%s | authui",
  },
  description:
    "Beautiful, customizable authentication UI components for modern web applications. Built with React, TypeScript, and Tailwind CSS.",
  keywords: [
    "authentication",
    "ui components",
    "react components",
    "tailwind css",
    "login form",
    "signup form",
    "auth ui",
    "react authentication",
    "shadcn",
    "shadcn components",
    "blocks",
    "shadcn blocks",
  ],
  authors: [{ name: "atyb", url: "https://atyb.me" }],
  creator: "atyb",
  publisher: "atyb",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://authui.atyb.me",
    title: "authui - Customizable Authentication UI Components",
    description:
      "Beautiful, customizable authentication UI components for modern web applications.",
    siteName: "authui",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "authui - Authentication UI Components",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "authui - Customizable Authentication UI Components",
    description:
      "Beautiful, customizable authentication UI components for modern web applications.",
    creator: "@atybdot",
    images: ["/og.png"],
  },
  verification: {
    google: "1hn6VXFO5drXZwZTUtmDak8gLgIfNlmEPUw1X9UbGyw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${manrope.variable} ${geistMono.variable} antialiased relative`}>
        <Providers>
          <div className="absolute inset-0 pointer-events-none">
            <DotPattern
              glow={true}
              className={cn(
                "mask-[radial-gradient(500px_circle_at_top,var(--color-zinc-900),transparent)] md:mask-[radial-gradient(600px_circle_at_top,white,transparent)] z-0!",
              )}
            />
          </div>
          <Navbar />
          <main className="grid grid-rows-[1fr_auto] min-h-svh max-w-3xl mx-auto z-200!">
            <section>{children}</section>
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
