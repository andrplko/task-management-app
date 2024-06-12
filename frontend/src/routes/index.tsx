import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/ui/Layout';
import HomePage from '../pages/HomePage';
import TodoPage from '../pages/TodoPage';
import RoutingErrorPage from '../pages/RoutingErrorPage';
import Routes from '../constants/routes';

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
        path: Routes.TODO,
        element: <TodoPage />,
      },
    ],
  },
]);

export default router;
