import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { ErrorResponse, useNavigate } from 'react-router-dom';
import { showToastMessage } from '@utils/showToastMessage';
import { executeRequest } from '@services/executeRequest';
import Routes from '@constants/routes';
import { User } from '@types';
import { AxiosError } from 'axios';

interface SignUpData {
  username: string;
  email: string;
  password: string;
}

type UseSignUpMutation = UseMutationResult<
  User,
  AxiosError<ErrorResponse>,
  SignUpData
>;

const useSignUpMutation = (): UseSignUpMutation => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const signUpMutation = useMutation<
    User,
    AxiosError<ErrorResponse>,
    SignUpData
  >({
    mutationFn: (data: SignUpData) =>
      executeRequest({
        url: '/auth/signup',
        method: 'POST',
        body: data,
      }),
    onSuccess: (data: User) => {
      queryClient.setQueryData(['user'], data);

      showToastMessage(`User has been successfully registered!`, {
        type: 'success',
        position: 'top-right',
      });

      navigate(Routes.SIGN_IN);
    },
    onError: (error) => {
      showToastMessage(error.message, {
        type: 'error',
        position: 'top-right',
      });
    },
  });

  return signUpMutation;
};

export default useSignUpMutation;
