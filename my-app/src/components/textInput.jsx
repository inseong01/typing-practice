import { Context } from '@/pages/_app';
import styles from '@/styles/textInput.module.css';
import { useContext, useRef } from 'react';

let isFull = false;
let composedText = '';
let isBlur = false;

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

  function onChangeHandler(e) {
    const txt = e.target.value;
    const generatedSentence = currentTextArr[typingSentenceNum];
    // 작성 문자 길이 제한
    if (generatedSentence.length >= txt.length) {
      setTypingText(txt.slice(0, generatedSentence.length));
    }
  }

  function onCompositionStart(e) {
    const txt = e.target.value;
    const generatedSentence = currentTextArr[typingSentenceNum];
    // 현재 문자 인덱스
    const typingtextIdx = txt.length; // 기본 0
    // 작성 문자 길이 제한
    if (generatedSentence.length < typingtext.length + 1) return (isFull = true);
    if (isFull || typingtextIdx < 0) return;
    // 태그 선택
    const liTags = document.getElementsByTagName('li');
    const selectedLetterTag = liTags[typingSentenceNum].children[typingtextIdx];
    // 태그 크기
    const tagWidth = Number(selectedLetterTag.getBoundingClientRect().width.toFixed(2));
    dispatch({ type: 'CURSORMOVE', event: 'Typing', tagWidth });
  }

  function onCompositionUpdate(e) {
    const txt = e.target.value;
    composedText = txt;
  }

  function onCompositionEnd(e) {
    // input value가 isFull이면 최대 길이로 고정
    const txtLength = isFull ? typingtext.length : e.target.value.length;
    // 현재 문자 인덱스
    const typingtextIdx = txtLength;
    // 태그 선택
    const liTags = document.getElementsByTagName('li');
    const selectedliTagLength = liTags[typingSentenceNum].children.length;
    const selectedLetterTag = liTags[typingSentenceNum].children[typingtextIdx];
    // 작성 문자 길이 제한
    if (0 > txtLength) return; // 무조건 한 글자는 입력, -1부터 backspace 적용
    if (selectedliTagLength <= txtLength && !isBlur) return; // 문장 길이 일치하면 넘어감 (Enter)
    if (isBlur) {
      // 사라진 태그 선택
      const selectedLetterTag = liTags[typingSentenceNum].children[typingtextIdx - 1];
      // 태그 크기
      const tagWidth = Number(selectedLetterTag.getBoundingClientRect().width.toFixed(2));
      // 커서 이동
      dispatch({ type: 'CURSORMOVE', event: 'Backspace', tagWidth });
      return;
    }
    // 태그 크기
    const tagWidth = Number(selectedLetterTag.getBoundingClientRect().width.toFixed(2));
    // 이전 문자가 현재 문자 길이보다 길 때
    if (composedText.length > txtLength) {
      // 커서 이동
      dispatch({ type: 'CURSORMOVE', event: 'Backspace', tagWidth });
      isFull = false;
      return;
    }
    composedText = '';
  }

  function onKeyDown(e) {
    const generatedSentence = currentTextArr[typingSentenceNum];
    const liTags = document.getElementsByTagName('li');
    switch (e.key) {
      case 'Enter': {
        if (
          generatedSentence.length === typingtext.length ||
          (generatedSentence[0] === '\n' && typingtext === '')
        ) {
          setSentenceArr((prev) => [...prev, typingtext]);
          setTypingSentenceNum((prev) => prev + 1);
          setTypingText('');
          isFull = false;
          // 다음 페이지 커서 위치 초기화 (sentenceArr 한 박자 늦게 추가됨)
          if (sentenceArr.length + 1 === currentTextArr.length) {
            dispatch({ type: 'CURSORMOVE', event: 'Enter', tagTop: 0 });
            break;
          }
          // 태그 선택 (다음 줄)
          const selectedLetterTag = liTags[typingSentenceNum + 1];
          // 태그 크기
          const tagHeight = Number(selectedLetterTag.getBoundingClientRect().height.toFixed(2));
          dispatch({ type: 'CURSORMOVE', event: 'Enter', tagHeight });
          break;
        } else if (generatedSentence.length > typingtext.length) {
          alert('문장 전체를 입력해주세요');
          break;
        }
      }
      case 'Backspace': {
        isFull = false;
        // 현재 문자 인덱스
        const typingtextIdx = typingtext.length - 1;
        if (typingtextIdx < 0) {
          dispatch({ type: 'CURSORMOVE', event: 'Backspace', tagLeft: 0 });
          break;
        }
        // 태그 선택 (현재 문자)
        const selectedLetterTag = liTags[typingSentenceNum].children[typingtextIdx];
        // 태그 크기
        const tagWidth = Number(selectedLetterTag.getBoundingClientRect().width.toFixed(2));
        dispatch({ type: 'CURSORMOVE', event: 'Backspace', tagWidth });
        break;
      }
      default: {
        if (e.key.length > 1) return;
        // 현재 문자 인덱스
        const typingtextIdx = typingtext.length - 1;
        // 작성 문자 길이 제한
        if (generatedSentence.length < typingtext.length + 1) return;
        // 태그 선택 (다음 문자)
        const selectedLetterTag = liTags[typingSentenceNum].children[typingtextIdx + 1];
        // 태그 크기
        const tagWidth = Number(selectedLetterTag.getBoundingClientRect().width.toFixed(2));
        dispatch({ type: 'CURSORMOVE', event: 'Typing', tagWidth });
      }
    }
  }

  return (
    <input
      autoFocus
      id="textInput"
      type="text"
      name="textInput"
      value={typingtext}
      className={styles.textInput}
      data-testid="textInput"
      onClick={(e) => {
        console.log('input text click');
      }}
      onFocus={() => {
        isBlur = false;
      }}
      onBlur={() => {
        isBlur = true;
      }}
      onChange={onChangeHandler}
      onCompositionStart={onCompositionStart}
      onCompositionUpdate={onCompositionUpdate}
      onCompositionEnd={onCompositionEnd}
      onKeyDown={onKeyDown}
    />
  );
}
