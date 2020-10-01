import { body } from 'express-validator';

export default body('email')
.isEmail()
.withMessage('Email must be valid')