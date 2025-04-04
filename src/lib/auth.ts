import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

// Custom error messages for better debugging and user experience
const ERROR_MESSAGES = {
  NO_TOKEN: 'Authentication token is missing',
  INVALID_FORMAT: 'Invalid authentication format',
  EXPIRED: 'Authentication token has expired',
  INVALID: 'Invalid authentication token',
  SERVER_ERROR: 'Authentication error occurred',
};

// JWT Secret (move to env variable in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

// Define a type for the decoded JWT user data
interface JWTUser {
  id: string;
  email: string;
  name: string;
  [key: string]: unknown; // For any additional fields
}

// Authentication middleware for Next.js API routes
export async function authenticateRequest(request: NextRequest) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('Authorization');

    // Check if token exists and has correct format
    if (!authHeader) {
      return {
        isAuthenticated: false,
        error: ERROR_MESSAGES.NO_TOKEN,
        status: 401,
      };
    }

    if (!authHeader.startsWith('Bearer ')) {
      return {
        isAuthenticated: false,
        error: ERROR_MESSAGES.INVALID_FORMAT,
        status: 401,
      };
    }

    // Extract the token
    const token = authHeader.split(' ')[1];

    // Verify JWT token
    try {
      const decoded = await new Promise((resolve, reject) => {
        verify(token, JWT_SECRET, (err, decoded) => {
          if (err) {
            if (err.name === 'TokenExpiredError') {
              reject(new Error(ERROR_MESSAGES.EXPIRED));
            } else {
              reject(new Error(ERROR_MESSAGES.INVALID));
            }
          }
          resolve(decoded);
        });
      });

      return {
        isAuthenticated: true,
        user: decoded,
        error: null,
        status: 200,
      };
    } catch (error) {
      // Handle different JWT verification errors
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.INVALID;
      return {
        isAuthenticated: false,
        error: message,
        status: 401,
      };
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return {
      isAuthenticated: false,
      error: ERROR_MESSAGES.SERVER_ERROR,
      status: 500,
    };
  }
}

// Helper function to respond with unauthorized error
export function respondWithUnauthorized(error: string) {
  return NextResponse.json({ error }, { status: 401 });
}

// Wrap an API handler with authentication
export function withAuth(
  handler: (req: NextRequest, user: JWTUser) => Promise<NextResponse> | NextResponse,
) {
  return async (req: NextRequest) => {
    const auth = await authenticateRequest(req);

    if (!auth.isAuthenticated) {
      return respondWithUnauthorized(auth.error || ERROR_MESSAGES.INVALID);
    }

    return handler(req, auth.user as JWTUser);
  };
}
