import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "@/contexts";
import { Header } from "@/components";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Popcorn",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        >
          <Header />
          {children}
        </body>
      </html>
    </Providers>
  );
};

export default RootLayout;
