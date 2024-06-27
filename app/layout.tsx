import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StickyNavbar } from "./components/Navbar";
import NextTopLoader from "nextjs-toploader";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Tracking",
  description: "Track your Job Applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={inter.className}>
        <StickyNavbar />
        <NextTopLoader color="#4f46e5" showSpinner={false} />

        {/* BACKGROUND GRADIENT */}
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
