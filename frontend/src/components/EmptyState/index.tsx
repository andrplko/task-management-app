import NotFoundImage from '@assets/not-found.svg?react';
import styles from './EmptyState.module.scss';

const EmptyState = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <NotFoundImage className={styles.image} />
      </div>
      <h2 className={styles.title}>We were not able to find a match.</h2>
    </div>
  );
};

export default EmptyState;
