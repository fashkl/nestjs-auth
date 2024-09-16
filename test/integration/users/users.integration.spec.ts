import { INestApplication } from '@nestjs/common';
import { UsersService } from '../../../src/users/users.service';
import { setupPostgresContainer } from '../helpers/setup-postgres-container';
import { setupNestApp } from '../helpers/setup-nest-app';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql/build/postgresql-container';

describe('UsersService (e2e)', () => {
  let app: INestApplication;
  let pgContainer: StartedPostgreSqlContainer;
  let usersService: UsersService;

  beforeAll(async () => {
    pgContainer = await setupPostgresContainer();
    app = await setupNestApp(pgContainer);
    usersService = app.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await app.close();
    await pgContainer.stop();
  });

  it('should create a new user', async () => {
    const user = await usersService.create({
      username: 'testuser1',
      password: 'testpass',
    });
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('username', 'testuser1');
  });

  it('should find a user by username', async () => {
    await usersService.create({ username: 'testuser2', password: 'testpass' });
    const user = await usersService.findOneByUsername('testuser2');
    expect(user).toBeDefined();
    expect(user.username).toBe('testuser2');
  });

  it('should validate user credentials', async () => {
    await usersService.create({ username: 'testuser3', password: 'testpass' });
    const user = await usersService.validateCredentials({
      username: 'testuser3',
      password: 'testpass',
    });
    expect(user).toBeDefined();
    expect(user.username).toBe('testuser3');
  });
});
