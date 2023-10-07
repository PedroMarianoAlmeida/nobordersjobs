import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "./globals.css";
import NavBar from "@/components/Navbar";
import ClientSessionProvider from "@/components/ClientSessionProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "No Borders Jobs",
  description: "Jobs that you can do from anywhere in the world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientSessionProvider>
          <NavBar />
        </ClientSessionProvider>
        {children}
      </body>
    </html>
  );
}
