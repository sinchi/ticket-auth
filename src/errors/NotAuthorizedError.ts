import { CustomError } from "./CustomError";

export class NotAuthorizedError extends CustomError {

  statusCode = 401;

  constructor(){
    super('Not authorized error');
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined; }[] {
    return [{ message: 'Not Authorized' }]
  }
  
}