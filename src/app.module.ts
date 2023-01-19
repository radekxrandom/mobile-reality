import { Module } from "@nestjs/common";
import { RedisModule } from "nestjs-redis";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { BaseSoftDeletable } from "./users/models/base-soft-deletable.model";
import { User } from "./users/models/user.model";
import { BaseModel } from "./users/models/base.model";
import { migrationsList } from "./database/migrations";
import { MigrationRunner } from "./database/migrator";

@Module({
  imports: [
    RedisModule.register({
      host: "localhost", // should use env and configService
      port: 6379,
    }),
    MikroOrmModule.forRoot({
      type: "postgresql",
      host: "localhost",
      port: 5432,
      user: "user",
      password: "password",
      dbName: "dbname",
      entities: [BaseModel, BaseSoftDeletable, User],
    }),
  ],
  providers: [MigrationRunner],
})
export class AppModule {}
