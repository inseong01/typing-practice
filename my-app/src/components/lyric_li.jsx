import Letter from './letter';

export default function Lyric_li({ ly, typingtext, typingSentenceNum, lyricSentenceNum, sentenceArr }) {
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
