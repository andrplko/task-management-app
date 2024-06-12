import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import NotFoundImage from '@assets/not-found.svg?react';
import Layout from '@components/ui/Layout';
import Routes from '@constants/routes';
import styles from './RoutingErrorPage.module.scss';

const RoutingErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    const { status, statusText } = error;

    return (
      <Layout>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <NotFoundImage className={styles.image} />
          </div>
          <h2 className={styles.title}>{`${status} - ${statusText}`}</h2>
          <Link to={Routes.HOME} className={styles.link}>
            Go to the home page
          </Link>
        </div>
      </Layout>
    );
  }
};

export default RoutingErrorPage;
