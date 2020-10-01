import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bodyValidator from '../middleware/validator'

const router = express.Router();

router.post('/api/users/signup', bodyValidator , (req: Request, res: Response) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).send(errors.array());
  }
  const { email, password } = req.body;
  console.log('Creating a user');
  res.send({})
});

export { router as signupRouter };