import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql/build/postgresql-container';

export async function setupPostgresContainer(): Promise<StartedPostgreSqlContainer> {
  return await new PostgreSqlContainer('postgres')
    .withExposedPorts(5432)
    .withDatabase('test')
    .withUsername('test')
    .withPassword('test')
    .start();
}
