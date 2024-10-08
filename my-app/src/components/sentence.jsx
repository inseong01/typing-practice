import styles from '@/styles/sentence.module.css';
import Letter from './letter';

import { useContext, useEffect, useState } from 'react';
import { Context } from '@/pages/_app';

let start;
let isFirstTime = true;
let totalSentenceArr = {};

function Sentence({ pageSheet, pageSheetIdx, setIsFinished, onEnterNextPage }) {
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
    // -----------------------------------------------
    // 모든 페이지 작성 완료했을 때
    if (
      sentenceArr.length === pageSheet[pageSheetIdx].length &&
      Object.keys(pageSheet).length === pageSheetIdx + 1
    ) {
      // 모달창 구현
      setIsFinished(true);
      // 결과 보여줌(계산)
      const end = Date.now();
      dispatch({ type: 'CALCULATE', start, end, totalSentenceArr, pageSheet });
      // 초기화
      totalSentenceArr = {};
    }
  }, [sentenceArr]);

  useEffect(() => {
    if (!isFirstTime || !typingtext) return;
    start = Date.now();
    isFirstTime = false;
  }, [typingtext]);

  return (
    <>
      <ul className={styles.lyric}>
        {pageSheet[pageSheetIdx].map((ly, i) => {
          return (
            <li key={i}>
              {ly.map((txt, idx) => {
                return (
                  <Letter
                    typingtext={typingtext[idx]}
                    sentenceNum={sentenceNum}
                    strNum={i}
                    charNum={idx}
                    sentenceArr={sentenceArr}
                  >
                    {txt}
                  </Letter>
                );
              })}
            </li>
          );
        })}
      </ul>
      <label htmlFor="textInput" className={styles.labelTextInput}>
        <input
          autoFocus
          type="text"
          id="textInput"
          className={styles.textInput}
          name="textInput"
          value={typingtext}
          onClick={() => console.log('input text click')}
          onChange={(e) => {
            setTypingText(e.target.value);
          }}
          onKeyUp={(e) => {
            console.log(pageSheet[pageSheetIdx][sentenceNum]);
            switch (e.key) {
              case 'Enter': {
                if (
                  pageSheet[pageSheetIdx][sentenceNum].length === typingtext.length ||
                  (pageSheet[pageSheetIdx][sentenceNum][0] === '\n' && typingtext === '')
                ) {
                  setSentenceArr((prev) => [...prev, typingtext]);
                  setSentenceNum((prev) => prev + 1);
                  setTypingText('');
                  break;
                } else if (
                  pageSheet[pageSheetIdx][sentenceNum].length > typingtext.length ||
                  pageSheet[pageSheetIdx][sentenceNum].length < typingtext.length
                ) {
                  alert('문장 전체를 입력해주세요');
                  break;
                }
              }
              default: {
              }
            }
          }}
        />
      </label>
    </>
  );
}

export default Sentence;
