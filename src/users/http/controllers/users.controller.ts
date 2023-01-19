import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseFilters,
} from "@nestjs/common";

import { NotFoundExceptionFilter } from "../../../shared/exception-filters/not-found-exception.filter";
import { CreateUserHttpRequest } from "../requests/create-user.http-request";
import { UsersService } from "../../services/users.service";
import { PaginatedResourcesDto } from "../responses/paginated-resources.http-response";
import { createPaginatedResources } from "../../utility/createPaginatedResources";
import { User } from "../../models/user.model";
import { UserHttpResponse } from "../responses/user.http-response";
import { EditUserHttpRequest } from "../requests/edit-user.http-request";
import { CreateUserCommand } from "src/users/commands/create-user.command";
import { EditUserCommand } from "src/users/commands/edit-user.command";

@Controller("users")
@UseFilters(new NotFoundExceptionFilter())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("")
  async findAll(
    @Query("limit", new DefaultValuePipe(25), ParseIntPipe) limit: number,
    @Query("offset", new DefaultValuePipe(0), ParseIntPipe) offset: number
  ): Promise<PaginatedResourcesDto<User[]>> {
    const [users, total] = await this.usersService.findAll(limit, offset);
    const paginatedUsers = createPaginatedResources(
      limit,
      offset,
      total,
      users
    );

    return paginatedUsers;
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<UserHttpResponse> {
    const user: User = await this.usersService.findOne(id);

    const userResponse = new UserHttpResponse(
      user.id,
      user.email,
      user.firstName,
      user.lastName
    );
    return userResponse;
  }

  @Post("")
  async create(
    @Body() createUserHttpRequest: CreateUserHttpRequest
  ): Promise<UserHttpResponse> {
    const createUserCommand = new CreateUserCommand(
      createUserHttpRequest.email,
      createUserHttpRequest.firstName,
      createUserHttpRequest.lastName
    );
    const user: User = await this.usersService.create(createUserCommand);

    const userResponse = new UserHttpResponse(
      user.id,
      user.email,
      user.firstName,
      user.lastName
    );
    return userResponse;
  }

  @Patch(":id")
  async edit(
    @Param("id") id: string,
    @Body() editUserHttpRequest: EditUserHttpRequest
  ): Promise<UserHttpResponse> {
    const editUserCommand = new EditUserCommand(id, editUserHttpRequest.email, editUserHttpRequest.firstName, editUserHttpRequest.lastName)
    const user: User = await this.usersService.edit(
      editUserCommand
    );

    const userResponse = new UserHttpResponse(
      user.id,
      user.email,
      user.firstName,
      user.lastName
    );
    return userResponse;
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<boolean> {
    const result = await this.usersService.delete(id);

    return result;
  }
}
