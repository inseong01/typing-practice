import styles from '@/styles/ContentsList.module.css';

const list = Array(10)
  .fill(1)
  .map((v, i) => v + i);

export default function ContentsList() {
  return (
    <div className={`${styles['list-arr']}`}>
      {list.map((v) => {
        return (
          <div className={styles.list} key={v}>
            <div className={styles.number}>{v}</div>
            <div className={styles['content-box']}>
              <div className={styles.title}>제목</div>
              <div className={styles.descript}>아티스트</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
