import Sentence from '@/components/sentence';
import ResultPage from '@/components/resultPage';
import musicList from '../../../public/musicList';
import styles from '@/styles/[id].module.css';

import { useMemo, useState } from 'react';
// pathname 설계된 링크명
// asPath 브라우저에서 사용하고 있는 링크명

export const getServerSideProps = async (data) => {
  // musicList, API 요청으로 변경
  const trackId = await data.query.id;
  const music = await musicList.find((item) => item.trackId === Number(trackId));
  const artistName = await music.artists.map((value) => value.artistName);

  if (music.lyric.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: { trackId, music, artistName } };
};

export default function Page({ trackId, music, artistName }) {
  const [pageSheetIdx, setPageSheetIdx] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

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

  function onEnterNextPage() {
    if (pageSheetIdx < Object.keys(pageSheet).length - 1) {
      setPageSheetIdx((prev) => prev + 1);
    }
  }

  switch (isFinished) {
    case true: {
      return (
        <ResultPage
          setIsFinished={setIsFinished}
          setPageSheetIdx={setPageSheetIdx}
          music={music}
          artistName={artistName}
        />
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
                key={pageSheetIdx}
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
                key={pageSheetIdx}
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
