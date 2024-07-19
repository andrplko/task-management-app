import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  registration?: Partial<UseFormRegisterReturn>;
  error?: FieldError;
  errorClassName?: string;
}

const Input = ({
  label,
  registration,
  error,
  errorClassName,
  ...props
}: InputProps) => (
  <div className={styles.container}>
    <label htmlFor={props.id} className={styles.label}>
      {label}
    </label>
    <input className={styles.input} {...registration} {...props} />
    <div role="alert" className={`${styles.error} ${errorClassName}`}>
      {error?.message && error.message}
    </div>
  </div>
);

export default Input;
