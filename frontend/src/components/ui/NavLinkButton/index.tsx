import { ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styles from './NavLinkButton.module.scss';

interface NavLinkButtonProps extends LinkProps {
  children: ReactNode;
}

const NavLinkButton = ({ children, ...props }: NavLinkButtonProps) => (
  <Link className={styles.link} {...props}>
    {children}
  </Link>
);

export default NavLinkButton;
