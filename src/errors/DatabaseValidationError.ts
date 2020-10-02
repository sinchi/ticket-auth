export class DatabaseConnectionError extends Error {

  private reason: string;

  constructor(reason: string = 'Error connecting to database') {
    super();
    this.reason = reason;

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }


  getReason() {
    return this.reason;
  }
}