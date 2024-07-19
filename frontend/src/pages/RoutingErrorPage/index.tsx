import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import NavLinkButton from '@components/ui/NavLinkButton';
import Layout from '@components/ui/Layout';
import Routes from '@constants/routes';
import NotFoundImage from '@assets/not-found.svg?react';
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
          <NavLinkButton to={Routes.HOME}>Go to the home page</NavLinkButton>
        </div>
      </Layout>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Something went wrong...</h2>
    </div>
  );
};

export default RoutingErrorPage;
