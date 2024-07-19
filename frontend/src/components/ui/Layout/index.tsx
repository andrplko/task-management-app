import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import SideBar from '@components/ui/SideBar';
import Header from '../Header';
import Footer from '../Footer';
import Wrapper from '../Wrapper';
import styles from './Layout.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }: PropsWithChildren) => (
  <div className={styles.container}>
    <SideBar />
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Wrapper>
          <Outlet />
          {children}
        </Wrapper>
      </main>
      <Footer />
    </div>
    <ToastContainer />
  </div>
);

export default Layout;
