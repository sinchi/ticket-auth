import { CustomError } from "./CustomError";

export class DatabaseConnectionError extends CustomError {
  
  statusCode = 500;

  constructor(public reason: string = 'Error connecting to database') {
    super('Database connection error');
     Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined; }[] {
    return [{ message: this.reason }]
  }

}