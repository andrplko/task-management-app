import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classnames from 'classnames';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '../../constants';
import styles from './Dropdown.module.scss';

interface DropdownProps {
  options: string[];
  label: string;
  placeholder: string;
}

const Dropdown = ({
  options,
  label,
  placeholder,
}: DropdownProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue: string | null = searchParams.get('search');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(placeholder);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const toggleOpen = () => setIsOpen(!isOpen);

  const handleItemClick = (value: string) => {
    setSelectedItem(value);
    updateQueryParams({ status: value });
  };

  const updateQueryParams = (query: Record<string, unknown>) => {
    const params = new URLSearchParams({
      search: searchValue ?? '',
      ...query,
      page: DEFAULT_PAGE,
      limit: DEFAULT_PER_PAGE
    })

    if (!searchValue) {
      params.delete('search');
    }

    if (query.status === 'All') {
      params.delete('status');
    }

    setSearchParams(params);
  }

  const dropdownHeadClassNames = classnames(styles.dropdownHead, {
    [styles.opened]: isOpen,
    [styles.active]: selectedItem !== placeholder,
  });

  const getItemClassNames = (value: string) =>
    classnames(styles.item, {
      [styles.selected]: value === selectedItem,
    });

  useEffect(() => {
    function close(e: MouseEvent) {
      const { target } = e;
      if (target instanceof Node && !dropdownRef.current?.contains(target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      window.addEventListener('click', close);
    }

    return function removeListener() {
      window.removeEventListener('click', close);
    };
  }, [isOpen]);

  return (
    <div className={styles.container} ref={dropdownRef} onClick={toggleOpen}>
      <div className={styles.label}>{label}</div>
      <div className={styles.dropdown}>
        <div className={dropdownHeadClassNames}>{selectedItem}</div>
        {isOpen && (
          <div className={styles.dropdownList}>
            {options.map((value) => (
              <div
                key={value}
                onClick={() => handleItemClick(value)}
                className={getItemClassNames(value)}
              >
                {value}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
