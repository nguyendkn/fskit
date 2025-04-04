// /src/features/auth/middleware/authMiddleware.ts
import { MiddlewareHandler, Context } from 'hono';
import { verify } from 'jsonwebtoken';

// Custom error messages for better debugging and user experience
const ERROR_MESSAGES = {
  NO_TOKEN: 'Authentication token is missing',
  INVALID_FORMAT: 'Invalid authentication format',
  EXPIRED: 'Authentication token has expired',
  INVALID: 'Invalid authentication token',
  SERVER_ERROR: 'Authentication error occurred',
};

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  try {
    // Get authorization header
    const authHeader = c.req.header('Authorization');

    // Check if token exists and has correct format
    if (!authHeader) {
      return c.json({ error: ERROR_MESSAGES.NO_TOKEN }, 401);
    }

    if (!authHeader.startsWith('Bearer ')) {
      return c.json({ error: ERROR_MESSAGES.INVALID_FORMAT }, 401);
    }

    // Extract the token
    const token = authHeader.split(' ')[1];

    // Verify JWT token
    try {
      const decoded = verify(token, process.env.JWT_SECRET || 'your-super-secret-jwt-key');

      // Add user data to the request context
      c.set('user', decoded);

      // Continue to next middleware or route handler
      await next();
    } catch (error) {
      // Handle different JWT verification errors
      if (error instanceof Error && error.name === 'TokenExpiredError') {
        return c.json({ error: ERROR_MESSAGES.EXPIRED }, 401);
      }

      return c.json({ error: ERROR_MESSAGES.INVALID }, 401);
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return c.json({ error: ERROR_MESSAGES.SERVER_ERROR }, 500);
  }
};

// Optional: Helper to extract user from request
export const getAuthUser = (c: Context) => {
  return c.get('user');
};
