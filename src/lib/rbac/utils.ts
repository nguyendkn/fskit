import { JWTUserWithRoles } from './types';
import { verify, sign } from 'jsonwebtoken';
import { GetDataSource } from '../db';
import { User } from '../db/entities/User';
import { Permission } from '../db/entities/Permission';

// JWT Secret (move to env variable in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
const JWT_EXPIRES_IN = '7d';

/**
 * Extend JWT token with roles and permissions
 */
export async function createTokenWithRolesAndPermissions(user: User): Promise<string> {
  try {
    const dataSource = await GetDataSource();
    const userRepository = dataSource.getRepository(User);

    // Get user with roles and permissions
    const userWithRoles = await userRepository.findOne({
      where: { id: user.id },
      relations: ['roles', 'roles.permissions'],
    });

    if (!userWithRoles) {
      throw new Error('User not found');
    }

    // Extract role names
    const roleNames = userWithRoles.roles?.map((role) => role.name) || [];

    // Extract permission names from all roles
    const permissionNames: string[] = [];
    for (const role of userWithRoles.roles || []) {
      for (const permission of role.permissions || []) {
        if (!permissionNames.includes(permission.name)) {
          permissionNames.push(permission.name);
        }
      }
    }

    // Create token with roles and permissions
    const token = sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: roleNames,
        permissions: permissionNames,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    return token;
  } catch (error) {
    console.error('Error creating token with roles:', error);
    throw error;
  }
}

/**
 * Parse JWT token and extract user with roles and permissions
 */
export function parseJWTWithRoles(token: string): JWTUserWithRoles | null {
  try {
    const decoded = verify(token, JWT_SECRET);
    return decoded as JWTUserWithRoles;
  } catch (error) {
    console.error('Error parsing JWT with roles:', error);
    return null;
  }
}

/**
 * Format permission for display or logging
 */
export function formatPermission(permission: Permission): string {
  return `${permission.resource}:${permission.action}`;
}

/**
 * Check if a permission name matches a resource:action pair
 */
export function matchPermission(permissionName: string, resource: string, action: string): boolean {
  // Direct match with the format "resource:action"
  if (permissionName === `${resource}:${action}`) {
    return true;
  }

  // Wildcard for all actions on a resource: "resource:*"
  if (permissionName === `${resource}:*`) {
    return true;
  }

  // Wildcard for all resources with a specific action: "*:action"
  if (permissionName === `*:${action}`) {
    return true;
  }

  // Super admin wildcard: "*:*"
  if (permissionName === '*:*') {
    return true;
  }

  return false;
}

/**
 * Format a list of permissions for display
 */
export function formatPermissionList(permissions: Permission[]): string[] {
  return permissions.map((p) => formatPermission(p));
}
