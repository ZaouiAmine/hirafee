import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  reason = "Error connecting to the databse";
  statusCode = 500;
  constructor(public errors: ValidationError[]) {
    super("database connection error");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors() {
    return [{ message: this.reason }];
  }
}
