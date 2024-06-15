import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { executeRequest } from '../services/executeRequest';
import { showToastMessage } from '@utils/showToastMessage';
import { TodoAction } from '@types';

interface ErrorResponse {
  message: string;
}

const useTodoMutation = (action: TodoAction) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: executeRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      showToastMessage(`Task successfully ${action}d!`, {
        type: 'success',
        position: 'top-right',
      });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage = error.response?.data.message || 'An error occurred';
      showToastMessage(`Error: ${errorMessage}`, {
        type: 'error',
        position: 'top-right',
      });
    },
  });

  return mutation;
};

export default useTodoMutation;
