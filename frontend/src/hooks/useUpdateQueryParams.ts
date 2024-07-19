import { useSearchParams } from 'react-router-dom';

const useUpdateQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateQueryParams = (newParams: Record<string, unknown>) => {
    const currentParams = new URLSearchParams(searchParams);

    Object.keys(newParams).forEach((key) => {
      const value = newParams[key];
      if (!value) {
        currentParams.delete(key);
      } else {
        currentParams.set(key, String(value));
      }
    });

    setSearchParams(currentParams);
  };

  return updateQueryParams;
};

export default useUpdateQueryParams;
