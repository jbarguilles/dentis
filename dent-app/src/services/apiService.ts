// Enhanced API service with authentication and token refresh
import tokenRefreshService from "./tokenRefreshService";

interface ApiRequestInit extends RequestInit {
  skipAuth?: boolean;
  forwardedCookies?: string; // Add support for forwarded cookies
}

class ApiService {
  private baseURL: string;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value: any) => void;
    reject: (reason: any) => void;
  }> = [];

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/dent-app";
  }

  private processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });

    this.failedQueue = [];
  }

  public async request<T = any>(endpoint: string, options: ApiRequestInit = {}): Promise<T> {
    const { skipAuth = false, forwardedCookies, ...fetchOptions } = options;

    const config: RequestInit = {
      credentials: "include", // Always include cookies
      headers: {
        "Content-Type": "application/json",
        // If we have forwarded cookies (from server actions), use them
        ...(forwardedCookies ? { Cookie: forwardedCookies } : {}),
        ...fetchOptions.headers,
      },
      ...fetchOptions,
    };

    const url = `${this.baseURL}${endpoint}`;

    try {
      let response = await fetch(url, config);

      // If request failed with 401 and we're not skipping auth, try to refresh token
      if (response.status === 401 && !skipAuth && !endpoint.includes("/auth/")) {
        if (this.isRefreshing) {
          // Wait for the current refresh to complete
          return new Promise((resolve, reject) => {
            this.failedQueue.push({ resolve, reject });
          }).then(() => {
            // Retry the original request
            return fetch(url, config).then((res) => {
              if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${res.statusText}`);
              }
              return res.json();
            });
          });
        }

        this.isRefreshing = true;

        try {
          console.log("Attempting to refresh access token...");
          const refreshSuccess = await tokenRefreshService.refreshAccessToken();

          if (refreshSuccess) {
            console.log("Token refresh successful, retrying original request...");
            this.processQueue(null);
            // Retry the original request
            response = await fetch(url, config);
          } else {
            console.log("Token refresh failed, authentication failed");
            this.processQueue(new Error("Token refresh failed"));
            throw new Error("Authentication failed");
          }
        } catch (refreshError) {
          console.error("Error during token refresh:", refreshError);
          this.processQueue(refreshError);
          throw refreshError;
        } finally {
          this.isRefreshing = false;
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }

      return response as any;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // HTTP method helpers
  public async get<T = any>(endpoint: string, options: ApiRequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  public async post<T = any>(
    endpoint: string,
    data?: any,
    options: ApiRequestInit = {},
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public async put<T = any>(
    endpoint: string,
    data?: any,
    options: ApiRequestInit = {},
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public async patch<T = any>(
    endpoint: string,
    data?: any,
    options: ApiRequestInit = {},
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public async delete<T = any>(endpoint: string, options: ApiRequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }

  // Authentication specific methods
  public async login(credentials: { username: string; password: string }) {
    return this.post("/auth/login", credentials, { skipAuth: true });
  }

  public async logout() {
    return this.post("/auth/logout", {});
  }

  public async logoutAll() {
    return this.post("/auth/logout-all", {});
  }

  public async getCurrentUser() {
    return this.get("/auth/me");
  }

  public async validateToken() {
    return this.get("/auth/validate");
  }

  public async refreshToken() {
    return this.post("/auth/refresh", {}, { skipAuth: true });
  }

  // File upload helper
  public async uploadFile<T = any>(
    endpoint: string,
    file: File,
    additionalData: Record<string, any> = {},
  ): Promise<T> {
    const formData = new FormData();
    formData.append("file", file);

    Object.keys(additionalData).forEach((key) => {
      formData.append(key, additionalData[key]);
    });

    return this.request<T>(endpoint, {
      method: "POST",
      body: formData,
      headers: {}, // Let browser set content-type for FormData
    });
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;
export { type ApiRequestInit };
