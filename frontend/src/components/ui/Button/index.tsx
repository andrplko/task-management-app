import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  buttonClassName?: string;
}

const Button = ({ children, buttonClassName, ...props }: ButtonProps) => (
  <button className={`${styles.button} ${buttonClassName}`} {...props}>
    {children}
  </button>
);

export default Button;
