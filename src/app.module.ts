import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-redis';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BaseSoftDeletable } from './users/models/base-soft-deletable.model';
import { User } from './users/models/user.model';
import { BaseModel } from './users/models/base.model';
import { migrationsList } from './database/migrations';
import { MigrationRunner } from './database/migrator';

@Module({
  imports: [RedisModule.forRoot({
    host: 'localhost', // should use env and configService
    port: 6379,
  }), MikroOrmModule.forRoot({
    type: 'postgresql',
    host: 'localhost',
    port: 5432,
    username: 'user',
    password: 'password',
    database: 'dbname',
    entities: [BaseModel,
      BaseSoftDeletable,
      User],
    synchronize: true,
  }),],
  providers: [MigrationRunner],
})
export class AppModule {}
