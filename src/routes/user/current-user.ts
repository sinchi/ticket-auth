import express from 'express';
import { currentUser } from '../../middleware/current-user';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  return res.status(200).send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
