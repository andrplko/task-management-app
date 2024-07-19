import { MouseEvent, PropsWithChildren } from 'react';
import { ModalMode, useFormModalContext } from '@context/FormModalContext';
import { setIsOpen, setMode } from '@context/actions/formModalActions';
import Button from '../ui/Button';
import TodoFormModal from '../TodoFormModal';
import PlusIcon from '@assets/plus-icon.svg?react';
import styles from './TodoActionPanel.module.scss';

const TodoActionPanel = ({ children }: PropsWithChildren) => {
  const { state, dispatch } = useFormModalContext();
  const { isOpen } = state;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(dispatch, true);
    setMode(dispatch, ModalMode.Create);
  };

  return (
    <>
      <div className={styles.wrapper}>
        {children}
        <Button
          type="button"
          buttonClassName={styles.button}
          onClick={handleClick}
        >
          <PlusIcon />
        </Button>
      </div>
      {isOpen && <TodoFormModal />}
    </>
  );
};

export default TodoActionPanel;
