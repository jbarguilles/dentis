"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "ADMIN" | "SUPERADMIN" | "FACULTY" | "CLINICIAN" | "STAFF";
  fallbackPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  fallbackPath = "/login",
}) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // User is not authenticated, redirect to login
        router.push(fallbackPath);
        return;
      }

      if (requiredRole && user?.role !== requiredRole) {
        // User doesn't have required role, redirect to unauthorized page or dashboard
        router.push("/unauthorized");
        return;
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRole, router, fallbackPath]);

  // If not authenticated or doesn't have required role, don't render children
  // The useEffect above will handle the redirect
  if (!isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
    return null;
  }

  // User is authenticated and has required role (if specified)
  return <>{children}</>;
};

export default ProtectedRoute;

// Higher-order component for wrapping pages
export const withProtectedRoute = <P extends object>(
  Component: React.ComponentType<P>,
  requiredRole?: "ADMIN" | "SUPERADMIN" | "FACULTY" | "CLINICIAN" | "STAFF",
) => {
  const WrappedComponent = (props: P) => (
    <ProtectedRoute requiredRole={requiredRole}>
      <Component {...props} />
    </ProtectedRoute>
  );

  WrappedComponent.displayName = `withProtectedRoute(${Component.displayName || Component.name})`;

  return WrappedComponent;
};

// Role-specific protected route components for convenience
export const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRole="ADMIN">{children}</ProtectedRoute>
);

export const SuperAdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRole="SUPERADMIN">{children}</ProtectedRoute>
);

export const FacultyProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRole="FACULTY">{children}</ProtectedRoute>
);

export const ClinicianProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRole="CLINICIAN">{children}</ProtectedRoute>
);

export const StaffProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRole="STAFF">{children}</ProtectedRoute>
);
