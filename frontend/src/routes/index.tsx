import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/ui/Layout';
import HomePage from '../pages/HomePage';
import TodoPage from '../pages/TodoPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import RoutingErrorPage from '../pages/RoutingErrorPage';
import Routes from '../constants/routes';
import ProtectedRoute from '@components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: <Layout />,
    errorElement: <RoutingErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: Routes.TODO,
            element: <TodoPage />,
          },
        ],
      },
      {
        path: Routes.SIGN_IN,
        element: <SignInPage />,
      },
      {
        path: Routes.SIGN_UP,
        element: <SignUpPage />,
      },
    ],
  },
]);

export default router;
