import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { portfolioData } from "@/data/portfolio";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://khairulmiya.dev";
const description = Array.isArray(portfolioData.about)
  ? portfolioData.about.join(" ")
  : portfolioData.about;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${portfolioData.name} | ${portfolioData.role}`,
    template: `%s | ${portfolioData.name}`,
  },
  description,
  keywords: [
    "Khairul Miya",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Portfolio",
    "BCA Student",
    "Web Developer India",
  ],
  authors: [{ name: portfolioData.name, url: siteUrl }],
  creator: portfolioData.name,

  // Canonical URL
  alternates: {
    canonical: siteUrl,
  },

  // Open Graph (social sharing)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: `${portfolioData.name} | Portfolio`,
    title: `${portfolioData.name} | ${portfolioData.role}`,
    description,
    images: [
      {
        url: "/portfolioPic.png",
        width: 1200,
        height: 630,
        alt: `${portfolioData.name} — ${portfolioData.role}`,
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: `${portfolioData.name} | ${portfolioData.role}`,
    description,
    images: ["/portfolioPic.png"],
    creator: "@khairulmiya",
  },

  // Robots
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <head>
        {/* JSON-LD Structured Data — Person schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: portfolioData.name,
              url: siteUrl,
              jobTitle: portfolioData.role,
              email: portfolioData.email,
              sameAs: [
                portfolioData.github,
                portfolioData.linkedin,
              ].filter(Boolean),
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
