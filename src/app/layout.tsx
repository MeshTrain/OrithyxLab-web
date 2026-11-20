import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#08090B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Distributed Heterogeneous AI Compute Infrastructure`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI infrastructure",
    "distributed computing",
    "heterogeneous computing",
    "workload orchestration",
    "distributed AI training",
    "hardware-aware scheduling",
    "compute clustering",
    "inter-device synchronization",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
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
  alternates: {
    canonical: siteConfig.canonicalUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} — Distributed Heterogeneous AI Compute Infrastructure`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/brandmark.svg",
        width: 1200,
        height: 630,
        alt: "ORITHYX LAB — Heterogeneous Compute Topology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Distributed Heterogeneous AI Compute Infrastructure`,
    description: siteConfig.description,
    images: ["/brandmark.svg"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/brandmark.svg", type: "image/svg+xml" },
    ],
    apple: "/brandmark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.contactEmail,
    description: siteConfig.description,
    knowsAbout: [
      "Distributed Computing",
      "Heterogeneous Hardware Orchestration",
      "AI Infrastructure",
      "Model Parallelism & Distributed Inference",
      "Hardware-Aware Scheduling",
    ],
    developmentStage: "Early-Stage Prototype (Local Cluster)",
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased selection:bg-[#b8ff2e]/20 selection:text-white`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#08090B] text-[#F4F4F0] font-sans antialiased flex flex-col relative overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
