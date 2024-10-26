import styles from '@/styles/letter.module.css';
import { memo, useEffect } from 'react';

function Letter({ children, typingtext, sentenceArr, lyricTextNum, lyricSentenceNum, typingSentenceNum }) {
  // 입력 중인 문장과 현재 문장 비교

  useEffect(() => {
    console.log('rendering');
  });
  const cssName =
    // typingtext && lyricSentenceNum === typingSentenceNum
    typingtext && lyricSentenceNum === typingSentenceNum
      ? typingtext === children
        ? styles.correct
        : styles.wrong
      : '';

  const strCssName = sentenceArr[lyricSentenceNum]
    ? sentenceArr[lyricSentenceNum][lyricTextNum] === children
      ? styles.correct
      : styles.wrong
    : cssName;

  return children === '\n' ? (
    <br data-testid="word" />
  ) : (
    <span data-testid="word" className={strCssName}>
      {children}
    </span>
  );
}

export default memo(Letter);
