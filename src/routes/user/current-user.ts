import express, { response } from 'express';
import jwt from 'jsonwebtoken'; 
import { User } from '../../models/user';
const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {

  // read token from request body
  if(!req.session?.jwt) {
    return res.status(401).send({ currentUser: null });
  }
  
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    return res.status(200).send({ currentUser: payload });
  }catch(error) {
    return res.status(400).send({ currentUser: null });
  }  

});

export { router as currentUserRouter };
