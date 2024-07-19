import { TodoItem } from '@types';
import Todo from '../Todo';
import TodoSkeleton from '../TodoSkeleton';
import styles from './TodoList.module.scss';

interface TodoListProps {
  data: TodoItem[];
  isFetching: boolean;
}

const TodoList = ({ data, isFetching }: TodoListProps) => {
  if (isFetching) {
    return (
      <div className={styles.container}>
        {data.map((_, index) => (
          <TodoSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {data.map((todo: TodoItem, index) => (
        <Todo key={index} data={todo} />
      ))}
    </div>
  );
};

export default TodoList;
