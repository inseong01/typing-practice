import { useState } from 'react';

import Sentence from '@/components/sentence';
import ResultPage from '@/components/resultPage';
import musicList from '../../../public/musicList';
import styles from '@/styles/[id].module.css';
import splitLyric from '@/function/splitLyric';
// pathname 설계된 링크명
// asPath 브라우저에서 사용하고 있는 링크명

export const getServerSideProps = async (data) => {
  // musicList, API 요청으로 변경
  const trackId = await data.query.id;
  const music = await musicList.find((item) => item.trackId === Number(trackId));
  const artistName = await music.artists.map((value) => value.artistName);
  const pageSheet = splitLyric(music);

  if (music.lyric.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: { music, artistName, pageSheet } };
};

export default function Page({ music, artistName, pageSheet }) {
  const [pageSheetIdx, setPageSheetIdx] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
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
  }
}
