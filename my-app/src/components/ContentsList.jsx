import styles from '@/styles/ContentsList.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ContentsList({ item }) {
  const router = useRouter();

  return (
    <div className={styles['list-arr']}>
      {item.map((value, idx) => {
        const { trackId, currentRank, artists, trackTitle } = value;
        const artistsName = artists.map((value) => value.artistName);

        return (
          <Link href={{ pathname: '/music/[id]', query: { id: trackId } }} key={idx}>
            <div className={styles.list} onClick={() => {}}>
              <div className={styles.number}>{currentRank}</div>
              <div className={styles['content-box']}>
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
