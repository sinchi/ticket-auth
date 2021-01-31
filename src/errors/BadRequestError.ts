import { CustomError } from './CustomError';

export class BadRequestError extends CustomError {
  
  statusCode = 400;
  
  constructor(public message: string, public param?: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined; }[] {
    return [{ message: this.message, field: this.param }]
  }


}