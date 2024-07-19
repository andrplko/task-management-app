import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import EmptyState from '@components/EmptyState';
import Pagination from '@components/Pagination';
import Loader from '@components/ui/Loader';
import TodoList from '@components/TodoList';
import TodoActionPanel from '@components/TodoActionPanel';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE, DEFAULT_STATUS } from '@constants';
import { executeRequest } from '@services/executeRequest';
import { TodoResponse } from '@types';
import styles from './TodoPage.module.scss';

const TodoPage = () => {
  const [searchParams] = useSearchParams({
    page: DEFAULT_PAGE,
    limit: DEFAULT_PER_PAGE,
    status: DEFAULT_STATUS,
  });

  const getTodos = useCallback(async () => {
    return await executeRequest({
      url: '/todo',
      method: 'GET',
      params: searchParams,
    });
  }, [searchParams]);

  const { data, isLoading, isFetching } = useSuspenseQuery<TodoResponse>({
    queryKey: ['todos', searchParams.toString()],
    queryFn: getTodos,
  });

  return (
    <div className={styles.container}>
      {isLoading || !data ? (
        <Loader />
      ) : (
        <>
          <TodoActionPanel>
            <p className={styles.amount}>All tasks ({data.pagination.count})</p>
          </TodoActionPanel>
          {data.results.length > 0 ? (
            <>
              <TodoList data={data.results} isFetching={isFetching} />
              <Pagination data={data.pagination} />
            </>
          ) : (
            <EmptyState />
          )}
        </>
      )}
    </div>
  );
};

export default TodoPage;
