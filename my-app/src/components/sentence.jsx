import styles from '@/styles/sentence.module.css';
import Letter from './letter';

import { useContext, useEffect, useState } from 'react';
import { Context } from '@/pages/_app';

let start;
let isFirstTime = true;

function Sentence({ pageSheet, pageSheetIdx, setIsFinished }) {
  const [typingtext, setTypingText] = useState('');
  const [sentenceNum, setSentenceNum] = useState(0);
  const [sentenceArr, setSentenceArr] = useState([]);
  const { dispatch, state } = useContext(Context);

  // <--- input 위치, 기본값-입력값 비교 --->
  useEffect(() => {
    // 작성 완료했을 때 (pageSheetIdx 증가 설정)
    if (
      Object.keys(pageSheet).length === pageSheetIdx + 1 &&
      sentenceArr.length === pageSheet[pageSheetIdx].length
    ) {
      // 모달창 구현
      setIsFinished(true);
      // 결과 보여줌(계산)
      // 타이머 마무리
      const end = Date.now();
      console.log('end', end);

      dispatch({ type: 'CALCULATE', start, end, sentenceArr, pageSheet });
    }
  }, [sentenceArr]);

  useEffect(() => {
    if (!isFirstTime || !typingtext) return;
    // 타이머 시작
    start = Date.now();
    console.log('start', start);
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
            if (
              (e.key === 'Enter' && pageSheet[pageSheetIdx][sentenceNum].length === typingtext.length) ||
              (e.key === 'Enter' && pageSheet[pageSheetIdx][sentenceNum][0] === '\n' && typingtext === '')
            ) {
              setSentenceArr((prev) => [...prev, typingtext]);
              setSentenceNum((prev) => prev + 1);
              setTypingText('');
            } else if (e.key === 'Enter' && pageSheet[pageSheetIdx][sentenceNum].length > typingtext.length) {
              alert('문장 전체를 입력해주세요');
            }
          }}
        />
      </label>
    </>
  );
}

export default Sentence;
