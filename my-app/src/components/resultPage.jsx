import styles from '@/styles/resultPage.module.css';
import { Context } from '@/pages/_app';
import { useRouter } from 'next/router';
import { useContext } from 'react';

export default function ResultPage({ setIsFinished, setPageSheetIdx, music, artistName }) {
  const { dispatch, state } = useContext(Context);
  const router = useRouter();

  // 다시하기 함수
  function reset() {
    dispatch({ type: 'RESTART' });
    setIsFinished(false);
    setPageSheetIdx(0);
  }
  return (
    <div className={`${styles['id-main']} ${styles.res}`}>
      <h1 className={`${styles.title}`}>{music.trackTitle}</h1>
      <p className={`${styles.artist}`}>{artistName}</p>
      <ul className={`${styles.results}`}>
        <li>타수: {state.typingSpeed}</li>
        <li>정확도: {state.accuracy}%</li>
        <li>소요 시간: {state.time}초</li>
      </ul>
      <ul className={styles.nav}>
        <li onClick={reset} title="try again">
          다시하기
        </li>
        <li onClick={() => router.back()} title="go back">
          돌아가기
        </li>
      </ul>
      <div className={styles.pageNumber}>
        <p className={styles.page}>1 / 1</p>
      </div>
    </div>
  );
}
