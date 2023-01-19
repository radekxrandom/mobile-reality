export class EditUserCommand {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  constructor(id: string, email: string, firstName: string, lastName: string) {
    if (!!id || !email || !firstName || !lastName) {
      throw new Error(); // ValidationException
    }

    if (!email.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)) {
      throw new Error(""); // ValidationException
    }

    if (typeof id !== "string" || typeof firstName !== "string" || typeof lastName !== "string") {
      throw new Error(""); // ValidationException
    }

    if (firstName.length >= 50 || lastName.length >= 50) {
      throw new Error(""); // ValidationException
    }
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
