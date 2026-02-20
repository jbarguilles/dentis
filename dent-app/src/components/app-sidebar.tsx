"use client";

import {
  Calendar,
  Home,
  Settings,
  Users,
  FileText,
  ClipboardList,
  ChevronDown,
  User,
  LogOut,
  Shield,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "./ui/dropdown-menu";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Patients",
    url: "/patients",
    icon: Users,
  },
  {
    title: "Requests",
    url: "/chart-requests",
    icon: ClipboardList,
  },
  {
    title: "Patient Referrals",
    url: "/patient-referral",
    icon: Calendar,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user, logout, logoutAll } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleLogoutAll = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      await logoutAll();
      toast.success("Logged out from all devices successfully");
    } catch (error) {
      console.error("Logout all error:", error);
      toast.error("Failed to logout from all devices. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getUserInitials = () => {
    if (!user) return "U";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "text-[#800000] bg-[#800000]/10";
      case "SUPERADMIN":
        return "text-[#800000] bg-[#800000]/10";
      case "FACULTY":
        return "text-blue-600 bg-blue-50";
      case "CLINICIAN":
        return "text-green-600 bg-green-50";
      case "STAFF":
        return "text-purple-600 bg-purple-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <Sidebar className="bg-white border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-200 bg-gradient-to-br from-white to-gray-50 p-4">
        <a href="/dashboard" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#800000] to-[#990000] text-white shadow-md transition-all group-hover:shadow-lg group-hover:scale-105">
            <span className="text-lg font-bold">D</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-[#800000] tracking-tight">DentIS</span>
            <span className="text-xs text-gray-600">Version 3.0</span>
          </div>
        </a>
      </SidebarHeader>

      <SidebarContent className="p-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-bold text-[#800000] uppercase tracking-wider mb-3">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`h-11 text-sm transition-all ${
                        isActive
                          ? "bg-[#800000]/10 text-[#800000] font-semibold"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      isActive={isActive}
                    >
                      <a href={item.url}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 bg-gradient-to-br from-gray-50 to-white">
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start h-auto p-3 hover:bg-gray-100"
                disabled={isLoggingOut}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#800000] to-[#990000] flex items-center justify-center text-white text-sm font-bold shadow-sm">
                    {getUserInitials()}
                  </div>
                  <div className="flex flex-col items-start flex-1 min-w-0">
                    <span className="text-sm font-semibold text-gray-900 truncate w-full">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" side="top" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold leading-none text-gray-900">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs leading-none text-gray-500">{user.email}</p>
                  <p
                    className={`text-xs px-2 py-0.5 rounded-full w-fit mt-2 ${getRoleColor(user.role)}`}
                  >
                    {user.role}
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                {user.role === "ADMIN" && (
                  <DropdownMenuItem>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Admin Panel</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{isLoggingOut ? "Signing out..." : "Sign out"}</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleLogoutAll} disabled={isLoggingOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out all devices</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
