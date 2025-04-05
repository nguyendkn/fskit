import { GetDataSource } from '@/lib/db';
import { User } from '@/lib/db/entities/User';
import { UserCreate } from '@/features/users/schemas/userSchema';

// User repository
const dataSource = await GetDataSource();
const userRepository = dataSource.getRepository(User);

/**
 * Get all users
 */
export async function getAllUsers() {
  try {
    const users = await userRepository.find();
    return { success: true, data: users };
  } catch (error) {
    console.error('Error fetching users:', error);
    return { success: false, error: 'Failed to fetch users' };
  }
}

/**
 * Get user by ID
 */
export async function getUserById(id: string) {
  try {
    const user = await userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    return { success: true, data: user };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { success: false, error: 'Failed to fetch user' };
  }
}

/**
 * Create a new user
 */
export async function createUser(userData: UserCreate) {
  try {
    // Check if user already exists
    const existingUser = await userRepository.findOne({
      where: { email: userData.email },
    });

    if (existingUser) {
      return { success: false, error: 'Email already in use' };
    }

    // Create new user
    const newUser = userRepository.create(userData);

    // Save to database
    await userRepository.save(newUser);

    return { success: true, data: newUser };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, error: 'Failed to create user' };
  }
}

/**
 * Update a user
 */
export async function updateUser(id: string, userData: Partial<UserCreate>) {
  try {
    // Check if user exists
    const user = await userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Check email uniqueness if trying to update email
    if (userData.email && userData.email !== user.email) {
      const existingUser = await userRepository.findOne({
        where: { email: userData.email },
      });

      if (existingUser) {
        return { success: false, error: 'Email already in use' };
      }
    }

    // Update user
    const updatedUser = await userRepository.save({
      ...user,
      ...userData,
    });

    return { success: true, data: updatedUser };
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, error: 'Failed to update user' };
  }
}

/**
 * Delete a user
 */
export async function deleteUser(id: string) {
  try {
    // Check if user exists
    const user = await userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Delete user
    await userRepository.remove(user);

    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, error: 'Failed to delete user' };
  }
}
