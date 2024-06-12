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
  const updateQueryParams = useUpdateQueryParams();
  const sequence = generatePaginationItems(data.page, data.pages);

  const handleNext = () => {
    updateQueryParams({ page: data?.page + 1 });
  };

  const handlePrev = () => {
    if (data?.page > 1) {
      updateQueryParams({ page: data?.page - 1 });
    }
  };

  const handleClick = (value: number | string) => {
    if (typeof value === 'number') {
      updateQueryParams({ page: value });
    }
  };

  const getListItemClassName = (value: number | string) => {
    return classnames(styles.listItem, {
      [styles.active]: value === data?.page,
    });
  };

  const isPrevButtonDisabled = data?.page === 1;
  const isNextButtonDisabled = data?.page === data?.pages;

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
