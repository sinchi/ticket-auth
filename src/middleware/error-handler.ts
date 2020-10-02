import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from '../errors/RequestConnectionError';
import { DatabaseConnectionError } from '../errors/DatabaseValidationError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

  if(err instanceof RequestValidationError) {
    const formattedErrors = err.errors.map(error => {
      return {
        message: error.msg,
        field: error.param
      }
    })

    res.status(400).send({
      errors: formattedErrors
    })

  }

  if(err instanceof DatabaseConnectionError) {
    const formattedErrors = {
      message: err.getReason()
    }

    res.status(500).send({
      errors: [formattedErrors]
    })
  }
  
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }]
  });
}