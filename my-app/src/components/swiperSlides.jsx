import styles from '@/styles/swiperSlides.module.css';
import Link from 'next/link';

export default function SwiperSlides({ item }) {
  return (
    <>
      {item.map((value, idx) => {
        const { trackId, currentRank, artists, trackTitle, isLyric } = value;
        const artistsNames = artists.map((value) => value.artistName);
        const artist = artistsNames.join().replace(',', ', ');
        return (
          <Link data-testid="link" key={idx} href={`/music/${trackId}`}>
            <div className={`${styles.list} ${isLyric ? '' : styles.noLyric}`}>
              <div className={styles.number}>{currentRank}</div>
              <div className={styles['content-box']} title={isLyric ? '' : '가사 준비중'}>
                <div className={styles.title}>{trackTitle}</div>
                <div className={styles.descript}>{artist}</div>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}
