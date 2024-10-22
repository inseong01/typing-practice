import styles from '@/styles/loading.module.css';

export default function Loading({ loadingPercent, text }) {
  return (
    <div className={styles.loadingBox}>
      <div className={styles.top}>{text}</div>
      <div className={styles.btm}>
        <div className={styles.bar}>
          <div className={styles.progress} style={{ width: `${loadingPercent}%` }}></div>
        </div>
      </div>
    </div>
  );
}
