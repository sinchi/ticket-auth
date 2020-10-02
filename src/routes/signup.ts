import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bodyValidator from '../middleware/validator'
import { RequestValidationError } from '../errors/RequestConnectionError';
import { DatabaseConnectionError } from '../errors/DatabaseValidationError';

import { User, UserDoc } from '../models/user';
import { BadRequestError } from '../errors/BadRequestError';

import jwt from 'jsonwebtoken';

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
    
  let user: UserDoc;
  try {
     user = User.buildUser({ email, password });
    await user.save();   
    
    // generate json web token
    const userJWT = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY!);

    //Store it on session object
    req.session = {
      jwt: userJWT
    };
    
  } catch (error) {
    throw new DatabaseConnectionError('Database error');
  }
  res.status(201).send(user);
});

export { router as signupRouter };