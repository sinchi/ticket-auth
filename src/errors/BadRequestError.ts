import { SerializeError } from "./SerializeError";

export class BadRequestError extends SerializeError {

  statusCode = 400;

constructor(public message: string) {
  super();
  Object.setPrototypeOf(this, BadRequestError.prototype);
}

  serializeErrors(): { message: string; field?: string | undefined; }[] {
    return [{ message: this.message }]
  }
  
}