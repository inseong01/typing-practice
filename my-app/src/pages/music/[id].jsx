import Sentence from '@/components/sentence';
import ResultPage from '@/components/resultPage';
import styles from '@/styles/[id].module.css';
import Loading from '@/components/loading';
import { Context } from '../_app';

import { useContext, useEffect, useState } from 'react';
import useFetchData from '@/hook/useFetchData';

export const getServerSideProps = async (data) => {
  const trackId = await data.query.id;
  return { props: { trackId } };
};

export default function Page({ trackId }) {
  const { dataObj, pageSheet, loadingPercent } = useFetchData('ID', Number(trackId));
  const [pageSheetIdx, setPageSheetIdx] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const { dispatch, state } = useContext(Context);

  useEffect(() => {
    dispatch({ type: 'RESET' });
  }, []);

  function onEnterNextPage() {
    if (pageSheetIdx < Object.keys(pageSheet).length - 1) {
      setPageSheetIdx((prev) => prev + 1);
    }
  }

  switch (isFinished) {
    case true: {
      return (
        <>
          <ResultPage
            setIsFinished={setIsFinished}
            setPageSheetIdx={setPageSheetIdx}
            music={dataObj.music}
            artistName={dataObj.artistName}
          />
        </>
      );
    }
    case false: {
      return (
        <>
          {Object.keys(pageSheet).length === 0 ? (
            <Loading loadingPercent={loadingPercent} type={'LOAD'} />
          ) : pageSheetIdx === 0 ? (
            <div className={styles['id-main']}>
              <h1 className={styles.title}>{dataObj.music.trackTitle.replace(/\(.*/g, '')}</h1>
              <p className={styles.artist}>{dataObj.artistName}</p>
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
