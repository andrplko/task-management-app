import Wrapper from '../Wrapper';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Wrapper>
        <h1 className={styles.title}>Task Management App</h1>
      </Wrapper>
    </header>
  );
};

export default Header;
