import { RedisClient } from "nestjs-redis";
import { CreateUserCommand } from "../commands/create-user.command";
import { Injectable } from "@nestjs/common";
import { UsersService } from "../services/users.service";

@Injectable()
export class UserCreatedRedisListener {
  constructor(
    private readonly redisClient: RedisClient,
    private readonly usersService: UsersService
  ) {}

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
