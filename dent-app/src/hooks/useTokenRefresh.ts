// React hook for token management
import { useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import tokenRefreshService, { type TokenInfo } from "../services/tokenRefreshService";

interface UseTokenRefreshOptions {
  onTokenRefreshed?: () => void;
  onTokenExpired?: () => void;
  redirectOnExpiry?: boolean;
  redirectPath?: string;
}

export const useTokenRefresh = (options: UseTokenRefreshOptions = {}) => {
  const {
    onTokenRefreshed,
    onTokenExpired,
    redirectOnExpiry = true,
    redirectPath = "/login",
  } = options;

  const router = useRouter();
  const isInitialized = useRef(false);

  // Handle token refreshed event
  const handleTokenRefreshed = useCallback(
    (event: Event) => {
      console.log("Token refreshed successfully");
      onTokenRefreshed?.();
    },
    [onTokenRefreshed],
  );

  // Handle token expired event
  const handleTokenExpired = useCallback(
    (event: Event) => {
      console.log("Token expired, handling logout...");
      onTokenExpired?.();

      if (redirectOnExpiry) {
        router.push(redirectPath);
      }
    },
    [onTokenExpired, redirectOnExpiry, redirectPath, router],
  );

  // Initialize token refresh service
  const initializeTokenRefresh = useCallback(() => {
    if (!isInitialized.current) {
      tokenRefreshService.initialize();
      isInitialized.current = true;
      console.log("Token refresh service initialized");
    }
  }, []);

  // Cleanup token refresh service
  const cleanupTokenRefresh = useCallback(() => {
    if (isInitialized.current) {
      tokenRefreshService.cleanup();
      isInitialized.current = false;
      console.log("Token refresh service cleaned up");
    }
  }, []);

  // Manually refresh token
  const refreshToken = useCallback(async (): Promise<boolean> => {
    return await tokenRefreshService.refreshAccessToken();
  }, []);

  // Get current token status
  const getTokenStatus = useCallback(async (): Promise<TokenInfo | null> => {
    return await tokenRefreshService.getTokenStatus();
  }, []);

  // Validate current token
  const validateToken = useCallback(async (): Promise<boolean> => {
    try {
      return await tokenRefreshService.validateToken();
    } catch (error) {
      console.error("Error validating token in hook:", error);
      // Ensure cleanup on validation errors
      if (isInitialized.current) {
        cleanupTokenRefresh();
      }
      return false;
    }
  }, [cleanupTokenRefresh]);

  useEffect(() => {
    // Add event listeners
    window.addEventListener("tokenRefreshed", handleTokenRefreshed);
    window.addEventListener("tokenExpired", handleTokenExpired);

    // Cleanup function
    return () => {
      window.removeEventListener("tokenRefreshed", handleTokenRefreshed);
      window.removeEventListener("tokenExpired", handleTokenExpired);
    };
  }, [handleTokenRefreshed, handleTokenExpired]);

  return {
    initializeTokenRefresh,
    cleanupTokenRefresh,
    refreshToken,
    getTokenStatus,
    validateToken,
    isInitialized: isInitialized.current,
  };
};

export default useTokenRefresh;
