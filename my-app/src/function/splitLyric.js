function splitLyric(music) {
  // 1 페이지, 최대 27줄
  // 2 페이지, 1 페이지 완료 누르면 보여줌 - 최대 32줄
  let sheetNum = 0;
  const pageSheetObj = {};
  pageSheetObj[sheetNum] = [];

  const lyricArr = music.lyric.split('\n');
  for (let i = 0; i < lyricArr.length; i++) {
    // '('시작 문장 건너뜀
    if (/^\(|^"\(/.test(lyricArr[i])) continue;
    // 현재 문장이 공백이고 다음 문장도 공백이면 현재 문장 건너뜀
    if (
      /^\s+$|''/.test(lyricArr[i]) &&
      // /^\s+$|''/.test(lyricArr[i + 1]) ||
      lyricArr[i + 1] === undefined
    ) continue;

    // 가사 편집
    let editLyric = '';
    // 앞/뒤 공백, 따옴표, 괄호 이후 내용 제거
    editLyric = lyricArr[i].replace(/^\s+|\s+$|^'|\(.*/g, '');
    // 하이픈 제거
    editLyric = editLyric.replace(/-/g, ' ');

    const str = lyricArr[i] === '' || lyricArr[i] === ' ' ? `\n` : editLyric;

    if (sheetNum === 0 && pageSheetObj[sheetNum].length < 27) {
      // 문장, 단어로 나누어 push
      pageSheetObj[sheetNum].push(str.split(''));
      // 시작 문장 공백 방지 '\n'
      if (pageSheetObj[sheetNum][0][0] === '\n') pageSheetObj[sheetNum].pop();
    } else if (sheetNum === 0) {
      // 마지막 문장 공백 방지 '\n'
      const lastSentence = pageSheetObj[sheetNum][pageSheetObj[sheetNum].length - 1][0]
      if (lastSentence.includes('\n')) pageSheetObj[sheetNum].pop();
      return pageSheetObj; // 페이지 수 1로 제한

      sheetNum += 1;
      pageSheetObj[sheetNum] = [];
    }

    if (sheetNum >= 1 && pageSheetObj[sheetNum].length < 32) {
      // 문장, 단어로 나누어 push
      pageSheetObj[sheetNum].push(str.split(''));
      // 시작 문장 공백 방지 '\n'
      if (pageSheetObj[sheetNum][0][0] === '\n') pageSheetObj[sheetNum].pop();
    } else if (sheetNum >= 1) {
      // 마지막 문장 공백 방지 '\n'
      const lastSentence = pageSheetObj[sheetNum][pageSheetObj[sheetNum].length - 1][0]
      if (lastSentence.includes('\n')) pageSheetObj[sheetNum].pop();
      // 페이지 수 증가
      sheetNum += 1;
      // 페이지 객체 배열 할당
      pageSheetObj[sheetNum] = [];
    }
  }
  return pageSheetObj;
}

export default splitLyric;