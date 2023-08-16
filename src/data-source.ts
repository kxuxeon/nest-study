import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Cat } from './cats/cats.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'kayden',
  password: '1234',
  database: 'catdb',
  synchronize: true,
  logging: false,
  entities: [Cat],
  migrations: [],
  subscribers: [],
});
