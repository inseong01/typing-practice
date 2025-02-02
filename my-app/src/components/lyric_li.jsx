import { memo, useEffect } from 'react';
import Letter from './letter';

function Lyric_li({ ly, typingtext, typingSentenceNum, lyricSentenceNum, sentenceArr }) {
  // useEffect(() => {
  //   console.log('Letter redering');
  // });
  return (
    <li data-testid="li">
      {ly.map((txt, idx) => {
        return (
          <Letter
            key={idx}
            typingtext={typingtext[idx]}
            sentenceArr={sentenceArr}
            lyricTextNum={idx}
            lyricSentenceNum={lyricSentenceNum}
            typingSentenceNum={typingSentenceNum}
          >
            {txt}
          </Letter>
        );
      })}
    </li>
  );
}

export default memo(Lyric_li);
