import "../global.css";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Analytics } from "./components/analytics/tracking";

export const metadata: Metadata = {
  title: {
    default: "Dan Ditomaso",
    template: "%s | danditomaso.com",
  },
  description: "Building pixel-perfect, engaging, and delightful user experiences.",
  openGraph: {
    title: "danditomaso.com",
    description: "Building pixel-perfect, engaging, and delightful user experiences.",
    url: "https://danditomaso.com",
    siteName: "danditomaso.com",
    images: [
      {
        url: "https://danditomaso.com/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
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
  twitter: {
    title: "danditomaso",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "./CalSans-SemiBold.woff2",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
        <head>
          <Analytics />
        </head>
        <body
          className={`bg-black ${
            process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
        >
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
