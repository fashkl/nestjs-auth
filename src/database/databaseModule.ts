import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvService } from '../env/env.service';
import { EnvModule } from '../env/env.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory(env: EnvService) {
        const isTesting = env.get('NODE_ENV') === 'test';
        return {
          type: 'postgres',
          host: env.get('POSTGRES_HOST'),
          port: env.get('POSTGRES_PORT'),
          username: env.get('POSTGRES_USER'),
          password: env.get('POSTGRES_PASSWORD'),
          database: isTesting ? 'tests' : env.get('POSTGRES_DB'),
          entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
          migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
          synchronize: false,
          migrationsRun: false,
          logging: true,
          keepConnectionAlive: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
