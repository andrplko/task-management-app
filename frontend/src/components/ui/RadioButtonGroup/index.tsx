import { UseFormRegisterReturn } from 'react-hook-form';
import RadioButton from '../RadioButton';
import styles from './RadioButtonGroup.module.scss';

interface RadioButtonOption {
  value: string;
  labelClassName: string;
  radioClassName: string;
}

interface RadioButtonGroupProps {
  legend: string;
  name: string;
  options: RadioButtonOption[];
  selectedValue?: string;
  registration?: Partial<UseFormRegisterReturn>;
}

const RadioButtonGroup = ({
  legend,
  name,
  selectedValue,
  options,
  registration,
}: RadioButtonGroupProps) => {
  return (
    <fieldset className={styles.fieldset}>
      <legend>{legend}</legend>
      {options.map((option) => {
        return (
          <RadioButton
            key={option.value}
            id={option.value}
            name={name}
            isSelected={selectedValue === option.value}
            label={option.value}
            value={option.value}
            labelClassName={styles[option.labelClassName]}
            radioClassName={styles[option.radioClassName]}
            registration={registration}
          />
        );
      })}
    </fieldset>
  );
};

export default RadioButtonGroup;
