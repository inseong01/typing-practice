import styles from '@/styles/sentence.module.css';
import Letter from './letter';

export default function Sentence({ pageSheet, pageSheetIdx }) {
  return (
    <ul className={styles.lyric}>
      {pageSheet[pageSheetIdx].map((ly, i) =>
        ly.length === 0 ? (
          <li key={i}>
            <br />
          </li>
        ) : (
          <li key={i}>
            {ly.map((text) => (
              <Letter text={text} />
            ))}
          </li>
        )
      )}
    </ul>
  );
}
