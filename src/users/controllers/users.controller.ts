import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';

import { NotFoundExceptionFilter } from '../../not-found-exception.filter';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';
import { PaginatedResourcesDto } from '../dto/paginated-resources.dto';
import { createPaginatedResources } from '..//utility/createPaginatedResources';
import { User } from '..//models/user.model';

@Controller('users')
@UseFilters(new NotFoundExceptionFilter())
export class UsersController {
  constructor(
    private readonly paypalService: PaypalService,
    private readonly usersService: UsersService,
  ) {}

  @Get('')
  async findAll(
    @Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): Promise<PaginatedResourcesDto<User[]>> {
    const [users, total] = await this.usersService.findAll(limit, offset);
    const paginatedUsers = createPaginatedResources(
      limit,
      offset,
      total,
      users,
    );

    return paginatedUsers;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user: User = await this.usersService.findOne(id)

    return user;
  }

  @Post('')
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    const user: User = await this.usersService.create(CreateUserDto);

    return user;
  }
}