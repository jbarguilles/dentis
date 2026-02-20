"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import apiService from "@/services/apiService";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";

export interface User {
  userId: number;
  username: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  role: "ADMIN" | "SUPERADMIN" | "FACULTY" | "CLINICIAN" | "STAFF";
  createdDate: string;
  updatedDate?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  logoutAll: () => Promise<void>;
  refreshUser: () => Promise<void>;
  checkAuthStatus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const { initializeTokenRefresh, cleanupTokenRefresh, validateToken } = useTokenRefresh({
    onTokenRefreshed: () => {
      console.log("Token refreshed in auth context");
      // Optionally refresh user data when token is refreshed
      refreshUser();
    },
    onTokenExpired: () => {
      console.log("Token expired in auth context");
      handleLogout(false); // Don't call API logout since token is expired
    },
    redirectOnExpiry: false, // We'll handle redirection manually
  });

  // Check authentication status on mount
  const checkAuthStatus = useCallback(async (): Promise<boolean> => {
    try {
      const isValid = await validateToken();

      if (isValid) {
        await refreshUser();
        initializeTokenRefresh();
        return true;
      }

      setUser(null);
      setIsAuthenticated(false);
      cleanupTokenRefresh(); // Ensure cleanup if not authenticated
      return false;
    } catch (error) {
      console.error("Error checking auth status:", error);
      setUser(null);
      setIsAuthenticated(false);
      cleanupTokenRefresh();
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [validateToken, initializeTokenRefresh, cleanupTokenRefresh]);

  // Get current user data
  const refreshUser = useCallback(async () => {
    try {
      const userData = await apiService.getCurrentUser();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // Login function
  const login = useCallback(
    async (credentials: { username: string; password: string }) => {
      setIsLoading(true);
      try {
        const response = await apiService.login(credentials);

        if (response.success) {
          setUser(response.user);
          setIsAuthenticated(true);
          initializeTokenRefresh();

          // Redirect to dashboard after successful login
          router.push("/dashboard");
        } else {
          throw new Error(response.message || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [router, initializeTokenRefresh],
  );

  // Logout function
  const handleLogout = useCallback(
    async (callApi: boolean = true) => {
      try {
        if (callApi) {
          await apiService.logout();
        }
      } catch (error) {
        console.error("Logout API error:", error);
        // Continue with local logout even if API fails
      } finally {
        // Clean up local state
        setUser(null);
        setIsAuthenticated(false);
        cleanupTokenRefresh();

        // Redirect to login page
        router.push("/login");
      }
    },
    [router, cleanupTokenRefresh],
  );

  const logout = useCallback(() => handleLogout(true), [handleLogout]);

  // Logout from all sessions
  const logoutAll = useCallback(async () => {
    try {
      await apiService.logoutAll();
    } catch (error) {
      console.error("Logout all error:", error);
    } finally {
      // Clean up local state
      setUser(null);
      setIsAuthenticated(false);
      cleanupTokenRefresh();

      // Redirect to login page
      router.push("/login");
    }
  }, [router, cleanupTokenRefresh]);

  // Initialize auth on mount
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupTokenRefresh();
    };
  }, [cleanupTokenRefresh]);

  const contextValue: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    logoutAll,
    refreshUser,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
