import { Context } from '@/pages/_app';
import styles from '@/styles/textInput.module.css';
import { useContext } from 'react';

export default function TextInput({
  typingtext,
  sentenceArr,
  setTypingText,
  currentTextArr,
  setSentenceArr,
  typingSentenceNum,
  setTypingSentenceNum,
}) {
  const { dispatch, state } = useContext(Context);

  return (
    <input
      autoFocus
      id="textInput"
      type="text"
      name="textInput"
      value={typingtext}
      className={styles.textInput}
      data-testid="textInput"
      onCompositionStart={(e) => {
        const txt = e.target.value; // 비어있음
        // 현재 문자 인덱스
        const typingtextIdx = txt.length; // 기본 0
        // 작성 문자 길이 제한
        if (currentTextArr[typingSentenceNum].length < typingtextIdx + 1) {
          setTypingText(txt.slice(0, currentTextArr[typingSentenceNum].length - 1));
          return;
        }
        // 태그 선택
        const liTags = document.getElementsByTagName('li');
        const selectedTag = liTags[typingSentenceNum].children[typingtextIdx];
        let isTagClassNameEmpty; // 동적할당 클래스명 추적
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
              isTagClassNameEmpty = !mutation.target?.className;
              // console.log('클래스가 변경됨: ', isTagClassNameEmpty);
            }
          });
        });
        observer.observe(selectedTag, { attributes: true });

        if (typingtextIdx < 0 || isTagClassNameEmpty) return;
        // 태그 크기
        const tagWidth = selectedTag.offsetWidth;
        dispatch({ type: 'CURSORMOVE', event: 'Typing', tagWidth });
      }}
      onClick={() => console.log('input text click')}
      onChange={(e) => {
        const txt = e.target.value;
        setTypingText(txt);
      }}
      onKeyDown={(e) => {
        switch (e.key) {
          case 'Enter': {
            if (
              currentTextArr[typingSentenceNum].length === typingtext.length ||
              (currentTextArr[typingSentenceNum][0] === '\n' && typingtext === '')
            ) {
              setSentenceArr((prev) => [...prev, typingtext]);
              setTypingSentenceNum((prev) => prev + 1);
              setTypingText('');

              // 다음 페이지 커서 위치 초기화 (sentenceArr 한 박자 늦게 추가됨)
              if (sentenceArr.length + 1 === currentTextArr.length) {
                const tagTop = 0;
                dispatch({ type: 'CURSORMOVE', event: 'Enter', tagTop });
                break;
              }
              // 커서 아래 이동
              const tagHeight = 25.5;
              dispatch({ type: 'CURSORMOVE', event: 'Enter', tagHeight });

              break;
            } else if (
              currentTextArr[typingSentenceNum].length > typingtext.length ||
              currentTextArr[typingSentenceNum].length < typingtext.length
            ) {
              alert('문장 전체를 입력해주세요');
              break;
            }
          }
          case 'Backspace': {
            // 커서 이전 이동
            const txt = e.target.value;
            // 현재 문자 인덱스
            const typingtextIdx = txt.length - 1;
            if (typingtextIdx < 0) {
              dispatch({ type: 'CURSORMOVE', event: 'Backspace', tagLeft: 0 });
              break;
            }
            // 태그 선택
            const liTags = document.getElementsByTagName('li');
            const selectedTag = liTags[typingSentenceNum].children[typingtextIdx + 1];
            // 태그 크기
            const tagWidth = selectedTag?.offsetWidth;
            if (!tagWidth) return;
            dispatch({ type: 'CURSORMOVE', event: 'Backspace', tagWidth });
            break;
          }
          default: {
            // 문자 외 입력 방지
            if (e.key.length !== 1) return;
            const txt = e.target.value;
            // 현재 문자 인덱스
            const typingtextIdx = txt.length;
            // 문자 유형
            const txtType = /[ㄱ-ㅎ-가-힣-ㅏ-ㅣ]/.test(txt[typingtextIdx]) ? 'ko' : 'en';
            if (txtType === 'ko') return;
            // 작성 문자 길이 제한
            if (currentTextArr[typingSentenceNum].length <= typingtextIdx) {
              setTypingText(txt.slice(0, currentTextArr[typingSentenceNum].length - 1));
              return;
            }
            // 태그 선택
            const liTags = document.getElementsByTagName('li');
            const selectedTag = liTags[typingSentenceNum].children[typingtextIdx];
            // 동적할당 클래스명 추적
            let isTagClassNameEmpty;
            const observer = new MutationObserver((mutations) => {
              mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                  isTagClassNameEmpty = !mutation.target?.className;
                  // console.log('클래스가 변경됨: ', isTagClassNameEmpty);
                }
              });
            });
            observer.observe(selectedTag, { attributes: true });
            if (isTagClassNameEmpty) return;
            // 태그 크기
            const tagWidth = selectedTag.offsetWidth;
            dispatch({ type: 'CURSORMOVE', event: 'Typing', tagWidth });
          }
        }
      }}
    />
  );
}
