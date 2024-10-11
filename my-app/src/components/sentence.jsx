import styles from '@/styles/sentence.module.css';
import TextInput from './textInput';
import Lyric_li from './lyric_li';

import { useContext, useEffect, useState } from 'react';
import { Context } from '@/pages/_app';

let start = null;
let isFirstTime = true;
let totalSentenceArr = {};

function Sentence({ pageSheet, pageSheetIdx, setIsFinished, onEnterNextPage }) {
  // console.log(pageSheet, pageSheetIdx, setIsFinished, onEnterNextPage);
  const [typingtext, setTypingText] = useState('');
  const [sentenceNum, setSentenceNum] = useState(0);
  const [sentenceArr, setSentenceArr] = useState([]);
  const { dispatch, state } = useContext(Context);

  useEffect(() => {
    if (sentenceArr.length === 0) return;
    // 한 페이지 작성 완료했을 때
    if (sentenceArr.length === pageSheet[pageSheetIdx].length) {
      totalSentenceArr[pageSheetIdx] = sentenceArr;
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
      dispatch({ type: 'CALCULATE', start, end, totalSentenceArr, pageSheet });
      totalSentenceArr = {};
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
              sentenceNum={sentenceNum}
              strNum={i}
              sentenceArr={sentenceArr}
            />
          );
        })}
      </ul>
      <label data-testid="label" htmlFor="textInput" className={styles.labelTextInput}>
        <TextInput
          typingtext={typingtext}
          setTypingText={setTypingText}
          currentTextArr={pageSheet[pageSheetIdx][sentenceNum]}
          setSentenceArr={setSentenceArr}
          setSentenceNum={setSentenceNum}
        />
      </label>
    </>
  );
}

export default Sentence;
