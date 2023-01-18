import { CreateUserDto } from "../dto/create-user.dto";
import { User } from '../models/user.model';

export class UsersFactory {
  create(createUserDto: CreateUserDto) {
    const { email, firstName, lastName } = createUserDto;
    const user = new User();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    return user;
  }
}