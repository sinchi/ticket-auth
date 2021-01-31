import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import {currentUserRouter, signinRouter, signoutRouter, signupRouter} from './routes/user'
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/NotFoundError'

const app = express();

app.set('trust proxy', true);

app.use(bodyParser.json());

app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test',
}));

// app.use(requestValidation);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler)

export {app};