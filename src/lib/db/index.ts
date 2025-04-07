// /src/lib/db/index.ts
import { DataSource } from 'typeorm';
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
    }
    return Connection;
  } catch (error) {
    console.error('Error initializing database connection', error);
    throw error;
  }
}

export async function SeedData(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);
}
