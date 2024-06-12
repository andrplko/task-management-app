import { PropsWithChildren } from 'react';
import styles from './Wrapper.module.scss';

const Wrapper = ({ children }: PropsWithChildren) => (
  <div className={styles.wrapper}>{children}</div>
);

export default Wrapper;
