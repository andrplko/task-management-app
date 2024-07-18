import styles from './TodoSkeleton.module.scss';

const TodoSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.wrapper}>
          <span className={`${styles.status} ${styles.skeleton}`}></span>
        </div>
        <h3 className={`${styles.title} ${styles.skeleton}`}></h3>
        <p className={`${styles.description} ${styles.skeleton}`}></p>
      </div>
      <div className={styles.actions}>
        <div className={`${styles.edit} ${styles.skeleton}`}></div>
        <div className={`${styles.delete} ${styles.skeleton}`}></div>
      </div>
    </div>
  );
};

export default TodoSkeleton;
