import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProviderWrapper } from "@/components/ui/use-toast";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "OpsDash - Smart Business Operations Dashboard",
  description: "A premium SaaS-style web application for project management, team collaboration, and business analytics.",
  keywords: ["dashboard", "project management", "team collaboration", "analytics", "SaaS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <TooltipProvider>
          <ToastProviderWrapper>{children}</ToastProviderWrapper>
        </TooltipProvider>
      </body>
    </html>
  );
}
