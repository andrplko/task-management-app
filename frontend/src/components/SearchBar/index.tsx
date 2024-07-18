import { FormEvent, useTransition } from 'react';
import useUpdateQueryParams from '@hooks/useUpdateQueryParams';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '@constants';
import styles from './SearchBar.module.scss';

const SearchBar = () => {
  const [, startTransition] = useTransition();
  const updateQueryParams = useUpdateQueryParams();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);
    const searchValue: FormDataEntryValue | null = formData.get('search');

    startTransition(() => {
      updateQueryParams({
        search: searchValue,
        page: DEFAULT_PAGE,
        limit: DEFAULT_PER_PAGE,
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        name="search"
        type="text"
        placeholder="Search task..."
        className={styles.input}
        errorClassName={styles.error}
      />
      <Button type="submit" buttonClassName={styles.button}>
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
