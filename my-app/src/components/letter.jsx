import styles from '@/styles/letter.module.css';
import { memo, useEffect } from 'react';

function Letter({ children, typingtext, sentenceArr, lyricTextNum, lyricSentenceNum, typingSentenceNum }) {
  const isTypingLetterIdxCorrect = typingtext && lyricSentenceNum === typingSentenceNum;
  const storedSentences = sentenceArr[lyricSentenceNum];

  // useEffect(() => {
  //   console.log('rendering');
  // });

  const cssName = isTypingLetterIdxCorrect ? (typingtext === children ? styles.correct : styles.wrong) : '';
  const strCssName = !!storedSentences
    ? storedSentences[lyricTextNum] === children
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
    prev.lyricSentenceNum === next.lyricSentenceNum &&
    prev.typingSentenceNum === next.typingSentenceNum &&
    prev.sentenceArr === next.sentenceArr &&
    prev.lyricTextNum === next.lyricTextNum &&
    prev.children === next.children &&
    prev.typingtext === next.typingtext
  );
});
