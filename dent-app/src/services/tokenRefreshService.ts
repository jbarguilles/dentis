// Token refresh service for frontend
// This service handles automatic token refresh 2 minutes before expiry

interface TokenInfo {
  shouldRefresh: boolean;
  timeUntilExpiration: number;
  message: string;
}

interface RefreshResponse {
  message: string;
  success: boolean;
  accessTokenExpiresIn: number;
  sessionId: string;
}

class TokenRefreshService {
  private refreshTimer: NodeJS.Timeout | null = null;
  private isRefreshing = false;
  private isInitialized = false;
  private baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/dent-app";

  constructor() {
    // Don't automatically start the checker - only start when user is logged in
  }

  /**
   * Start the token refresh checker that runs every minute
   */
  private startTokenRefreshChecker() {
    if (this.refreshTimer) {
      return; // Already running
    }

    this.refreshTimer = setInterval(async () => {
      await this.checkAndRefreshToken();
    }, 60000); // Check every minute

    console.log("Token refresh checker started");
  }

  /**
   * Stop the token refresh checker
   */
  public stopTokenRefreshChecker() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
      console.log("Token refresh checker stopped");
    }
  }

  /**
   * Check if token should be refreshed and refresh if needed
   */
  private async checkAndRefreshToken(): Promise<void> {
    if (this.isRefreshing) {
      return; // Already refreshing, skip
    }

    // Don't make requests if service is not properly initialized
    if (!this.isInitialized) {
      return;
    }

    try {
      const shouldRefreshResponse = await fetch(`${this.baseURL}/auth/should-refresh`, {
        method: "GET",
        credentials: "include", // Include cookies
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!shouldRefreshResponse.ok) {
        // If we can't check token status, stop the refresh checker
        if (shouldRefreshResponse.status === 401) {
          this.stopTokenRefreshChecker();
          this.handleTokenExpired();
        }
        return;
      }

      const tokenInfo: TokenInfo = await shouldRefreshResponse.json();

      if (tokenInfo.shouldRefresh) {
        console.log("Token will expire soon, refreshing...", {
          timeUntilExpiration: tokenInfo.timeUntilExpiration,
          message: tokenInfo.message,
        });

        await this.refreshAccessToken();
      }
    } catch (error) {
      console.error("Error checking token refresh status:", error);
    }
  }

  /**
   * Manually refresh the access token
   */
  public async refreshAccessToken(): Promise<boolean> {
    if (this.isRefreshing) {
      // Wait for current refresh to complete
      await this.waitForRefresh();
      return true;
    }

    this.isRefreshing = true;

    try {
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: "POST",
        credentials: "include", // Include cookies
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const refreshResponse: RefreshResponse = await response.json();
        console.log("Token refreshed successfully:", {
          expiresIn: refreshResponse.accessTokenExpiresIn,
          sessionId: refreshResponse.sessionId,
        });

        // Dispatch custom event to notify components
        this.dispatchTokenRefreshedEvent();

        return true;
      } else if (response.status === 401) {
        // Refresh token is invalid or expired
        console.log("Refresh token expired, redirecting to login...");
        this.handleTokenExpired();
        return false;
      } else {
        throw new Error(`Refresh failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      this.handleTokenExpired();
      return false;
    } finally {
      this.isRefreshing = false;
    }
  }

  /**
   * Wait for current refresh operation to complete
   */
  private async waitForRefresh(): Promise<void> {
    while (this.isRefreshing) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  /**
   * Handle token expiration by redirecting to login
   */
  private handleTokenExpired(): void {
    this.stopTokenRefreshChecker();

    // Dispatch custom event to notify components
    this.dispatchTokenExpiredEvent();

    // Redirect to login page if in browser environment
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  /**
   * Dispatch custom event when token is refreshed
   */
  private dispatchTokenRefreshedEvent(): void {
    if (typeof window !== "undefined") {
      const event = new CustomEvent("tokenRefreshed", {
        detail: { timestamp: new Date().toISOString() },
      });
      window.dispatchEvent(event);
    }
  }

  /**
   * Dispatch custom event when token expires
   */
  private dispatchTokenExpiredEvent(): void {
    if (typeof window !== "undefined") {
      const event = new CustomEvent("tokenExpired", {
        detail: { timestamp: new Date().toISOString() },
      });
      window.dispatchEvent(event);
    }
  }

  /**
   * Initialize the service (call this when user logs in)
   */
  public initialize(): void {
    if (!this.isInitialized) {
      this.isInitialized = true;
      this.startTokenRefreshChecker();
      console.log("TokenRefreshService initialized");
    }
  }

  /**
   * Cleanup the service (call this when user logs out)
   */
  public cleanup(): void {
    this.isInitialized = false;
    this.stopTokenRefreshChecker();
    this.isRefreshing = false;
    console.log("TokenRefreshService cleaned up");
  }

  /**
   * Get current token status
   */
  public async getTokenStatus(): Promise<TokenInfo | null> {
    if (!this.isInitialized) {
      return null; // Don't make API calls when not authenticated
    }

    try {
      const response = await fetch(`${this.baseURL}/auth/should-refresh`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error("Error getting token status:", error);
      return null;
    }
  }

  /**
   * Check if the service is currently initialized (user is logged in)
   */
  public get initialized(): boolean {
    return this.isInitialized;
  }

  /**
   * Validate current access token
   */
  public async validateToken(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/auth/validate`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const isValid = response.ok;

      // If token is invalid and we're initialized, cleanup
      if (!isValid && this.isInitialized) {
        this.cleanup();
      }

      return isValid;
    } catch (error) {
      console.error("Error validating token:", error);
      // On network errors, cleanup if we're initialized
      if (this.isInitialized) {
        this.cleanup();
      }
      return false;
    }
  }
}

// Create singleton instance
const tokenRefreshService = new TokenRefreshService();

export default tokenRefreshService;

// Export types for use in other files
export type { TokenInfo, RefreshResponse };
