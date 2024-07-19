import { useAuthContext } from '@context/AuthContext';
import UserNavigation from '@components/UserNavigation';
import SearchBar from '@components/SearchBar';
import ProfileIcon from '@assets/profile-icon.svg?react';
import styles from './Header.module.scss';

const Header = () => {
  const { state } = useAuthContext();
  const { user } = state;

  return (
    <header className={styles.header}>
      {user && <SearchBar />}
      <div className={styles.wrapper}>
        {user && (
          <div className={styles.user}>
            <span className={styles.username}>Hi, {user.username}!</span>
            <ProfileIcon className={styles.icon} />
          </div>
        )}
        <UserNavigation />
      </div>
    </header>
  );
};

export default Header;
