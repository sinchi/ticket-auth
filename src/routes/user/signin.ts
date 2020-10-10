import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';



import { body } from 'express-validator'

import { User, UserDoc } from '../../models/user';
import { BadRequestError } from '../../errors/BadRequestError';
import { Password } from '../../services/Password';
import { requestValidation } from '../../middleware/request-handler';

const router = express.Router();

router.post('/api/users/signin', [
  body('email')
  .isEmail()
  .withMessage('Email must be valid'),
  body('password')
  .trim()
  .isLength({ min: 4, max: 20 })
  .withMessage('Password must be between 4 and 20 characters')
], requestValidation, async (req: Request, res: Response) => {
  
  
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });  
  if(!existingUser) {
    throw new BadRequestError('This user is not exist');
  }

  const isRightPassword = await Password.compare(existingUser.password, password)

  if(!isRightPassword) {
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