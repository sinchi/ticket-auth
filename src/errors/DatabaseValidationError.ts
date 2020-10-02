import { SerializeError } from "./SerializeError";

export class DatabaseConnectionError extends SerializeError {
  

  statusCode = 500;

  constructor(public reason: string = 'Error connecting to database') {
    super();
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }


  serializeErrors(): { message: string; field?: string | undefined; }[] {
    return [{ message: this.reason }]
  }

}