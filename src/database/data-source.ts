import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { EnvService } from '../env/env.service';
import { EnvModule } from '../env/env.module';
import { NestFactory } from '@nestjs/core';

async function createDataSource() {
  const app = await NestFactory.createApplicationContext(EnvModule);
  const envService = app.get(EnvService);

  const isTesting = envService.get('NODE_ENV') === 'test';

  console.info('Creating data source...');
  return new DataSource({
    type: 'postgres',
    host: envService.get('POSTGRES_HOST'),
    port: envService.get('POSTGRES_PORT'),
    username: envService.get('POSTGRES_USER'),
    password: envService.get('POSTGRES_PASSWORD'),
    database: isTesting ? 'tests' : envService.get('POSTGRES_DB'),
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
    synchronize: false,
    logging: true,
  });
}

export const AppDataSource = createDataSource()
  .then((dataSource) => dataSource)
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
