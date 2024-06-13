import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Dropdown from '@components/Dropdown';
import EmptyState from '@components/EmptyState';
import Pagination from '@components/Pagination';
import SearchBar from '@components/SearchBar';
import Loader from '@components/ui/Loader';
import TodoList from '@components/TodoList';
import TodoActionPanel from '@components/TodoActionPanel';
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  DEFAULT_STATUS,
  BASE_URL,
  sortOptions,
  taskStatuses,
} from '@constants';
import { executeRequest } from '@services/executeRequest';
import { TodoResponse } from '@types';
import styles from './TodoPage.module.scss';

const TodoPage = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: DEFAULT_PAGE,
    limit: DEFAULT_PER_PAGE,
    status: DEFAULT_STATUS,
  });

  const getTodos = async () => {
    return await executeRequest({
      url: BASE_URL,
      method: 'GET',
      params: searchParams,
    });
  };

  const { data, isFetching, refetch } = useQuery<TodoResponse>({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  useEffect(() => {
    setSearchParams(searchParams);
  }, []);

  useEffect(() => {
    refetch();
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.control}>
          <SearchBar />
          <Dropdown
            options={sortOptions}
            queryParam="sort"
            label="Sort"
            placeholder="Sort by"
          />
          <Dropdown
            options={taskStatuses}
            queryParam="status"
            label="Filter by status"
            placeholder="Select status"
          />
        </div>
        {isFetching || !data ? (
            <Loader />
          ) : (
            <>
              <TodoActionPanel>
                <p className={styles.amount}>
                  All tasks ({data.pagination.count})
                </p>
              </TodoActionPanel>
              {data.results.length > 0 ? (
                <>
                  <TodoList data={data.results} />
                  <Pagination data={data.pagination} />
                </>
              ) : (
                <EmptyState />
              )}
            </>
          )}
      </div>
    </div>
  );
};

export default TodoPage;
