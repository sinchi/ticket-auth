import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';

import cookieSession from 'cookie-session';

import {currentUserRouter, signinRouter, signoutRouter, signupRouter} from './routes/user'
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/NotFoundError'

const app = express();

app.set('trust proxy', true);

app.use(json());

app.use(cookieSession({
  signed: false,
  secure: true,
}));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler)


const start = async () => {

  if(!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

  console.log('connected to mongodb');

  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log('Auth Service: Listening on port 3000');
  });
}
start();


