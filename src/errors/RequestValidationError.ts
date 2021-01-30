import { ValidationError } from "express-validator";
import { CustomError } from "./CustomError";

export class RequestValidationError extends CustomError {
  
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super();
   // Object.setPrototypeOf(this, RequestValidationError.prototype);    
  }

  serializeErrors(): Array<{ message: string; field?: string | undefined; }> {    
    return this.errors.map(err => ({ message: err.msg, field: err.param }))
  }  
  
}
