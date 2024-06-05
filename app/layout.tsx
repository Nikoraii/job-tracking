import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StickyNavbar } from "./components/Navbar";

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
        <body className={inter.className}>
            <StickyNavbar />
            {children}
        </body>
    </html>
  );
}
