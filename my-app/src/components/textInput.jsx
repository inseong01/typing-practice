import styles from '@/styles/textInput.module.css';

export default function TextInput({
  typingtext,
  setTypingText,
  currentTextArr,
  setSentenceArr,
  setTypingSentenceNum,
}) {
  return (
    <input
      data-testid="textInput"
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
        switch (e.key) {
          case 'Enter': {
            if (
              currentTextArr.length === typingtext.length ||
              (currentTextArr[0] === '\n' && typingtext === '')
            ) {
              setSentenceArr((prev) => [...prev, typingtext]);
              setTypingSentenceNum((prev) => prev + 1);
              setTypingText('');
              break;
            } else if (
              currentTextArr.length > typingtext.length ||
              currentTextArr.length < typingtext.length
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
  );
}
