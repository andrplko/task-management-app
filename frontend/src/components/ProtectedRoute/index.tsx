import Routes from '@constants/routes';
import { useAuthContext } from '@context/AuthContext';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { state } = useAuthContext();
  const { user } = state;

  useEffect(() => {
    if (!user) {
      navigate(Routes.SIGN_IN, { replace: true });
    }
  }, [user]);

  return user ? <Outlet /> : null;
};

export default ProtectedRoute;
