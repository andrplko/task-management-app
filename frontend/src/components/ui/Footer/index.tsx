import Wrapper from '../Wrapper';
import styles from './Footer.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <Wrapper>
      <div className={styles.container}>
        <a
          href="https://github.com/andrplko"
          className={styles.github}
          rel="noreferrer"
          target="_blank"
          title="Andrei Paleshka GitHub"
        >
          Andrei Paleshka
        </a>
        <p className={styles.year}>2024</p>
      </div>
    </Wrapper>
  </footer>
);

export default Footer;
