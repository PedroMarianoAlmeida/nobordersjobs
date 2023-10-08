import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Inter } from "next/font/google";

import "./globals.css";
import NavBar from "@/components/Navbar";
import ClientSessionProvider from "@/components/ClientSessionProvider";
import { userNameHandler } from "@/utils/userNameUtils";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "No Borders Jobs",
  description: "Jobs that you can do from anywhere in the world.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const currentPath = children.props.childProp.segment
  const { shouldRedirect, destination } = await userNameHandler(currentPath);

  if (shouldRedirect) redirect(destination);
  
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
