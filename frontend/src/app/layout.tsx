import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DecentSocial - Decentralized Social Media",
  description: "A decentralized social media platform based on Ethereum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Header />
            <main className="container mx-auto px-4 py-6">
              {children}
            </main>
            <footer className="container mx-auto p-4 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} DecentSocial - A decentralized social media platform
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
