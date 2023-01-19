import { RedisClient } from "nestjs-redis";
import { CreateUserCommand } from "../commands/create-user.command";
import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { UsersService } from "../services/users.service";

@Injectable()
export class UserCreatedRedisListener implements OnApplicationBootstrap {
  constructor(
    private readonly redisClient: RedisClient,
    private readonly usersService: UsersService
  ) {}
  onApplicationBootstrap() {
    this.listenToRedis();
  }

  listenToRedis() {
    this.redisClient.on("message", async (channel, message) => {
      const userProperties = JSON.parse(message);
      const { email, firstName, lastName } = userProperties;
      const createUserCommand = new CreateUserCommand(
        email,
        firstName,
        lastName
      );
      await this.usersService.create(createUserCommand);
    });
    this.redisClient.subscribe("CREATE_USER");
  }
}
