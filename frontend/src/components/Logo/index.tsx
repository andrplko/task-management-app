import { Link } from 'react-router-dom';
import Routes from '@constants/routes';
import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <div className={styles.container}>
      <Link to={Routes.HOME} className={styles.link}>
        <h1 className={styles.title}>Task Manager</h1>
      </Link>
    </div>
  );
};

export default Logo;
