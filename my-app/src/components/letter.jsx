import styles from '@/styles/letter.module.css';

export default function Letter({ children, typingtext, sentenceNum, strNum, charNum, sentenceArr }) {
  const cssName =
    typingtext && strNum === sentenceNum ? (typingtext === children ? styles.correct : styles.wrong) : '';

  const strCssName = sentenceArr[strNum]
    ? sentenceArr[strNum][charNum] === children
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
