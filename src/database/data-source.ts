import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

require('dotenv').config();

const config: ConfigService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.get('POSTGRES_HOST'),
  port: config.get('POSTGRES_PORT'),
  username: config.get('POSTGRES_USER'),
  password: config.get('POSTGRES_PASSWORD'),
  database: config.get('POSTGRES_DB'),
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
  synchronize: false,
});
