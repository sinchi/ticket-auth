import express from 'express';
import { json } from 'body-parser';
import { errorHandler } from './middlewares/error-handler';

import {
  currentUserRouter, 
  signinRouter, 
  signoutRouter, 
  signupRouter
} from './routes';

const app = express();
app.use(json());
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Auth Service: Listening on port 3000');
});
