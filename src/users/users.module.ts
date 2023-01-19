import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { User } from "./models/user.model";
import { UsersController } from "./http/controllers/users.controller";
import { UserFactory } from "./factories/user.factory";
import { UsersService } from "./services/users.service";
import { UserCreatedRedisListener } from "./redist-listeners/user-created.redis-listener";

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserFactory, UserCreatedRedisListener],
})
export class UsersModule {}
