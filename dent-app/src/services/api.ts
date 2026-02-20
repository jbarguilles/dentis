// src/services/api.ts
// Legacy API service - updated to work with new authentication
// Recommend using the new apiService.ts for new development

import { default as newApiService } from "./apiService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL or NEXT_PUBLIC_API_BASE_URL environment variable is not defined",
  );
}

export { API_BASE_URL };

// Legacy function - delegates to new API service for authentication handling
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit & { forwardedCookies?: string } = {},
): Promise<T> {
  // Use the new API service which handles authentication automatically
  const method = (options.method || "GET") as "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  const { forwardedCookies, ...restOptions } = options;

  // Skip authentication for auth endpoints
  const skipAuth = endpoint.includes("/auth/");

  try {
    switch (method.toUpperCase()) {
      case "POST":
        return await newApiService.post<T>(
          endpoint,
          restOptions.body ? JSON.parse(restOptions.body as string) : undefined,
          { skipAuth, forwardedCookies },
        );
      case "PUT":
        return await newApiService.put<T>(
          endpoint,
          restOptions.body ? JSON.parse(restOptions.body as string) : undefined,
          { skipAuth, forwardedCookies },
        );
      case "PATCH":
        return await newApiService.patch<T>(
          endpoint,
          restOptions.body ? JSON.parse(restOptions.body as string) : undefined,
          { skipAuth, forwardedCookies },
        );
      case "DELETE":
        return await newApiService.delete<T>(endpoint, { skipAuth, forwardedCookies });
      default:
        return await newApiService.get<T>(endpoint, { skipAuth, forwardedCookies });
    }
  } catch (error) {
    // Convert to legacy error format for backward compatibility
    if (error instanceof Error) {
      throw new Error(`API request failed: ${error.message}`);
    }
    throw error;
  }
}
