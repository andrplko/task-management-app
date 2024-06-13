import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import styles from './Layout.module.scss';
import Wrapper from '../Wrapper';

const Layout = ({ children }: PropsWithChildren) => (
  <div className={styles.container}>
    <Header />
    <main className={styles.main}>
      <Wrapper>
        <Outlet />
        {children}
      </Wrapper>
    </main>
    <Footer />
  </div>
);

export default Layout;
