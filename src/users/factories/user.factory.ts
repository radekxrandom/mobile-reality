import { CreateUserCommand } from "../commands/create-user.command";
import { User } from "../models/user.model";

export class UserFactory {
  create(createUserCommand: CreateUserCommand) {
    const { email, firstName, lastName } = createUserCommand;
    const user = new User();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    return user;
  }
}
