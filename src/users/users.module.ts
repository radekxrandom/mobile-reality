import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { User } from './models/user.model';
import { UsersController } from './controllers/users.controller';
import { UsersFactory } from './factories/users.factory';
import { UsersService } from './services/users.service';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersFactory],
})
export class UsersModule {}