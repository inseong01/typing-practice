import styles from '@/styles/swiperSlides.module.css';
import Link from 'next/link';

export default function SwiperSlides({ item }) {
  return (
    <div className={styles['list-arr']}>
      {item.map((value, idx) => {
        const { trackId, currentRank, artists, trackTitle, isLyric } = value;
        const artistsName = artists.map((value) => value.artistName);

        return (
          <Link data-testid="link" href={`/music/${trackId}`} key={idx}>
            <div className={`${styles.list} ${isLyric ? '' : styles.noLyric}`}>
              <div className={styles.number}>{currentRank}</div>
              <div className={styles['content-box']} title={isLyric ? '' : '가사 준비중'}>
                <div className={styles.title}>{trackTitle}</div>
                <div className={styles.descript}>{artistsName}</div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
