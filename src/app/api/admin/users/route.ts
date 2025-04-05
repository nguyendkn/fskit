import { NextRequest, NextResponse } from 'next/server';
import { withPermission } from '@/lib/rbac';
import { getAllUsers } from '@/features/users/services/userService';
import { JWTUserWithRoles } from '@/lib/rbac/types';
import { assignRoleToUser, removeRoleFromUser } from '@/features/auth/services/authService';
import { GetDataSource } from '@/lib/db';

// Initialize database connection if not already initialized
const ensureDbConnection = async () => {
  await GetDataSource();
};

// GET /api/admin/users - Get all users (requires user:read permission)
export const GET = withPermission(async (request: NextRequest) => {
  try {
    await ensureDbConnection();

    const result = await getAllUsers();

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}, 'user:read');

// POST /api/admin/users/roles - Assign a role to a user (requires user:update permission)
export const POST = withPermission(async (request: NextRequest) => {
  try {
    await ensureDbConnection();

    const body = await request.json();
    const { userId, roleId } = body;

    if (!userId || !roleId) {
      return NextResponse.json({ error: 'User ID and Role ID are required' }, { status: 400 });
    }

    const result = await assignRoleToUser(userId, roleId);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Role assigned successfully' });
  } catch (error) {
    console.error('Error assigning role:', error);
    return NextResponse.json({ error: 'Failed to assign role' }, { status: 500 });
  }
}, 'user:update');

// DELETE /api/admin/users/roles - Remove a role from a user (requires user:update permission)
export const DELETE = withPermission(async (request: NextRequest) => {
  try {
    await ensureDbConnection();

    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const roleId = url.searchParams.get('roleId');

    if (!userId || !roleId) {
      return NextResponse.json({ error: 'User ID and Role ID are required' }, { status: 400 });
    }

    const result = await removeRoleFromUser(userId, roleId);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Role removed successfully' });
  } catch (error) {
    console.error('Error removing role:', error);
    return NextResponse.json({ error: 'Failed to remove role' }, { status: 500 });
  }
}, 'user:update');
