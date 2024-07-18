import express from 'express';
import {
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/user.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.use(verifyToken);

router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);

export default router;
