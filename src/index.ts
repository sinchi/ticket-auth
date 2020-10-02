import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import {currentUserRouter, signinRouter, signoutRouter, signupRouter} from './routes'
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/NotFoundError'

const app = express();
app.use(json());
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler)

app.listen(3000, () => {
  console.log('Auth Service: Listening on port 3000');
});
