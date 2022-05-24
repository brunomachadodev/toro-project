import { DataSource } from 'typeorm';

export const AccountDataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'toro',
  entities: ['dist/**/*.entity.{js,ts}'],
  migrations: ['dist/database/migrations/**/*.{js,ts}'],
  synchronize: false,
});
