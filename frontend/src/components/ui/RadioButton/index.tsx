import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './RadioButton.module.scss';

export interface RadioButtonProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  registration?: Partial<UseFormRegisterReturn>;
  isSelected?: boolean;
  labelClassName?: string;
  radioClassName?: string;
}

const RadioButton = ({
  label,
  registration,
  isSelected,
  labelClassName,
  radioClassName,
  ...props
}: RadioButtonProps) => {
  return (
    <div className={styles.container}>
      <input
        type="radio"
        defaultChecked={isSelected}
        className={`${styles.radio} ${radioClassName}`}
        {...registration}
        {...props}
      />
      <label htmlFor={props.id} className={`${styles.label} ${labelClassName}`}>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
