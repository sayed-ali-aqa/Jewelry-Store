import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"
import { Lato } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Providers } from "./providers";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato", // Optional: Use for CSS variables
});

export const metadata: Metadata = {
  title: "Jewelry Store",
  description: "This is a jewelry store app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <Navbar />
        <Providers>{children}</Providers>
        <Toaster position="top-center" richColors />
        <Footer />
      </body>
    </html>
  );
}
