import { useNavigate } from 'react-router-dom';
import Routes from '@constants/routes';
import useSignOutMutation from './useSignOutMutation';

const useRedirect = () => {
  const navigate = useNavigate();
  const { mutate: signOut } = useSignOutMutation();

  const redirectToSignIn = () => {
    signOut();
    navigate(Routes.SIGN_IN);
  };

  return redirectToSignIn;
};

export default useRedirect;
