import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { setupPostgresContainer } from '../helpers/setup-postgres-container';
import { setupNestApp } from '../helpers/setup-nest-app';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql/build/postgresql-container';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let pgContainer: StartedPostgreSqlContainer;

  beforeAll(async () => {
    pgContainer = await setupPostgresContainer();
    app = await setupNestApp(pgContainer);
  });

  afterAll(async () => {
    await app.close();
    await pgContainer.stop();
  });

  it('/auth/signUp (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signUp')
      .send({ username: 'testuser', password: 'testpass' })
      .expect(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('username', 'testuser');
  });

  it('/auth/signIn (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signIn')
      .send({ username: 'testuser', password: 'testpass' })
      .expect(200);

    expect(response.body).toHaveProperty('access_token');
  });
});
