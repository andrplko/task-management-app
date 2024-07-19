import express from 'express';
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from '../controllers/todo.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.use(verifyToken);

router.get('/', getTodos);
router.get('/:id', getTodoById);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;
