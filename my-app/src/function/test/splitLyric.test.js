import splitLyric from "../splitLyric";

const music = {
  "lyric": "I'm on my way \nHold on, hold on\nI'm on my way \nYeah yeah yeah yeah yeah \nI'm on my way \n\nDon't you want me like I want you, baby \nDon't you need me like I need you now \nSleep tomorrow but tonight go crazy \nAll you gotta do is just meet me at the \n\n아파트 아파트 \n아파트 아파트 \n아파트 아파트 \nJust meet me at the \n(Uh huh uh huh)\n \n아파트 아파트 \n아파트 아파트\n아파트 아파트 \n아파트 아파트 \nJust meet me at the \n(Uh huh uh huh)\n \n아파트 아파트 \n아파트 아파트\n아파트 아파트 \n아파트 아파트 \nJust meet me at the \n(Uh huh uh huh)\n \n아파트 아파트 \n아파트 아파트\n아파트 아파트 \n아파트 아파트 \nJust meet me at the \n(Uh huh uh huh)\n \n아파트 아파트 \n아파트 아파트",
}

describe('SplitLyric test : ', () => {
  let lyric;
  let pageNumber;

  beforeAll(() => {
    lyric = splitLyric(music);
    pageNumber = Object.keys(lyric);
  })

  test('Lyric type is object', () => {
    expect(typeof lyric).toBe('object')
  })
  test('Lyric page is 1', () => {
    expect(Object.keys(lyric)).toHaveLength(1);
  })
  test('Page sentence count is less than 28', () => {
    expect(lyric[pageNumber].length).toBeLessThan(28);
  })
  test('Last sentence of Lyric is not empty ', () => {
    const lastIdx = lyric[pageNumber].length - 1;
    expect(lyric[pageNumber][lastIdx]).not.toBe('');
  })
})