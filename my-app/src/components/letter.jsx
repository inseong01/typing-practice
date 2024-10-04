import styles from '@/styles/letter.module.css';
import { useState } from 'react';

export default function Letter({ text }) {
  const [typingtext, setTypingText] = useState('');
  // <--- input 위치, 기본값-입력값 비교 --->
  console.log(text, typingtext);
  return (
    <>
      <span>{text}</span>
      <input
        autoFocus
        type="text"
        className={styles.textInput}
        onChange={(e) => {
          setTypingText(e.target.value);
        }}
      />
    </>
  );
}
