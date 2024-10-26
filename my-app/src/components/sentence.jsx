import styles from '@/styles/sentence.module.css';
import TextInput from './textInput';
import Lyric_li from './lyric_li';

import { memo, useContext, useEffect, useState } from 'react';
import { Context } from '@/pages/_app';

let start = null;
let isFirstTime = true;
let totalSentenceObj = {};

function detectLanguage(char = '') {
  const code = char.charCodeAt(0);
  if ((code >= 0x0041 && code <= 0x005a) || (code >= 0x0061 && code <= 0x007a)) {
    return 'English';
  } else {
    return '';
  }
}

function Sentence({ pageSheet, pageSheetIdx, setIsFinished, onEnterNextPage }) {
  const [typingtext, setTypingText] = useState('');
  const [typingSentenceNum, setTypingSentenceNum] = useState(0);
  const [sentenceArr, setSentenceArr] = useState([]);
  const [currentLang, setCurrentLang] = useState('');
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
      isFirstTime = true;
      start = null;
    }
  }, [sentenceArr]);

  useEffect(() => {
    if (!isFirstTime || !typingtext) return;
    start = Date.now();
    isFirstTime = false;
  }, [typingtext]);

  useEffect(() => {
    if (!typingtext) return;
    // 방금 작성한 문자 언어 검사
    const lastChar = typingtext[typingtext.length - 1];
    const lang = detectLanguage(lastChar);
    setCurrentLang(lang === 'English' ? '영문' : '');
  }, [typingtext]);

  const handleClick = (e) => {
    console.log('label');
    document.getElementById('textInput').focus(); // input에 포커스 강제 설정
  };

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
      <label data-testid="label" htmlFor="textInput" className={styles.labelTextInput} onClick={handleClick}>
        <div className={styles.lang}>{currentLang.length !== 0 && currentLang}</div>
        <TextInput
          typingtext={typingtext}
          sentenceArr={sentenceArr}
          setTypingText={setTypingText}
          setSentenceArr={setSentenceArr}
          currentTextArr={pageSheet[pageSheetIdx]}
          typingSentenceNum={typingSentenceNum}
          setTypingSentenceNum={setTypingSentenceNum}
        />
      </label>
    </>
  );
}

export default memo(Sentence);
