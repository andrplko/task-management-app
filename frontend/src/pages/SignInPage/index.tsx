import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInForm from '@components/SignInForm';
import { useAuthContext } from '@context/AuthContext';
import Routes from '@constants/routes';
import styles from './SignInPage.module.scss';

const SignInPage = () => {
  const navigate = useNavigate();
  const { state } = useAuthContext();
  const { user } = state;

  useEffect(() => {
    if (user) {
      navigate(Routes.TODO, { replace: true });
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
