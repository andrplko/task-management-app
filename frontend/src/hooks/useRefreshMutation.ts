import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { executeRequest } from '@services/executeRequest';
import { setAccessToken } from '@utils/tokenStore';
import { showToastMessage } from '@utils/showToastMessage';
import { ErrorResponse } from '@types';

interface RefreshResponse {
  accessToken: string;
}

const useRefreshMutation = () => {
  const refreshMutation = useMutation<
    RefreshResponse,
    AxiosError<ErrorResponse>
  >({
    mutationFn: () =>
      executeRequest({
        url: '/auth/refresh',
        method: 'GET',
      }),
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
    },
    onError: (error) => {
      showToastMessage(`Error: ${error.response?.data.message}`, {
        type: 'error',
        position: 'top-right',
      });
    },
  });

  return refreshMutation;
};

export default useRefreshMutation;
