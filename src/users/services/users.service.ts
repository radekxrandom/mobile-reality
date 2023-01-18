import { EntityRepository, QueryUser } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { RedisClient } from '@nestjs-redis/core';

import { User } from '../models/user.model';
import { UsersFactory } from '../factories/users.factory';
import { CreateUserDto } from '../dto/create-user.dto';
import { EditUserDto } from '../dto/edit-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly usersFactory: UsersFactory,
    private readonly redisClient: RedisClient
  ) {}
  
  async findAll(
    limit: number = 25,
    offset: number = 0,
  ): Promise<[User[], number]> {
    const [users, total] = await this.userRepository.findAndCount(
      {},
      [],
      { createdAt: QueryUser.DESC },
      limit,
      offset,
    );
    return [users, total];
  }

  async findOne(id: string): Promise<User> {
    const user: User = await this.userRepository.findOneOrFail(id);

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = await this.usersFactory.create(createUserDto);
    await this.userRepository.persistAndFlush(user);

    return user;
  }

  async edit(editUserDto: EditUserDto): Promise<User> {
    const user: User = await this.userRepository.findOneOrFail(
      editUserDto.id,
    );
    for (let property in user) {
      user[property] = editUserDto[property];
    }
    await this.userRepository.flush();
    return user;
  }

  async delete(id: string): Promise<boolean> {
    const user: User = await this.userRepository.findOneOrFail(
      id,
    );
    user.deletedAt = new Date();
    await this.userRepository.flush();

    return true;
  }

  listenToRedis() {
    this.redisClient.on('message', async (channel, message) => {
      const userDto = new CreateUserDto();
      const userProperties = JSON.parse(message)
      for (let property in userProperties) {
        userDto[property] = userProperties[property];
      }
      await this.create(userDto);
    });
    this.redisClient.subscribe('CREATE_USER');
  }
}