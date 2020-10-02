import { SerializeError } from "./SerializeError";

export class NotFoundError extends SerializeError {

  statusCode = 404;
  constructor(){
    super();

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined; }[] {
    return [{ message: 'Not found' }]
  }
  
}