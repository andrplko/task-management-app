import { TodoItem } from '@types';
import Todo from '../Todo';
import styles from './TodoList.module.scss';

interface TodoListProps {
  data: TodoItem[];
}

const TodoList = ({ data }: TodoListProps) => (
  <div className={styles.container}>
    {data.map((todo: TodoItem, index) => (
      <Todo key={index} data={todo} />
    ))}
  </div>
);

export default TodoList;
