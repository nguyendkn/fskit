// /src/lib/db/index.ts
import { DataSource } from 'typeorm';
import { hash } from 'bcryptjs';
import { User } from './entities/User';
import { Role } from './entities/Role';
import { Permission } from './entities/Permission';

export const Connection = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV !== 'production',
  entities: [User, Role, Permission],
  subscribers: [],
});

export async function GetDataSource() {
  try {
    if (!Connection.isInitialized) {
      const dataSource = await Connection.initialize();
      await SeedData(dataSource);
    }
    return Connection;
  } catch (error) {
    console.error('Error initializing database connection', error);
    throw error;
  }
}

export async function SeedData(dataSource: DataSource) {
  debugger;
  const userRepository = dataSource.getRepository(User);
  const roleRepository = dataSource.getRepository(Role);
  const permissionRepository = dataSource.getRepository(Permission);

  const adminRole = await roleRepository.findOne({
    where: { name: 'admin' },
  });

  if (!adminRole) {
    const adminRole = new Role();
    adminRole.name = 'admin';
    await roleRepository.save(adminRole);
  }

  const adminUser = await userRepository.findOne({
    where: { email: 'admin@example.com' },
  });

  if (!adminUser) {
    const adminUser = new User();
    adminUser.name = 'admin';
    adminUser.email = 'admin@example.com';
    adminUser.passwordHash = await hash('Pass@w0rd', 10);
    await userRepository.save(adminUser);
  }

  const adminUserRole = await roleRepository.findOne({
    where: { name: 'admin' },
  });
}
