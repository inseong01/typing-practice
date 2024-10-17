import styles from '@/styles/sentence.module.css';
import TextInput from './textInput';
import Lyric_li from './lyric_li';

import { useContext, useEffect, useState } from 'react';
import { Context } from '@/pages/_app';

let start = null;
let isFirstTime = true;
let totalSentenceObj = {};

function Sentence({ pageSheet, pageSheetIdx, setIsFinished, onEnterNextPage }) {
  const [typingtext, setTypingText] = useState('');
  const [typingSentenceNum, setTypingSentenceNum] = useState(0);
  const [sentenceArr, setSentenceArr] = useState([]);
  const { dispatch, state } = useContext(Context);

  useEffect(() => {
    if (sentenceArr.length === 0) return;
    // 한 페이지 작성 완료했을 때
    if (sentenceArr.length === pageSheet[pageSheetIdx].length) {
      totalSentenceObj[pageSheetIdx] = sentenceArr;
      setSentenceArr([]);
      onEnterNextPage();
    }

    // 모든 페이지 작성 완료했을 때
    if (
      sentenceArr.length === pageSheet[pageSheetIdx].length &&
      Object.keys(pageSheet).length === pageSheetIdx + 1
    ) {
      setIsFinished(true);
      const end = Date.now();
      dispatch({ type: 'CALCULATE', start, end, totalSentenceObj, pageSheet });
      totalSentenceObj = {};
      start = null;
      isFirstTime = true;
    }
  }, [sentenceArr]);

  useEffect(() => {
    if (!isFirstTime || !typingtext) return;
    start = Date.now();
    isFirstTime = false;
  }, [typingtext]);

  return (
    <>
      <ul className={styles.lyric} data-testid="lyric">
        {pageSheet[pageSheetIdx].map((ly, i) => {
          return (
            <Lyric_li
              key={i}
              ly={ly}
              typingtext={typingtext}
              sentenceArr={sentenceArr}
              lyricSentenceNum={i}
              typingSentenceNum={typingSentenceNum}
            />
          );
        })}
        <div data-testid="cursor" className={styles.cursor}></div>
      </ul>
      <label data-testid="label" htmlFor="textInput" className={styles.labelTextInput}>
        <TextInput
          typingtext={typingtext}
          setTypingText={setTypingText}
          setSentenceArr={setSentenceArr}
          setTypingSentenceNum={setTypingSentenceNum}
          currentTextArr={pageSheet[pageSheetIdx][typingSentenceNum]}
        />
      </label>
    </>
  );
}

export default Sentence;
