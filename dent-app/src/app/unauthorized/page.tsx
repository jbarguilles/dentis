"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, ArrowLeft, Home } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const UnauthorizedPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-2xl text-gray-900">Access Denied</CardTitle>
          <CardDescription className="text-gray-600">
            You don't have permission to access this resource.
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Current Role:</span>{" "}
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {user?.role || "Unknown"}
              </span>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              If you believe this is an error, please contact your system administrator.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex space-x-3">
          <Button variant="outline" onClick={handleGoBack} className="flex-1">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <Button onClick={handleGoHome} className="flex-1">
            <Home className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UnauthorizedPage;
