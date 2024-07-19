import express from 'express';
import {
  refresh,
  signin,
  signout,
  signup,
} from '../controllers/auth.contoller';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.get('/refresh', refresh);

export default router;
