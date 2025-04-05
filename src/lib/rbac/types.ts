import { User } from '../db/entities/User';
import { Role } from '../db/entities/Role';
import { Permission } from '../db/entities/Permission';

// Extended JWT User with roles and permissions
export interface JWTUserWithRoles {
  id: string;
  email: string;
  name: string;
  roles?: string[];
  permissions?: string[];
  [key: string]: unknown;
}

// Permission check result
export interface PermissionCheckResult {
  hasPermission: boolean;
  missingPermissions?: string[];
}

// Resource and action
export type ResourceAction = {
  resource: string;
  action: string;
};

// Permission request with either permission name or resource/action
export type PermissionRequest = string | ResourceAction | (string | ResourceAction)[];

// Permission service response
export interface PermissionResponse {
  success: boolean;
  hasPermission?: boolean;
  user?: User;
  roles?: Role[];
  permissions?: Permission[];
  error?: string;
}
