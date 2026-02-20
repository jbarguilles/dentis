# Authentication System Usage Guide

## Overview

This authentication system provides secure cookie-based authentication with JWT tokens. It includes:

- **Access tokens**: Expire in 15 minutes
- **Refresh tokens**: Expire in 7 days
- **Automatic token refresh**: 2 minutes before expiry
- **Session management**: Database-stored sessions
- **Secure cookies**: HttpOnly cookies for token storage

## Backend Endpoints

### Authentication Endpoints

```
POST /dent-app/auth/login
POST /dent-app/auth/logout
POST /dent-app/auth/logout-all
POST /dent-app/auth/refresh
POST /dent-app/auth/refresh-token
GET  /dent-app/auth/me
GET  /dent-app/auth/validate
GET  /dent-app/auth/should-refresh
```

### User Endpoints

```
POST /dent-app/user/signup
GET  /dent-app/user/profile
GET  /dent-app/user/{id}
GET  /dent-app/user/username/{username}
```

## Frontend Usage

### 1. Login

```typescript
import apiService from '../services/apiService';

const loginUser = async (credentials: { username: string; password: string }) => {
  try {
    const response = await apiService.login(credentials);
    console.log('Login successful:', response);
    
    // Initialize token refresh service after login
    tokenRefreshService.initialize();
    
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
```

### 2. Using the Token Refresh Hook

```typescript
import { useTokenRefresh } from '../hooks/useTokenRefresh';

const MyComponent = () => {
  const { 
    initializeTokenRefresh, 
    cleanupTokenRefresh, 
    refreshToken,
    validateToken 
  } = useTokenRefresh({
    onTokenRefreshed: () => {
      console.log('Token refreshed successfully');
    },
    onTokenExpired: () => {
      console.log('Token expired, redirecting to login');
    }
  });

  useEffect(() => {
    // Initialize token refresh when component mounts
    initializeTokenRefresh();

    // Cleanup when component unmounts
    return () => {
      cleanupTokenRefresh();
    };
  }, [initializeTokenRefresh, cleanupTokenRefresh]);

  return <div>My Component</div>;
};
```

### 3. Making API Calls

```typescript
import apiService from '../services/apiService';

// The apiService automatically handles token refresh
const fetchUserData = async () => {
  try {
    const user = await apiService.getCurrentUser();
    console.log('Current user:', user);
    return user;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
};

// Other API calls
const fetchPatients = async () => {
  try {
    const patients = await apiService.get('/patient/all');
    return patients;
  } catch (error) {
    console.error('Failed to fetch patients:', error);
    throw error;
  }
};
```

### 4. Logout

```typescript
const logoutUser = async () => {
  try {
    await apiService.logout();
    
    // Cleanup token refresh service
    tokenRefreshService.cleanup();
    
    // Redirect to login page
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
```

## Security Configuration

### Backend Configuration (application.properties)

```properties
# JWT Configuration
jwt.secret=mySecretKeyForJWTTokenGenerationThatShouldBeLongEnoughAndSecure123456789
jwt.access-token-expiration=900
jwt.refresh-token-expiration=604800

# Cookie Configuration
app.cookie.domain=localhost
app.cookie.secure=false
app.cookie.same-site=Lax
```

### Frontend Configuration

Add to your `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/dent-app
```

## Database Schema

The system creates a `USER_SESSION` table to store session information:

```sql
CREATE TABLE USER_SESSION (
    session_id VARCHAR(255) PRIMARY KEY,
    user_id BIGINT NOT NULL,
    refresh_token VARCHAR(1000) NOT NULL,
    ip_address VARCHAR(255),
    user_agent VARCHAR(500),
    created_at TIMESTAMP NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    last_accessed TIMESTAMP NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES "USER"(user_id)
);
```

## Security Features

1. **HttpOnly Cookies**: Tokens are stored in HttpOnly cookies to prevent XSS attacks
2. **CSRF Protection**: Disabled for API endpoints, but CORS is properly configured
3. **Token Validation**: All protected endpoints validate tokens automatically
4. **Automatic Refresh**: Tokens are refreshed 2 minutes before expiry
5. **Session Management**: Database-stored sessions with cleanup functionality
6. **Password Encryption**: BCrypt password hashing
7. **CORS Configuration**: Properly configured for your frontend domain

## Error Handling

The system provides comprehensive error handling:

- **401 Unauthorized**: Invalid or expired tokens
- **403 Forbidden**: Insufficient permissions
- **400 Bad Request**: Invalid input data
- **500 Internal Server Error**: Server-side errors

All error responses include descriptive messages and success flags.

## Testing

You can test the authentication system using tools like Postman or curl:

```bash
# Login
curl -X POST http://localhost:8080/dent-app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}' \
  -c cookies.txt

# Make authenticated request
curl -X GET http://localhost:8080/dent-app/auth/me \
  -b cookies.txt

# Refresh token
curl -X POST http://localhost:8080/dent-app/auth/refresh \
  -b cookies.txt \
  -c cookies.txt
```

## Troubleshooting

1. **CORS Issues**: Make sure your frontend URL is in the CORS configuration
2. **Cookie Issues**: Check that cookies are being sent with `credentials: 'include'`
3. **Token Expiry**: The system automatically handles token refresh, but check browser console for errors
4. **Database Issues**: Make sure the USER_SESSION table is created and accessible

## Production Considerations

1. **HTTPS**: Set `app.cookie.secure=true` in production
2. **Domain**: Update `app.cookie.domain` to your production domain
3. **Secret Key**: Use a strong, random JWT secret key
4. **Session Cleanup**: Schedule regular cleanup of expired sessions
5. **Rate Limiting**: Consider adding rate limiting to auth endpoints