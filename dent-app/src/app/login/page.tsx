"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!credentials.username || !credentials.password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await login(credentials);
      toast.success("Login successful! Welcome back.");
      // Navigation is handled by the auth context
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Invalid credentials. Please try again.");
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-[#800000]/5 to-[#800000]/10 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center items-center gap-3">
            <Image src="/up.png" alt="UP Logo" width={64} height={64} className="w-16 h-16" />
            <Image src="/upcd.png" alt="UPCD Logo" width={72} height={72} className="w-18 h-18" />
          </div>
          <h1 className="text-4xl font-bold text-[#800000]">DentIS 3.0</h1>
          <p className="text-gray-700 font-medium">
            University of the Philippines Manila
            <br />
            College of Dentistry
          </p>
          <p className="text-gray-600 text-sm">Dental Information System</p>
        </div>

        {/* Login Form */}
        <Card className="w-full shadow-xl border-t-4 border-[#800000]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-[#800000]">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Username or Email</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username or email"
                  value={credentials.username}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  autoComplete="username"
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    autoComplete="current-password"
                    className="h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={togglePasswordVisibility}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Additional Options */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="rounded border-gray-300 text-[#800000] focus:ring-[#800000]"
                  />
                  <label htmlFor="remember" className="text-gray-600">
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-[#800000] hover:text-[#990000] hover:underline font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("Please contact your system administrator for password reset.");
                  }}
                >
                  Forgot password?
                </a>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                type="submit"
                className="w-full h-11 bg-[#800000] hover:bg-[#990000] text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600">
          <p>© 2026 University of the Philippines Manila</p>
          <p>College of Dentistry</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
