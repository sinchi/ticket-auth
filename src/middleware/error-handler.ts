import { NextFunction, Request, Response } from "express";
import { SerializeError } from "../errors/SerializeError";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

  if(err instanceof SerializeError) {    
    return res.status(err.statusCode).send({ errors: err.serializeErrors() })
  }

  res.status(400).send({
    errors: [{ message: 'Something went wrong' }]
  });
}