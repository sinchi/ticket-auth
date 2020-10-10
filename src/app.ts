import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';


import cookieSession from 'cookie-session';

import {currentUserRouter, signinRouter, signoutRouter, signupRouter} from './routes/user'
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/NotFoundError'

import { requestValidation } from './middleware/request-handler';

const app = express();

app.set('trust proxy', true);

app.use(json());

app.use(cookieSession({
  signed: false,
  secure: true,
}));

// app.use(requestValidation);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler)

export {app};