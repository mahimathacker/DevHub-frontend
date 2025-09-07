import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Providers } from "./provider";
import ProgressBarProvider from "./ProgressBar";
import { Suspense } from "react";
import LoadingAnimation from "../components/Common/LoadingAnimation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevHub",
  description: "A community platform for developers to learn, discuss, and stay updated on everything that matters in the tech space, all in one place.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=G-WCBB9CTMEQ`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-WCBB9CTMEQ');
      `,
          }}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Suspense fallback={<LoadingAnimation />}>
            <ProgressBarProvider>
              <Navbar />
              {children}
              <Footer />
            </ProgressBarProvider>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
