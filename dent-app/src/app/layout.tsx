"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppNavbar } from "@/components/app-navbar";
import { QueryProvider } from "@/contexts/QueryContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import ProtectedRoute from "@/components/ProtectedRoute";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Note: metadata can't be used in client components, so we'll move this to a server component wrapper if needed
const metadata = {
  title: "DentIS",
  description:
    "University of the Philippines Manila Dental Information System with Integrated Patient Referral and Lookup",
  icons: {
    icon: "/up.png",
  },
};

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const isLoginPage = pathname === "/login";
  const isUnauthorizedPage = pathname === "/unauthorized";
  
  // Check if current page is a chart page (full screen, no sidebar/navbar)
  const isChartPage = pathname.includes("/dental-chart") || 
                      pathname.includes("/periodontal-chart") || 
                      pathname.includes("/orthodontic-chart") || 
                      pathname.includes("/treatment-plan-chart");

  // Pages that don't require authentication
  if (isLandingPage || isLoginPage || isUnauthorizedPage) {
    return <main className="flex-1 overflow-auto bg-gray-50">{children}</main>;
  }
  
  // Chart pages require authentication but no sidebar/navbar
  if (isChartPage) {
    return (
      <ProtectedRoute>
        <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
      </ProtectedRoute>
    );
  }

  // All other pages require authentication
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AppNavbar />
          <main className="flex-1 overflow-auto bg-gray-100">{children}</main>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={metadata.icons.icon} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          <AuthProvider>
            <LayoutContent>{children}</LayoutContent>
          </AuthProvider>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
