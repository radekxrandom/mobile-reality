export class CreateUserCommand {
  email: string;
  firstName: string;
  lastName: string;
  constructor(email: string, firstName: string, lastName: string) {
    if (!email || !firstName || !lastName) {
      throw new Error(); // ValidationException
    }

    if (!email.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)) {
      throw new Error(""); // ValidationException
    }

    if (typeof firstName !== "string" || typeof lastName !== "string") {
      throw new Error(""); // ValidationException
    }

    if (firstName.length >= 50 || lastName.length >= 50) {
      throw new Error(""); // ValidationException
    }
  }
}
