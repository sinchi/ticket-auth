import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bodyValidator from '../middleware/validator'
import { RequestValidationError } from '../errors/RequestConnectionError';
import { DatabaseConnectionError } from '../errors/DatabaseValidationError';

const router = express.Router();

router.post('/api/users/signup', bodyValidator , (req: Request, res: Response) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {    
    throw new RequestValidationError(errors.array());
  }
  const { email, password } = req.body;

  console.log('Creating a user');
  throw new DatabaseConnectionError();
  res.send({})
});

export { router as signupRouter };