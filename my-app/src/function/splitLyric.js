function splitLyric(music) {
  // 1 페이지, 최대 29줄
  // 2 페이지, 1 페이지 완료 누르면 보여줌 - 최대 34줄
  // 문장 앞뒤 공백 제거
  // 마지막 페이지 마지막 문단 공백 제거
  const pageSheetObj = {};
  let sheetNum = 0;
  pageSheetObj[sheetNum] = [];

  const lyricArr = music.lyric.split('\n');
  for (let i = 0; i < lyricArr.length; i++) {
    if (lyricArr[i] === '' && lyricArr[i + 1] === '' || lyricArr[i + 1] === undefined) continue;

    const str = lyricArr[i] === '' ? `\n` : lyricArr[i].replace(/^\s+|\s+$/g, '');

    if (sheetNum === 0 && pageSheetObj[sheetNum].length < 29) {
      pageSheetObj[sheetNum].push(str.split(''));
    } else if (sheetNum === 0) {
      sheetNum += 1;
      pageSheetObj[sheetNum] = [];
    }

    if (sheetNum >= 1 && pageSheetObj[sheetNum].length < 34) {
      pageSheetObj[sheetNum].push(str.split(''));
    } else if (sheetNum >= 1) {
      sheetNum += 1;
      pageSheetObj[sheetNum] = [];
    }
  }

  return pageSheetObj;
}

export default splitLyric;