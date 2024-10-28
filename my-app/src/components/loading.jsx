import styles from '@/styles/loading.module.css';

export default function Loading({ loadingPercent, type, error }) {
  if (error)
    return (
      <div className={styles.loadingBox}>
        <div className={styles.top}>
          <div className={styles.title}>{`오류`}</div>
          <div
            className={styles.btnLogo}
            onClick={() => {
              const modal = document.getElementById('modal');
              modal.close();
            }}
          >
            X
          </div>
        </div>
        <div className={styles.btm}>
          <div className={styles.describe}>{`${type === 'LOAD' ? '기존' : '새로운'} 파일 불러오기 : `}</div>
          <div className={styles.describe}>오류가 발생하였습니다.</div>
        </div>
      </div>
    );

  switch (type) {
    case 'LOAD': {
      return (
        <div className={styles.loadingBox}>
          <div className={styles.top}>
            <div className={styles.title}>{`불러오는 중..`}</div>
            <div className={styles.btnLogo}>-</div>
          </div>
          <div className={styles.btm}>
            <div className={styles.describe}>{`기존 파일 불러오기 : `}</div>
            <div className={styles.bar}>
              <div className={styles.progress} style={{ width: `${loadingPercent}%` }}></div>
            </div>
          </div>
        </div>
      );
    }
    case 'UPDATE': {
      return (
        <div className={styles.loadingBox}>
          <div className={styles.top}>
            <div className={styles.title}>{loadingPercent === 100 ? '불러오기 완료' : `불러오는 중..`}</div>
            <div
              className={styles.btnLogo}
              onClick={() => {
                if (loadingPercent !== 100) return;
                const modal = document.getElementById('modal');
                modal.close();
              }}
            >
              {loadingPercent === 100 ? 'X' : '-'}
            </div>
          </div>
          <div className={styles.btm}>
            <div className={styles.describe}>{`새로운 파일 불러오기 : `}</div>
            <div className={styles.bar}>
              <div className={styles.progress} style={{ width: `${loadingPercent}%` }}></div>
            </div>
          </div>
        </div>
      );
    }
    default: {
      return console.error('Loading Error');
    }
  }
}
