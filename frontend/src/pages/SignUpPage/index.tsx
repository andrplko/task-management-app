import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '@components/SignUpForm';
import { useAuthContext } from '@context/AuthContext';
import Routes from '@constants/routes';
import styles from './SignUpPage.module.scss';

const SignUpPage = () => {
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
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
