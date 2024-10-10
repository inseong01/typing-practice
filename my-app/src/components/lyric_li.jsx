import Letter from './letter';

export default function Lyric_li({ ly, typingtext, sentenceNum, strNum, sentenceArr }) {
  return (
    <li data-testid="li">
      {ly.map((txt, idx) => {
        return (
          <Letter
            key={idx}
            typingtext={typingtext[idx]}
            sentenceNum={sentenceNum}
            strNum={strNum}
            charNum={idx}
            sentenceArr={sentenceArr}
          >
            {txt}
          </Letter>
        );
      })}
    </li>
  );
}
