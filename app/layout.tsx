import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "./Components/SmoothScrollProvider";
import Navbar from "./Components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://webcrestllc.com";
const siteTitle = "Webcrest — Web Development Agency";
const siteDescription =
  "Webcrest is a web development agency based in Karachi, Pakistan. We build high-performance websites, SaaS platforms, and digital products using Next.js, React, and modern engineering. Working with clients globally.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Webcrest",
  },
  description: siteDescription,
  authors: [{ name: "Webcrest", url: siteUrl }],
  keywords: [
    "web development agency",
    "Next.js development",
    "React development",
    "SaaS development",
    "web design agency",
    "digital agency Pakistan",
    "web development Karachi",
    "custom web applications",
    "e-commerce development",
    "mobile app development",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Webcrest",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/Webcrest-logo.png",
        width: 1200,
        height: 630,
        alt: "Webcrest — Web Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/Webcrest-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Webcrest",
  url: siteUrl,
  logo: `${siteUrl}/Webcrest-logo.png`,
  description: siteDescription,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+923442667537",
    email: "hello@webcrestllc.com",
    contactType: "customer service",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <svg style={{ display: "none" }}>
          <filter
            id="liquidGlass"
            colorInterpolationFilters="linearRGB"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
          >
            <feDisplacementMap
              in="SourceGraphic"
              in2="SourceGraphic"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="B"
              result="displacement"
            />
            <feGaussianBlur stdDeviation="3" in="displacement" result="blur" />
          </filter>
        </svg>
        {/* <Header /> */}
        <Navbar />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
