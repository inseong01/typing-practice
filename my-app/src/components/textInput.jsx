import styles from '@/styles/textInput.module.css';

let cursorLeftValue = 0;
let cursorTopValue = 2;

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
        const txt = e.target.value;
        setTypingText(txt);
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

              const moveAmount = 25.5;
              cursorTopValue += moveAmount;
              cursorLeftValue = 0;
              document.documentElement.style.setProperty('--cursor-top', `${cursorTopValue}px`);
              document.documentElement.style.setProperty('--cursor-left', `${cursorLeftValue}px`);
              console.log(e.key, moveAmount, `${cursorLeftValue}px`, `${cursorTopValue}px`);
              break;
            } else if (
              currentTextArr.length > typingtext.length ||
              currentTextArr.length < typingtext.length
            ) {
              alert('문장 전체를 입력해주세요');
              break;
            }
          }
          case 'Backspace': {
            if (cursorLeftValue <= 0) return;
            const moveAmount = 14.7;

            cursorLeftValue -= moveAmount;
            document.documentElement.style.setProperty('--cursor-left', `${cursorLeftValue}px`);
            console.log(e.key, moveAmount, `${cursorLeftValue}px`);
            break;
          }
          case '': {
            const moveAmount = 4;

            cursorLeftValue += moveAmount;
            document.documentElement.style.setProperty('--cursor-left', `${cursorLeftValue}px`);
            console.log(e.key, moveAmount, `${cursorLeftValue}px`);
            break;
          }
          default: {
            const moveAmount = 14.7;

            cursorLeftValue += moveAmount;
            document.documentElement.style.setProperty('--cursor-left', `${cursorLeftValue}px`);
            console.log(e.key, moveAmount, `${cursorLeftValue}px`);
          }
        }
      }}
    />
  );
}
