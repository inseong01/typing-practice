import styles from '@/styles/loading.module.css';

export default function Loading({ loadingPercent, type }) {
  return (
    <div className={styles.loadingBox}>
      <div className={styles.top}>{`불러오는 중..`}</div>
      <div className={styles.btm}>
        <div className={styles.describe}>{`${type === 'LOAD' ? '기존' : '새로운'} 파일 불러오기 : `}</div>
        <div className={styles.bar}>
          <div className={styles.progress} style={{ width: `${loadingPercent}%` }}></div>
        </div>
      </div>
    </div>
  );
}
