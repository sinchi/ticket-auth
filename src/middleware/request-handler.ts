import { NextFunction, Request, Response } from "express";

import { validationResult } from 'express-validator'
import { BadRequestError } from "../errors/BadRequestError";

const requestValidation = (req: Request, res: Response, next: NextFunction) => {

  const errors = validationResult(req);  

  if(!errors.isEmpty()){
    throw new BadRequestError('Email or Password is invalid');
  }

  next();

}

export { requestValidation }