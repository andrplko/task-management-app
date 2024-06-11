import { useMutation, useQueryClient } from '@tanstack/react-query';
import { executeRequest } from '../services/executeRequest';

const useMutationWithInvalidate = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: executeRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return mutation;
};

export default useMutationWithInvalidate;
