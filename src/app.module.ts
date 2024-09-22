import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/databaseModule';
import { LoggerModule } from 'nestjs-pino';
import { EnvModule } from './env/env.module';

@Module({
  imports: [
    LoggerModule.forRoot({}),
    EnvModule,
    AuthModule,
    UsersModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
