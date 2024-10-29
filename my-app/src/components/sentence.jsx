import styles from '@/styles/sentence.module.css';
import TextInput from './textInput';
import Lyric_li from './lyric_li';

import { memo, useContext, useEffect, useState } from 'react';
import { Context } from '@/pages/_app';

let start = null;
let isFirstTime = true;
let totalSentenceObj = {};

function detectLanguage(char = '', current) {
  // const code = char.charCodeAt(0);
  const en = /[a-z]/gi.test(char);
  const ko = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g.test(char);
  if (en) {
    // if ((code >= 0x0041 && code <= 0x005a) || (code >= 0x0061 && code <= 0x007a)) {
    return '영';
  } else if (ko) {
    return '한';
  } else {
    return current;
  }
}

function Sentence({ pageSheet, pageSheetIdx, setIsFinished, onEnterNextPage }) {
  const [typingtext, setTypingText] = useState('');
  const [typingSentenceNum, setTypingSentenceNum] = useState(0);
  const [sentenceArr, setSentenceArr] = useState([]);
  const [currentLang, setCurrentLang] = useState('');
  const { dispatch } = useContext(Context);

  useEffect(() => {
    if (sentenceArr.length === 0) return;
    // 한 페이지 작성 완료했을 때
    if (sentenceArr.length === pageSheet[pageSheetIdx].length) {
      totalSentenceObj[pageSheetIdx] = sentenceArr;
      setSentenceArr([]);
      onEnterNextPage();

      if (Object.keys(pageSheet).length !== pageSheetIdx + 1) return;
      // 모든 페이지 작성 완료했을 때
      setIsFinished(true);
      const end = Date.now();
      dispatch({ type: 'CALCULATE', start, end, totalSentenceObj, pageSheet });
      totalSentenceObj = {};
      isFirstTime = true;
      start = null;
    }
  }, [sentenceArr]);

  useEffect(() => {
    // 방금 작성한 문자 언어 검사
    if (!typingtext) return;
    const lastChar = typingtext[typingtext.length - 1];
    const lang = detectLanguage(lastChar, currentLang);
    setCurrentLang(lang);

    // 첫 입력 감지
    if (!isFirstTime) return;
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
        <li data-testid="cursor" className={styles.cursor}></li>
      </ul>
      <label data-testid="label" htmlFor="textInput" className={styles.labelTextInput}>
        <div className={styles.lang}>{currentLang.length !== 0 && currentLang}</div>
      </label>
      <TextInput
        typingtext={typingtext}
        sentenceArr={sentenceArr}
        setTypingText={setTypingText}
        setSentenceArr={setSentenceArr}
        currentTextArr={pageSheet[pageSheetIdx]}
        typingSentenceNum={typingSentenceNum}
        setTypingSentenceNum={setTypingSentenceNum}
      />
    </>
  );
}

export default memo(Sentence);
