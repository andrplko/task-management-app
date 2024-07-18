import { useNavigate } from 'react-router-dom';
import Routes from '@constants/routes';
import useSignOut from './useSignOut';

const useRedirect = () => {
  const navigate = useNavigate();
  const { mutate: signOut } = useSignOut();

  const redirectToSignIn = () => {
    signOut();
    navigate(Routes.SIGN_IN);
  };

  return redirectToSignIn;
};

export default useRedirect;
