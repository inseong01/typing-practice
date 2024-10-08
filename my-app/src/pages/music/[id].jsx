import Sentence from '@/components/sentence';
import musicList from '../../../public/musicList';
import styles from '@/styles/[id].module.css';

import { useRouter } from 'next/router';
import { Suspense, useContext, useMemo, useState } from 'react';
import { Context } from '../_app';
// pathname 설계된 링크명
// asPath 브라우저에서 사용하고 있는 링크명

export default function Page() {
  const [pageSheetIdx, setPageSheetIdx] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const { dispatch, state } = useContext(Context);

  const router = useRouter();
  // 객체 props 받기: query.id 사용하여 trakId 일치 값 반환
  const trackId = router.query.id;
  const music = musicList.find((item) => item.trackId === Number(trackId));
  const artistName = music.artists.map((value) => value.artistName);

  // 함수 재실행 방지
  const pageSheet = useMemo(() => {
    // 1 페이지, 최대 29줄
    // 2 페이지, 1 페이지 완료 누르면 보여줌 - 최대 34줄
    const pageSheetObj = {};
    let sheetNum = 0;
    pageSheetObj[sheetNum] = [];

    const lyricArr = music.lyric.split('\n');
    for (let i = 0; i < lyricArr.length; i++) {
      const str = lyricArr[i] === '' ? `\n` : lyricArr[i].replace(/\s+$/, '');

      if (sheetNum === 0 && pageSheetObj[sheetNum].length < 29) {
        // pageSheetObj[sheetNum].push(str);
        pageSheetObj[sheetNum].push(str.split(''));
      } else if (sheetNum === 0) {
        sheetNum += 1;
        pageSheetObj[sheetNum] = [];
      }

      if (sheetNum >= 1 && pageSheetObj[sheetNum].length < 34) {
        // pageSheetObj[sheetNum].push(str);
        pageSheetObj[sheetNum].push(str.split(''));
      } else if (sheetNum >= 1) {
        sheetNum += 1;
        pageSheetObj[sheetNum] = [];
      }
    }

    return pageSheetObj;
  }, [trackId]);

  // 나중에 click -> enter Event 변경
  function onEnterNextPage() {
    if (pageSheetIdx < Object.keys(pageSheet).length - 1) {
      setPageSheetIdx((prev) => prev + 1);
    }
  }
  // 다시하기 함수
  function reset() {
    console.log('다시하기');
    dispatch({ type: 'RESTART' });
    setIsFinished(false);
    setPageSheetIdx(0);
  }

  switch (isFinished) {
    case true: {
      return (
        <Suspense fallback={<progress value={null} />}>
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
        </Suspense>
      );
    }
    case false: {
      return (
        <>
          {pageSheetIdx === 0 ? (
            <div className={styles['id-main']}>
              <h1 className={styles.title}>{music.trackTitle}</h1>
              <p className={styles.artist}>{artistName}</p>
              <Sentence
                pageSheet={pageSheet}
                pageSheetIdx={pageSheetIdx}
                setIsFinished={setIsFinished}
                onEnterNextPage={onEnterNextPage}
              />
              <div className={styles.pageNumber}>
                <p className={styles.page}>
                  {pageSheetIdx + 1} / {Object.keys(pageSheet).length}
                </p>
              </div>
            </div>
          ) : (
            <div className={styles['id-main']}>
              <Sentence
                pageSheet={pageSheet}
                pageSheetIdx={pageSheetIdx}
                setIsFinished={setIsFinished}
                onEnterNextPage={onEnterNextPage}
              />
              <div className={styles.pageNumber}>
                <p className={styles.page}>
                  {pageSheetIdx + 1} / {Object.keys(pageSheet).length}
                </p>
              </div>
            </div>
          )}
        </>
      );
    }
    default: {
      console.error('Error, isFinished is not set');
    }
  }
}
