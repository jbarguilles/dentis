"use client";

import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/patients": "Patients",
  "/chart-requests": "Chart Requests",
  "/patient-referral": "Patient Referrals",
  "/users": "Users",
  "/patient-admission": "Patient Admission",
  "/patient-record": "Patient Records",
};

export function AppNavbar() {
  const pathname = usePathname();

  // Generate breadcrumbs from pathname
  const segments = pathname
    .split("/")
    .filter((s) => s)
    .slice(0, 2); // Only show first two levels

  const currentPageName =
    breadcrumbMap[pathname] || breadcrumbMap["/" + segments[0]] || "Page";

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 md:px-8 py-3">
        <div className="flex items-center gap-2 text-sm">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-gray-600 hover:text-[#800000] transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-medium">{currentPageName}</span>
        </div>
      </div>
    </nav>
  );
}
