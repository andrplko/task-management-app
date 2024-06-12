import { MouseEvent } from 'react';
import classnames from 'classnames';
import useMutationWithInvalidate from '@hooks/useMutationWithInvalidate';
import { useFormModalContext, ModalMode } from '@context';
import { setIsOpen, setMode, setTodo } from '@context/actions';
import Button from '../ui/Button';
import { TodoItem } from '@types';
import EditIcon from '@assets/edit-icon.svg?react';
import DeleteIcon from '@assets/delete-icon.svg?react';
import { BASE_URL } from '@constants';
import styles from './Todo.module.scss';

interface TodoProps {
  data: TodoItem;
}

const Todo = ({ data }: TodoProps) => {
  const { mutate } = useMutationWithInvalidate();
  const { dispatch } = useFormModalContext();

  const handleDelete = () => {
    mutate({ url: `${BASE_URL}/${data._id}`, method: 'DELETE' });
  };

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(dispatch, true);
    setMode(dispatch, ModalMode.Edit);
    setTodo(dispatch, data);
  };

  const statusClassNames = classnames(styles.status, {
    [styles.todo]: data.status === 'To Do',
    [styles.in_progress]: data.status === 'In Progress',
    [styles.done]: data.status === 'Done',
  });

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.wrapper}>
          <span className={statusClassNames}>{data.status}</span>
        </div>
        <h3 className={styles.title}>{data.title}</h3>
        <p className={styles.description}>{data.description}</p>
      </div>
      <div className={styles.actions}>
        <Button
          type="button"
          onClick={(e) => handleUpdate(e)}
          buttonClassName={styles.edit}
        >
          <EditIcon />
        </Button>
        <Button
          type="button"
          onClick={handleDelete}
          buttonClassName={styles.delete}
        >
          <DeleteIcon />
        </Button>
      </div>
    </div>
  );
};

export default Todo;
