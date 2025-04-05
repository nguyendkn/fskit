import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '../auth';
import { checkUserPermission } from './permissionService';
import { PermissionRequest, JWTUserWithRoles } from './types';

// Error messages
const ERROR_MESSAGES = {
  UNAUTHORIZED: "You don't have permission to access this resource",
  SERVER_ERROR: 'Permission check failed',
};

/**
 * Check if a user has the required permissions
 * @param permissionRequest The permission(s) to check
 */
export function hasPermission(permissionRequest: PermissionRequest) {
  return async (
    req: NextRequest,
    user: JWTUserWithRoles,
  ): Promise<{ isAuthorized: boolean; error?: string }> => {
    try {
      const permissionCheck = await checkUserPermission(user.id, permissionRequest);

      if (!permissionCheck.hasPermission) {
        return {
          isAuthorized: false,
          error: ERROR_MESSAGES.UNAUTHORIZED,
        };
      }

      return { isAuthorized: true };
    } catch (error) {
      console.error('Error checking permissions:', error);
      return {
        isAuthorized: false,
        error: ERROR_MESSAGES.SERVER_ERROR,
      };
    }
  };
}

/**
 * Middleware to protect API routes with permission checks
 * @param handler The route handler
 * @param permissionRequest The permission(s) to check
 */
export function withPermission(
  handler: (req: NextRequest, user: JWTUserWithRoles) => Promise<NextResponse> | NextResponse,
  permissionRequest: PermissionRequest,
) {
  return async (req: NextRequest) => {
    // First authenticate the user
    const auth = await authenticateRequest(req);

    if (!auth.isAuthenticated) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    // Then check permissions
    const user = auth.user as JWTUserWithRoles;
    const permissionCheck = await hasPermission(permissionRequest)(req, user);

    if (!permissionCheck.isAuthorized) {
      return NextResponse.json(
        { error: permissionCheck.error || ERROR_MESSAGES.UNAUTHORIZED },
        { status: 403 },
      );
    }

    // If authorized, proceed with the handler
    return handler(req, user);
  };
}

/**
 * Middleware for checking permissions within a route handler
 */
export async function checkPermissionMiddleware(
  req: NextRequest,
  user: JWTUserWithRoles,
  permissionRequest: PermissionRequest,
): Promise<NextResponse | null> {
  const permissionCheck = await hasPermission(permissionRequest)(req, user);

  if (!permissionCheck.isAuthorized) {
    return NextResponse.json(
      { error: permissionCheck.error || ERROR_MESSAGES.UNAUTHORIZED },
      { status: 403 },
    );
  }

  return null;
}
