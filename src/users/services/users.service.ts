import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";

import { User } from "../models/user.model";
import { UsersFactory } from "../factories/users.factory";
import { CreateUserCommand } from "../commands/create-user.command";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly usersFactory: UsersFactory
  ) {}

  async findAll(
    limit: number = 25,
    offset: number = 0
  ): Promise<[User[], number]> {
    const [users, total] = await this.userRepository.findAndCount(
      {},
      { limit, offset }
    );
    return [users, total];
  }

  async findOne(id: string): Promise<User> {
    const user: User = await this.userRepository.findOneOrFail(id);

    return user;
  }

  async create(createUserCommand: CreateUserCommand): Promise<User> {
    const user: User = await this.usersFactory.create(createUserCommand);
    await this.userRepository.persistAndFlush(user);

    return user;
  }

  async edit(
    editUserCommand: EditUserCommand
  ): Promise<User> {
    const user: User = await this.userRepository.findOneOrFail(editUserCommand.id);
    user.email = editUserCommand.email;
    user.firstName = editUserCommand.firstName;
    user.lastName = editUserCommand.lastName;
    await this.userRepository.flush();

    return user;
  }

  async delete(id: string): Promise<boolean> {
    const user: User = await this.userRepository.findOneOrFail(id);
    user.deletedAt = new Date();
    await this.userRepository.flush();

    return true;
  }
}
