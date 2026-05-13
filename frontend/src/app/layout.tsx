import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PastiSehat Dashboard - RS Louis Surabaya",
  description: "Layanan Kesehatan Masa Depan di RS Louis Surabaya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${manrope.variable} antialiased light`}
    >
      <body className="min-h-screen flex flex-col bg-background text-on-background font-body-md">
        {children}
      </body>
    </html>
  );
}
