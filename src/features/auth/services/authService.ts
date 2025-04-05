import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { GetDataSource } from '@/lib/db';
import { User } from '@/lib/db/entities/User';
import { LoginCredentials, UserCreate } from '@/features/users/schemas/userSchema';
import { createTokenWithRolesAndPermissions } from '@/lib/rbac/utils';

// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
const JWT_EXPIRES_IN = '7d';

// Error messages
const ERROR_MESSAGES = {
  USER_NOT_FOUND: 'User not found',
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_IN_USE: 'Email already in use',
  INVALID_TOKEN: 'Invalid authentication token',
  SERVER_ERROR: 'Authentication error occurred',
};

/**
 * Get user repository
 */
async function getUserRepository() {
  const connection = await GetDataSource();
  return connection.getRepository(User);
}

/**
 * Login a user with email and password
 */
export async function loginUser(credentials: LoginCredentials) {
  try {
    const userRepository = await getUserRepository();

    // Find user by email with password included
    const user = await userRepository.findOne({
      where: { email: credentials.email },
      select: ['id', 'email', 'name', 'password', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      return { success: false, error: ERROR_MESSAGES.INVALID_CREDENTIALS };
    }

    // Verify password
    const isValidPassword = await compare(credentials.password, user.password);
    if (!isValidPassword) {
      return { success: false, error: ERROR_MESSAGES.INVALID_CREDENTIALS };
    }

    // Generate JWT token with roles and permissions
    const token = await createTokenWithRolesAndPermissions(user);

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return {
      success: true,
      data: {
        user: userWithoutPassword,
        token,
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: ERROR_MESSAGES.SERVER_ERROR };
  }
}

/**
 * Register a new user
 */
export async function registerUser(userData: UserCreate) {
  try {
    const userRepository = await getUserRepository();

    // Check if user already exists
    const existingUser = await userRepository.findOne({
      where: { email: userData.email },
    });

    if (existingUser) {
      return { success: false, error: ERROR_MESSAGES.EMAIL_IN_USE };
    }

    // Hash password
    const hashedPassword = await hash(userData.password as string, 10);

    // Create new user
    const newUser = userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    // Save to database
    await userRepository.save(newUser);

    // Remove password from response
    const { password, ...userWithoutPassword } = newUser;

    return {
      success: true,
      data: userWithoutPassword,
    };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: ERROR_MESSAGES.SERVER_ERROR };
  }
}

/**
 * Verify a JWT token
 */
export async function verifyToken(token: string) {
  try {
    const decoded = await new Promise((resolve, reject) => {
      verify(token, JWT_SECRET, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    });

    return { success: true, data: decoded };
  } catch (error) {
    console.error('Token verification error:', error);
    return { success: false, error: ERROR_MESSAGES.INVALID_TOKEN };
  }
}

/**
 * Get a user by ID
 */
export async function getUserById(id: string) {
  try {
    const userRepository = await getUserRepository();

    // Find user with roles
    const user = await userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });

    if (!user) {
      return { success: false, error: ERROR_MESSAGES.USER_NOT_FOUND };
    }

    return { success: true, data: user };
  } catch (error) {
    console.error('Get user error:', error);
    return { success: false, error: ERROR_MESSAGES.SERVER_ERROR };
  }
}

/**
 * Assign a role to a user
 */
export async function assignRoleToUser(userId: string, roleId: string) {
  try {
    const dataSource = await GetDataSource();
    await dataSource.query(`INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)`, [
      userId,
      roleId,
    ]);

    return { success: true };
  } catch (error) {
    console.error('Error assigning role to user:', error);
    return { success: false, error: 'Failed to assign role to user' };
  }
}

/**
 * Remove a role from a user
 */
export async function removeRoleFromUser(userId: string, roleId: string) {
  try {
    const dataSource = await GetDataSource();
    await dataSource.query(`DELETE FROM user_roles WHERE user_id = $1 AND role_id = $2`, [
      userId,
      roleId,
    ]);

    return { success: true };
  } catch (error) {
    console.error('Error removing role from user:', error);
    return { success: false, error: 'Failed to remove role from user' };
  }
}
