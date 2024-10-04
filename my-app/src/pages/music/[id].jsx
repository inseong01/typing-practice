import Sentence from '@/components/sentence';
import musicList from '../../../public/musicList';
import styles from '@/styles/[id].module.css';

import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
// pathname 설계된 링크명
// asPath 브라우저에서 사용하고 있는 링크명

export default function Page() {
  const [pageSheetIdx, setPageSheetIdx] = useState(0);

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
      if (sheetNum === 0 && pageSheetObj[sheetNum].length < 29) {
        pageSheetObj[sheetNum].push(lyricArr[i].split(''));
      } else if (sheetNum === 0) {
        sheetNum += 1;
        pageSheetObj[sheetNum] = [];
      }

      if (sheetNum >= 1 && pageSheetObj[sheetNum].length < 34) {
        pageSheetObj[sheetNum].push(lyricArr[i].split(''));
      } else if (sheetNum >= 1) {
        sheetNum += 1;
        pageSheetObj[sheetNum] = [];
      }
    }

    return pageSheetObj;
  }, [trackId]);

  // 나중에 click -> enter Event 변경
  function onClickNextPage() {
    if (pageSheetIdx < Object.keys(pageSheet).length - 1) {
      setPageSheetIdx((prev) => prev + 1);
    }
  }

  console.log(pageSheet);

  return (
    <>
      {pageSheetIdx === 0 ? (
        <div className={styles['id-main']}>
          <h1 className={styles.title}>{music.trackTitle}</h1>
          <p className={styles.artist}>{artistName}</p>
          <Sentence pageSheet={pageSheet} pageSheetIdx={pageSheetIdx} />
        </div>
      ) : (
        <div className={styles['id-main']}>
          <Sentence pageSheet={pageSheet} pageSheetIdx={pageSheetIdx} />
        </div>
      )}
    </>
  );
}
