import { GetDataSource } from '../db';
import { User } from '../db/entities/User';
import { Role } from '../db/entities/Role';
import { Permission } from '../db/entities/Permission';
import {
  PermissionRequest,
  PermissionCheckResult,
  ResourceAction,
  PermissionResponse,
} from './types';

/**
 * Get a user with their roles and permissions
 */
export async function getUserWithRolesAndPermissions(userId: string): Promise<PermissionResponse> {
  try {
    const dataSource = await GetDataSource();
    const userRepository = dataSource.getRepository(User);

    // Find user with roles
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ['roles', 'roles.permissions'],
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Extract roles and permissions
    const roles = user.roles || [];

    // Flatten permissions from all roles
    const permissions: Permission[] = [];
    for (const role of roles) {
      if (role.permissions) {
        permissions.push(...role.permissions);
      }
    }

    return {
      success: true,
      user,
      roles,
      permissions,
    };
  } catch (error) {
    console.error('Error getting user permissions:', error);
    return { success: false, error: 'Failed to get user permissions' };
  }
}

/**
 * Check if a user has the specified permission(s)
 */
export async function checkUserPermission(
  userId: string,
  permissionRequest: PermissionRequest,
): Promise<PermissionCheckResult> {
  try {
    // Get user with roles and permissions
    const userPermissions = await getUserWithRolesAndPermissions(userId);

    if (!userPermissions.success || !userPermissions.permissions) {
      return { hasPermission: false };
    }

    const permissions = userPermissions.permissions;

    // Handle array of permission requests
    if (Array.isArray(permissionRequest)) {
      const missingPermissions: string[] = [];

      for (const request of permissionRequest) {
        const result = checkPermission(permissions, request);
        if (!result.hasPermission) {
          if (typeof request === 'string') {
            missingPermissions.push(request);
          } else {
            missingPermissions.push(`${request.resource}:${request.action}`);
          }
        }
      }

      return {
        hasPermission: missingPermissions.length === 0,
        missingPermissions: missingPermissions.length > 0 ? missingPermissions : undefined,
      };
    }

    // Handle single permission request
    return checkPermission(permissions, permissionRequest);
  } catch (error) {
    console.error('Error checking user permission:', error);
    return { hasPermission: false };
  }
}

/**
 * Check if permissions include the requested permission
 */
function checkPermission(
  permissions: Permission[],
  permissionRequest: string | ResourceAction,
): PermissionCheckResult {
  // If permission is a string like "user:read"
  if (typeof permissionRequest === 'string') {
    // Check if the permission exists by name
    if (permissions.some((p) => p.name === permissionRequest)) {
      return { hasPermission: true };
    }

    // If the string is in format "resource:action", split and check
    const [resource, action] = permissionRequest.split(':');
    if (resource && action) {
      return checkResourceAction(permissions, { resource, action });
    }

    return { hasPermission: false };
  }

  // If permission is a resource action object
  return checkResourceAction(permissions, permissionRequest);
}

/**
 * Check if permissions include the requested resource action
 */
function checkResourceAction(
  permissions: Permission[],
  { resource, action }: ResourceAction,
): PermissionCheckResult {
  return {
    hasPermission: permissions.some((p) => p.resource === resource && p.action === action),
  };
}

/**
 * Get all permissions for a role
 */
export async function getRolePermissions(roleId: string): Promise<PermissionResponse> {
  try {
    const dataSource = await GetDataSource();
    const roleRepository = dataSource.getRepository(Role);

    const role = await roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });

    if (!role) {
      return { success: false, error: 'Role not found' };
    }

    return {
      success: true,
      roles: [role],
      permissions: role.permissions || [],
    };
  } catch (error) {
    console.error('Error getting role permissions:', error);
    return { success: false, error: 'Failed to get role permissions' };
  }
}

/**
 * Check if a role has the specified permission
 */
export async function checkRolePermission(
  roleId: string,
  permissionRequest: PermissionRequest,
): Promise<PermissionCheckResult> {
  try {
    // Get role with permissions
    const rolePermissions = await getRolePermissions(roleId);

    if (!rolePermissions.success || !rolePermissions.permissions) {
      return { hasPermission: false };
    }

    // Check permissions using the same logic as for users
    if (Array.isArray(permissionRequest)) {
      const missingPermissions: string[] = [];

      for (const request of permissionRequest) {
        const result = checkPermission(rolePermissions.permissions, request);
        if (!result.hasPermission) {
          if (typeof request === 'string') {
            missingPermissions.push(request);
          } else {
            missingPermissions.push(`${request.resource}:${request.action}`);
          }
        }
      }

      return {
        hasPermission: missingPermissions.length === 0,
        missingPermissions: missingPermissions.length > 0 ? missingPermissions : undefined,
      };
    }

    return checkPermission(rolePermissions.permissions, permissionRequest);
  } catch (error) {
    console.error('Error checking role permission:', error);
    return { hasPermission: false };
  }
}
