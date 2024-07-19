import { useAuthContext } from '@context/AuthContext';
import Routes from '@constants/routes';
import useSignOutMutation from '@hooks/useSignOutMutation';
import NavLinkButton from '@components/ui/NavLinkButton';
import styles from './UserNavigation.module.scss';

const UserNavigation = () => {
  const { state } = useAuthContext();
  const { user } = state;
  const { mutate: signOut } = useSignOutMutation();

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {!user ? (
          <>
            <li>
              <NavLinkButton to={Routes.SIGN_IN}>Sign In</NavLinkButton>
            </li>
            <li>
              <NavLinkButton to={Routes.SIGN_UP}>Sign Up</NavLinkButton>
            </li>
          </>
        ) : (
          <li>
            <NavLinkButton to={Routes.SIGN_IN} onClick={() => signOut()}>
              Sign Out
            </NavLinkButton>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default UserNavigation;
