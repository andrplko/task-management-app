import { useTransition } from 'react';
import classnames from 'classnames';
import useUpdateQueryParams from '@hooks/useUpdateQueryParams';
import { generatePaginationItems } from '@utils/generatePaginationItems';
import styles from './Pagination.module.scss';

interface PaginationProps {
  data: {
    page: number;
    pages: number;
  };
}

const Pagination = ({ data }: PaginationProps) => {
  const [, startTransition] = useTransition();
  const updateQueryParams = useUpdateQueryParams();
  const { page, pages } = data;
  const sequence = generatePaginationItems(page, pages);

  const handleNext = () => {
    startTransition(() => {
      updateQueryParams({ page: page + 1 });
    });
  };

  const handlePrev = () => {
    startTransition(() => {
      if (page > 1) {
        updateQueryParams({ page: page - 1 });
      }
    });
  };

  const handleClick = (value: number | string) => {
    startTransition(() => {
      if (typeof value === 'number') {
        updateQueryParams({ page: value });
      }
    });
  };

  const getListItemClassName = (value: number | string) => {
    return classnames(styles.listItem, {
      [styles.active]: value === page,
    });
  };

  const isPrevButtonDisabled = page === 1;
  const isNextButtonDisabled = page === pages;

  const prevButtonClassNames = classnames(styles.button, {
    [styles.disabled]: isPrevButtonDisabled,
  });

  const nextButtonClassNames = classnames(styles.button, {
    [styles.disabled]: isNextButtonDisabled,
  });

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <button
            type="button"
            onClick={handlePrev}
            className={prevButtonClassNames}
            disabled={isPrevButtonDisabled}
          >
            Prev
          </button>
        </li>
        {sequence.map((value: number | string, index) => {
          return (
            <li key={index} className={getListItemClassName(value)}>
              <button
                type="button"
                onClick={() => handleClick(value)}
                className={styles.button}
              >
                {value}
              </button>
            </li>
          );
        })}
        <li className={styles.listItem}>
          <button
            type="button"
            onClick={handleNext}
            className={nextButtonClassNames}
            disabled={isNextButtonDisabled}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
