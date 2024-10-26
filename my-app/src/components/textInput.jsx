import { Context } from '@/pages/_app';
import styles from '@/styles/textInput.module.css';
import { useContext, useState } from 'react';

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
        console.log('in');
      }}
      onBlur={() => {
        console.log('out');
      }}
      onChange={(e) => {
        const txt = e.target.value;
        const generatedSentence = currentTextArr[typingSentenceNum];
        // 작성 문자 길이 제한
        if (generatedSentence.length >= txt.length) setTypingText(txt);
        setTypingText((prev) => prev.slice(0, generatedSentence.length));
      }}
      onCompositionStart={(e) => {
        const txt = e.target.value;
        const generatedSentence = currentTextArr[typingSentenceNum];
        // 현재 문자 인덱스
        const typingtextIdx = txt.length; // 기본 0
        // 작성 문자 길이 제한
        if (generatedSentence.length < typingtext.length + 1) return (isFull = true);
        if (isFull || typingtextIdx < 0) return;
        // 태그 선택
        const liTags = document.getElementsByTagName('li');
        const selectedTag = liTags[typingSentenceNum].children[typingtextIdx];
        // 태그 크기
        const tagWidth = Number(selectedTag.getBoundingClientRect().width.toFixed(2));
        dispatch({ type: 'CURSORMOVE', event: 'Typing', tagWidth });
      }}
      onCompositionUpdate={(e) => {
        const txt = e.target.value;
        composedText = txt;
      }}
      onCompositionEnd={(e) => {
        console.log('end', composedText.length, e.target.value.length);
        // input value가 isFull이면 최대 길이로 고정
        const txtLength = isFull ? typingtext.length : e.target.value.length;
        // 작성 문자 길이 제한
        if (0 > txtLength) return; // 무조건 한 글자는 입력돼서 0 포함 가능, 지운 이후는 backspace 적용
        // 이전 문자가 현재 문자 길이보다 클 때
        if (composedText.length > txtLength) {
          // 현재 문자 인덱스
          const typingtextIdx = txtLength;
          // 태그 선택
          const liTags = document.getElementsByTagName('li');
          const selectedTag = liTags[typingSentenceNum].children[typingtextIdx];
          // 태그 크기
          const tagWidth = Number(selectedTag.getBoundingClientRect().width.toFixed(2));
          dispatch({ type: 'CURSORMOVE', event: 'Backspace', tagWidth });
          isFull = false;
        }
        composedText = '';
      }}
      onKeyDown={(e) => {
        const generatedSentence = currentTextArr[typingSentenceNum];
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
              // 태그 선택
              const liTags = document.getElementsByTagName('li');
              const selectedTag = liTags[typingSentenceNum + 1];
              // 태그 크기
              const tagHeight = Number(selectedTag.getBoundingClientRect().height.toFixed(2));
              dispatch({ type: 'CURSORMOVE', event: 'Enter', tagHeight });

              break;
            } else if (
              generatedSentence.length > typingtext.length ||
              generatedSentence.length < typingtext.length
            ) {
              alert('문장 전체를 입력해주세요');
              break;
            }
          }
          case 'Backspace': {
            isFull = false;
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
            const selectedTag = liTags[typingSentenceNum].children[typingtextIdx];
            // 태그 크기
            const tagWidth = Number(selectedTag.getBoundingClientRect().width.toFixed(2));
            dispatch({ type: 'CURSORMOVE', event: 'Backspace', tagWidth });
            break;
          }
          default: {
            // 문자 외 입력 방지(한글 e.key: process)
            if (e.key.length !== 1) return;
            const txt = typingtext;
            // 현재 문자 인덱스
            const typingtextIdx = txt.length - 1;
            // 작성 문자 길이 제한
            if (generatedSentence.length < txt.length + 1) return;
            // 태그 선택
            const liTags = document.getElementsByTagName('li');
            const selectedTag = liTags[typingSentenceNum].children[typingtextIdx + 1];
            // 태그 크기
            // const tagWidth = selectedTag.offsetWidth;
            const tagWidth = Number(selectedTag.getBoundingClientRect().width.toFixed(2));
            dispatch({ type: 'CURSORMOVE', event: 'Typing', tagWidth });
          }
        }
      }}
    />
  );
}
