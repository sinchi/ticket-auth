export abstract class SerializeError extends Error {

  abstract statusCode: number;

  constructor() {
    super();
    
    Object.setPrototypeOf(this, SerializeError.prototype)
  }


  abstract serializeErrors(): Array<{ message: string, field?: string }>;

}