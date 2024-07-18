import { AxiosError } from 'axios';
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { showToastMessage } from '@utils/showToastMessage';
import { executeRequest } from '@services/executeRequest';
import Routes from '@constants/routes';
import { ErrorResponse, User } from '@types';
import { setAccessToken } from '@utils/tokenStore';

interface SignInResponse {
  user: User;
  accessToken: string;
}

interface SignInData {
  email: string;
  password: string;
}

type UseSignInMutation = UseMutationResult<
  SignInResponse,
  AxiosError<ErrorResponse>,
  SignInData
>;

const useSignInMutation = (): UseSignInMutation => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const signInMutation = useMutation<
    SignInResponse,
    AxiosError<ErrorResponse>,
    SignInData
  >({
    mutationFn: (data: SignInData) =>
      executeRequest({
        url: '/auth/signin',
        method: 'POST',
        body: data,
      }),
    onSuccess: (data: SignInResponse) => {
      queryClient.setQueryData(['user'], data.user);
      setAccessToken(data.accessToken);

      showToastMessage('User has successfully logged in!', {
        type: 'success',
        position: 'top-right',
      });

      navigate(Routes.TODO);
    },
    onError: (error) => {
      showToastMessage(`Error: ${error.response?.data.message}`, {
        type: 'error',
        position: 'top-right',
      });
    },
  });

  return signInMutation;
};

export default useSignInMutation;
