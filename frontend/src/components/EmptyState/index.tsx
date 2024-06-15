import NotFoundImage from '@assets/not-found.svg?react';
import styles from './EmptyState.module.scss';

const EmptyState = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <NotFoundImage className={styles.image} />
      </div>
      <h2 className={styles.title}>Sorry, we couldn&apos;t find any results</h2>
    </div>
  );
};

export default EmptyState;
