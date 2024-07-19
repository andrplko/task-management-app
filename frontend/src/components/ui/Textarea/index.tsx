import { TextareaHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from './Textarea.module.scss';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  registration?: Partial<UseFormRegisterReturn>;
  error?: FieldError;
  errorClassName?: string;
}

const Textarea = ({
  label,
  registration,
  error,
  errorClassName,
  ...props
}: TextAreaProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={props.id} className={styles.label}>
        {label}
      </label>
      <textarea {...registration} {...props} className={styles.textarea} />
      <div role="alert" className={`${styles.error} ${errorClassName}`}>
        {error?.message && error.message}
      </div>
    </div>
  );
};

export default Textarea;
