import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../src/users/users.entity';
import { AuthModule } from '../../../src/auth/auth.module';
import { DataSource } from 'typeorm';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql/build/postgresql-container';

export async function setupNestApp(
  pgContainer: StartedPostgreSqlContainer,
): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: pgContainer.getHost(),
        port: pgContainer.getMappedPort(5432),
        username: pgContainer.getUsername(),
        password: pgContainer.getPassword(),
        database: pgContainer.getDatabase(),
        entities: [User],
        synchronize: true,
      }),
      AuthModule,
    ],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();

  // Run migrations
  const dataSource = new DataSource({
    type: 'postgres',
    host: pgContainer.getHost(),
    port: pgContainer.getMappedPort(5432),
    username: pgContainer.getUsername(),
    password: pgContainer.getPassword(),
    database: pgContainer.getDatabase(),
    entities: [User],
    migrations: [`${__dirname}/../../../src/migrations/*{.ts,.js}`],
  });

  await dataSource.initialize();
  await dataSource.dropDatabase();
  await dataSource.runMigrations();
  await dataSource.destroy();

  return app;
}
