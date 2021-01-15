import express from 'express';

const router = express.Router();

router.post('/api/users/signup', (req, res) => {
  const { email, password } = req.body;

  throw new Error('Something went wrong')
  res.send('signup')
});

export { router as signupRouter };