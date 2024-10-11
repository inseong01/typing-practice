import styles from '@/styles/ContentsList.module.css';
import Link from 'next/link';

export default function ContentsList({ item }) {
  return (
    <div data-testid="list-arr" className={styles['list-arr']}>
      {item.map((value, idx) => {
        const { trackId, currentRank, artists, trackTitle } = value;
        const artistsName = artists.map((value) => value.artistName);
        // { pathname: '/music/[id]', query: { id: trackId } }
        return (
          <Link data-testid="link" href={`/music/${trackId}`} key={idx}>
            <div data-testid="list" className={styles.list}>
              <div data-testid="number" className={styles.number}>
                {currentRank}
              </div>
              <div data-testid="content-box" className={styles['content-box']}>
                <div data-testid="title" className={styles.title}>
                  {trackTitle}
                </div>
                <div data-testid="descript" className={styles.descript}>
                  {artistsName}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
