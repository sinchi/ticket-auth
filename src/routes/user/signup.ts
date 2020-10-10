import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { RequestValidationError } from '../../errors/RequestConnectionError';
import { DatabaseConnectionError } from '../../errors/DatabaseValidationError';

import { User, UserDoc } from '../../models/user';
import { BadRequestError } from '../../errors/BadRequestError';

import { requestValidation } from '../../middleware/request-handler'


const router = express.Router();

router.post('/api/users/signup', [
  body('email')
  .isEmail()
  .withMessage('Email must be valid'),
  body('password')
  .trim()
  .isLength({ min: 4, max: 20 })
  .withMessage('Password must be between 4 and 20 characters'),
], requestValidation , async (req: Request, res: Response) => {  

  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });  
  if(existingUser) {
    throw new BadRequestError('Email already in use.');
  }
    
  let user: UserDoc;
  try {
     user = User.build({ email, password });
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