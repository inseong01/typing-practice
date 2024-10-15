import styles from '@/styles/letter.module.css';

export default function Letter({
  children,
  typingtext,
  typingSentenceNum,
  lyricSentenceNum,
  lyricTextNum,
  sentenceArr,
}) {
  const cssName =
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
    <br data-testid="br" />
  ) : (
    <span data-testid="textDiv" className={strCssName}>
      {children}
    </span>
  );
}
