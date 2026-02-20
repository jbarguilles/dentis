// Authentication wrapper component
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import tokenRefreshService from "@/services/tokenRefreshService";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Instead of checking cookies directly (which doesn't work with httpOnly cookies),
        // try to validate the existing token first
        const isTokenValid = await tokenRefreshService.validateToken();

        if (isTokenValid) {
          console.log("Existing token is valid");
          if (!tokenRefreshService.initialized) {
            tokenRefreshService.initialize();
          }
          setIsAuthenticated(true);
          return;
        }

        // If token validation fails, try to refresh the token
        console.log("Token validation failed, attempting to refresh...");

        // Initialize token refresh service if needed
        if (!tokenRefreshService.initialized) {
          tokenRefreshService.initialize();
        }

        // Try to refresh/validate token
        const refreshSuccess = await tokenRefreshService.refreshAccessToken();

        if (refreshSuccess) {
          console.log("Token refresh successful");
          setIsAuthenticated(true);
        } else {
          console.log("Token refresh failed, redirecting to login");
          router.push("/login");
          return;
        }
      } catch (error) {
        console.error("Authentication error:", error);
        router.push("/login");
        return;
      } finally {
        setIsAuthenticating(false);
      }
    };

    initializeAuth();
  }, [router]);

  if (isAuthenticating) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner className="h-8 w-8" />
        <span className="ml-2">Authenticating...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
}
