import styles from '@/styles/letter.module.css';
import { memo, useEffect } from 'react';

function Letter({ children, typingtext, sentenceArr, lyricTextNum, lyricSentenceNum, typingSentenceNum }) {
  const isTypingLetterIdxCorrect = typingtext && lyricSentenceNum === typingSentenceNum;
  const storedSentence = sentenceArr[lyricSentenceNum];

  // useEffect(() => {
  //   console.log('rendering');
  // });

  const cssName = isTypingLetterIdxCorrect ? (typingtext === children ? styles.correct : styles.wrong) : '';
  const strCssName = !!storedSentence
    ? storedSentence[lyricTextNum] === children
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

export default memo(Letter, (prev, next) => {
  return (
    prev.typingSentenceNum === next.typingSentenceNum &&
    prev.lyricSentenceNum === next.lyricSentenceNum &&
    prev.lyricTextNum === next.lyricTextNum &&
    prev.sentenceArr === next.sentenceArr &&
    prev.typingtext === next.typingtext &&
    prev.children === next.children
  );
});
