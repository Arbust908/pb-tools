import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toast";
import { MainNav } from "@/components/ui/main-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

 export const metadata: Metadata = {
    title: 'Repository Tools',
    description: 'Collection of utility tools',
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grid min-h-screen grid-rows-[auto_1fr_auto] bg-zinc-50 font-sans dark:bg-zinc-950` }
      >
        <Providers>
          <MainNav  />
            {children}
          <footer className="border-t border-zinc-800 pt-2 pb-4 px-8">
            Footer
          </footer>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
