import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import bodyValidator from '../../middleware/validator'
import { RequestValidationError } from '../../errors/RequestConnectionError';
import { DatabaseConnectionError } from '../../errors/DatabaseValidationError';

import { User, UserDoc } from '../../models/user';
import { BadRequestError } from '../../errors/BadRequestError';
import { Password } from '../../services/Password';

const router = express.Router();

router.post('/api/users/signin', bodyValidator, async (req: Request, res: Response) => {
  const errors = validationResult(req);  
  if(!errors.isEmpty()) {        
    throw new RequestValidationError(errors.array());
  }
  
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });  
  if(!existingUser) {
    throw new BadRequestError('This user is not exist');
  }

  if(!Password.compare(existingUser.password, password)) {
    throw new BadRequestError('Password incorrect');
  }

  // generate json web token
  const userJWT = jwt.sign({
    id: existingUser.id,
    email: existingUser.email
  }, process.env.JWT_KEY!);

  //Store it on session object
  req.session = {
    jwt: userJWT
  };

  res.status(200).send(userJWT)
});

export { router as signinRouter };