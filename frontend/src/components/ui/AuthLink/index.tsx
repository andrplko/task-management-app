import { Link } from 'react-router-dom';
import Routes from '@constants/routes';
import styles from './AuthLink.module.scss';

interface AuthLinkProps {
  to: Routes;
}

const AuthLink = ({ to }: AuthLinkProps) => {
  const linkDetails: Record<string, Record<string, string>> = {
    [Routes.SIGN_UP]: {
      text: "Don't have an account?",
      label: 'Sign Up',
    },
    [Routes.SIGN_IN]: {
      text: 'Already have an account?',
      label: 'Sign In',
    },
  };

  const { text, label } = linkDetails[to];

  return (
    <div className={styles.container}>
      <span>{text}</span>
      <Link to={to} className={styles.link}>
        {label}
      </Link>
    </div>
  );
};

export default AuthLink;
