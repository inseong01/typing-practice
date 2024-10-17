import styles from '@/styles/letter.module.css';

export default function Letter({
  children,
  typingtext,
  sentenceArr,
  lyricTextNum,
  lyricSentenceNum,
  typingSentenceNum,
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
    <br data-testid="word" />
  ) : (
    <span data-testid="word" className={strCssName}>
      {children}
    </span>
  );
}
