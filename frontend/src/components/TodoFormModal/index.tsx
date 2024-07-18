import { useRef } from 'react';
import classnames from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import useClickOutside from '@hooks/useClickOutside';
import useTodoMutation from '@hooks/useTodoMutation';
import { ModalMode, useFormModalContext } from '@context/FormModalContext';
import { setIsOpen } from '@context/actions/formModalActions';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Textarea from '../ui/Textarea';
import RadioButtonGroup from '@components/ui/RadioButtonGroup';
import { radioButtonOptions } from '@constants';
import CloseIcon from '@assets/close-icon.svg?react';
import styles from './TodoFormModal.module.scss';

interface FormValues {
  title: string;
  description: string;
  status: string;
}

const TodoFormModal = () => {
  const { state, dispatch } = useFormModalContext();
  const { isOpen, mode, todo } = state;

  const { mutate } = useTodoMutation(
    mode === ModalMode.Create ? 'create' : 'update'
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'all',
  });
  const formRef = useRef<HTMLFormElement | null>(null);

  useClickOutside(
    formRef,
    (value: boolean) => setIsOpen(dispatch, value),
    isOpen
  );

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    if (mode === ModalMode.Create) {
      mutate({ url: '/todo', method: 'POST', body: data });
    } else {
      mutate({
        url: `/todo/${todo._id}`,
        method: 'PUT',
        body: data,
      });
    }

    setIsOpen(dispatch, false);
  };

  const containerClassNames = classnames(styles.container, {
    [styles.open]: isOpen,
  });

  return (
    <div className={containerClassNames}>
      <form
        noValidate
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <div className={styles.wrapper}>
          <h2 className={styles.title}>
            {mode === ModalMode.Edit ? 'Edit task' : 'Add a task'}
          </h2>
          <Button
            type="button"
            onClick={() => setIsOpen(dispatch, false)}
            className={styles.button}
          >
            <CloseIcon />
          </Button>
        </div>
        <Input
          id="title"
          name="title"
          label="Title"
          type="text"
          defaultValue={mode === ModalMode.Edit ? todo.title : ''}
          placeholder="Title"
          registration={register('title', {
            required: 'This field is required',
          })}
          error={errors.title}
        />
        <Textarea
          id="description"
          name="description"
          label="Description"
          placeholder="Description"
          defaultValue={mode === ModalMode.Edit ? todo.description : ''}
          registration={register('description')}
        />
        <RadioButtonGroup
          legend="Status"
          name="status"
          selectedValue={mode === ModalMode.Edit ? todo.status : ''}
          options={radioButtonOptions}
          registration={register('status')}
        />
        <Button type="submit" disabled={!isDirty || !isValid}>
          {mode === ModalMode.Edit ? 'Edit task' : 'Add new task'}
        </Button>
      </form>
    </div>
  );
};

export default TodoFormModal;
