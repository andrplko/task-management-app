import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classnames from 'classnames';
import useUpdateQueryParams from '@hooks/useUpdateQueryParams';
import useClickOutside from '@hooks/useClickOutside';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '@constants';
import styles from './Dropdown.module.scss';

interface DropdownProps {
  options: string[];
  queryParam: string;
  label: string;
  placeholder: string;
}

const Dropdown = ({ options, queryParam, label, placeholder }: DropdownProps) => {
  const updateQueryParams = useUpdateQueryParams();
  const [searchParams] = useSearchParams();
  const queryParamValue = searchParams.get(queryParam);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const toggleOpen = () => setIsOpen(!isOpen);

  useClickOutside(dropdownRef, setIsOpen, isOpen);

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    updateQueryParams({
      [queryParam]: value,
      page: DEFAULT_PAGE,
      limit: DEFAULT_PER_PAGE,
    });
  };

  const dropdownHeadClassNames = classnames(styles.dropdownHead, {
    [styles.open]: isOpen,
    [styles.active]: selectedOption !== placeholder,
  });

  const getOptionClassNames = (value: string) =>
    classnames(styles.item, {
      [styles.selected]: value === selectedOption || value === queryParamValue,
    });

  return (
    <div className={styles.container} ref={dropdownRef} onClick={toggleOpen}>
      <div className={styles.label}>{label}</div>
      <div className={styles.dropdown}>
        <div className={dropdownHeadClassNames}>{selectedOption}</div>
        {isOpen && (
          <div className={styles.dropdownList}>
            {options.map((option) => (
              <div
                key={option}
                onClick={() => handleOptionClick(option)}
                className={getOptionClassNames(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
