import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useAuthContext } from '@context/AuthContext';
import { setUser } from '@context/actions/authActions';
import { executeRequest } from '@services/executeRequest';
import { showToastMessage } from '@utils/showToastMessage';
import { removeAccessToken } from '@utils/tokenStore';
import { ErrorResponse } from '@types';

const useSignOutMutation = () => {
  const { dispatch } = useAuthContext();

  const signOutMutation = useMutation({
    mutationFn: () =>
      executeRequest({
        url: '/auth/signout',
        method: 'GET',
      }),
    onSuccess: () => {
      setUser(dispatch, null);
      removeAccessToken();
      showToastMessage('User has successfully been logged out!', {
        type: 'success',
        position: 'top-right',
      });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      showToastMessage(`Error: ${error.response?.data.message}`, {
        type: 'error',
        position: 'top-right',
      });
    },
  });

  return signOutMutation;
};

export default useSignOutMutation;
