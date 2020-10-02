import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bodyValidator from '../middleware/validator'
import { RequestValidationError } from '../errors/RequestConnectionError';
import { DatabaseConnectionError } from '../errors/DatabaseValidationError';

import { User } from '../models/user';
import { BadRequestError } from '../errors/BadRequestError';


const router = express.Router();

router.post('/api/users/signup', bodyValidator , async (req: Request, res: Response) => {
  const errors = validationResult(req);  
  if(!errors.isEmpty()) {        
    throw new RequestValidationError(errors.array());
  }
  
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });  
  if(existingUser) {
    throw new BadRequestError('Email already in use');
  }
      
  const user = User.buildUser({ email, password });
  await user.save();   
  
  res.status(201).send(user);
  
});

export { router as signupRouter };