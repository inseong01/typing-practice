import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import styles from '@/styles/sentence.module.css';
import Sentence from '../sentence';

import userEvent from '@testing-library/user-event';
import { useContext } from 'react';
userEvent.setup()

const pageSheet = {
  "0": [
    [
      "그",
      "런",
      " ",
      "날",
      "이",
      " ",
      "있",
      "을",
      "까",
      "요",
      "?"
    ],
    [
      "마",
      "냥",
      " ",
      "좋",
      "은",
      " ",
      "그",
      "런",
      " ",
      "날",
      "이",
      "요"
    ],
    [
      "내",
      "일",
      " ",
      "걱",
      "정",
      " ",
      "하",
      "나",
      " ",
      "없",
      "이"
    ],
    [
      "웃",
      "게",
      " ",
      "되",
      "는",
      " ",
      "그",
      "런",
      " ",
      "날",
      "이",
      "요"
    ],
    [
      "\n"
    ],
    [
      "뭔",
      "가",
      " ",
      "하",
      "나",
      "씩",
      "은"
    ],
    [
      "걸",
      "리",
      "는",
      " ",
      "게",
      " ",
      "생",
      "기",
      "죠"
    ],
    [
      "과",
      "연",
      " ",
      "행",
      "복",
      "할",
      " ",
      "수",
      " ",
      "있",
      "을",
      "까",
      "요"
    ],
    [
      "\n"
    ],
    [
      "그",
      "런",
      " ",
      "날",
      "이",
      " ",
      "있",
      "을",
      "까",
      "요",
      "?"
    ],
    [
      "꿈",
      "을",
      " ",
      "찾",
      "게",
      " ",
      "되",
      "는",
      " ",
      "날",
      "이",
      "요"
    ],
    [
      "너",
      "무",
      " ",
      "기",
      "뻐",
      " ",
      "하",
      "늘",
      " ",
      "보",
      "고"
    ],
    [
      "소",
      "리",
      "를",
      " ",
      "지",
      "르",
      "는",
      " ",
      "날",
      "이",
      "요"
    ],
    [
      "\n"
    ],
    [
      "뭐",
      " ",
      "이",
      "대",
      "로",
      " ",
      "계",
      "속",
      "해",
      "서"
    ],
    [
      "버",
      "티",
      "고",
      " ",
      "있",
      "으",
      "면",
      " ",
      "언",
      "젠",
      "가"
    ],
    [
      "그",
      "런",
      " ",
      "날",
      "이",
      " ",
      "올",
      "까",
      "요"
    ],
    [
      "\n"
    ],
    [
      "M",
      "a",
      "y",
      " ",
      "I",
      " ",
      "b",
      "e",
      " ",
      "h",
      "a",
      "p",
      "p",
      "y",
      "?"
    ],
    [
      "매",
      "일",
      " ",
      "웃",
      "고",
      " ",
      "싶",
      "어",
      "요"
    ],
    [
      "걱",
      "정",
      " ",
      "없",
      "고",
      " ",
      "싶",
      "어",
      "요"
    ],
    [
      "아",
      "무",
      "나",
      " ",
      "좀",
      " ",
      "답",
      "을",
      " ",
      "알",
      "려",
      "주",
      "세",
      "요"
    ],
    [
      "\n"
    ],
    [
      "S",
      "o",
      " ",
      "h",
      "e",
      "l",
      "p",
      " ",
      "m",
      "e"
    ],
    [
      "주",
      "저",
      "앉",
      "고",
      " ",
      "있",
      "어",
      "요"
    ],
    [
      "눈",
      "물",
      " ",
      "날",
      " ",
      "것",
      " ",
      "같",
      "아",
      "요"
    ],
    [
      "그",
      "러",
      "니",
      "까",
      " ",
      "제",
      "발",
      " ",
      "제",
      "발",
      " ",
      "제",
      "발",
      "요"
    ],
    [
      "T",
      "e",
      "l",
      "l",
      " ",
      "m",
      "e",
      " ",
      "i",
      "t",
      "'",
      "s",
      " ",
      "o",
      "k",
      "a",
      "y",
      " ",
      "t",
      "o",
      " ",
      "b",
      "e",
      " ",
      "h",
      "a",
      "p",
      "p",
      "y"
    ],
    [
      "\n"
    ]
  ],
  "1": [
    [
      "알",
      "고",
      "리",
      "즘",
      "엔",
      " ",
      "잘",
      "된",
      " ",
      "사",
      "람",
      "만"
    ],
    [
      "수",
      "도",
      " ",
      "없",
      "이",
      " ",
      "뜨",
      "네",
      "요"
    ],
    [
      "\n"
    ],
    [
      "뭐",
      " ",
      "이",
      "대",
      "로",
      " ",
      "계",
      "속",
      "해",
      "서"
    ],
    [
      "살",
      "아",
      "만",
      " ",
      "있",
      "으",
      "면",
      " ",
      "언",
      "젠",
      "가"
    ],
    [
      "저",
      "런",
      " ",
      "날",
      "이",
      " ",
      "올",
      "까",
      "요"
    ],
    [
      "\n"
    ],
    [
      "M",
      "a",
      "y",
      " ",
      "I",
      " ",
      "b",
      "e",
      " ",
      "h",
      "a",
      "p",
      "p",
      "y",
      "?"
    ],
    [
      "매",
      "일",
      " ",
      "웃",
      "고",
      " ",
      "싶",
      "어",
      "요"
    ],
    [
      "걱",
      "정",
      " ",
      "없",
      "고",
      " ",
      "싶",
      "어",
      "요"
    ],
    [
      "아",
      "무",
      "나",
      " ",
      "좀",
      " ",
      "답",
      "을",
      " ",
      "알",
      "려",
      "주",
      "세",
      "요"
    ],
    [
      "\n"
    ],
    [
      "S",
      "o",
      " ",
      "h",
      "e",
      "l",
      "p",
      " ",
      "m",
      "e"
    ],
    [
      "주",
      "저",
      "앉",
      "고",
      " ",
      "있",
      "어",
      "요"
    ],
    [
      "눈",
      "물",
      " ",
      "날",
      " ",
      "것",
      " ",
      "같",
      "아",
      "요"
    ],
    [
      "그",
      "러",
      "니",
      "까"
    ],
    [
      "T",
      "e",
      "l",
      "l",
      " ",
      "m",
      "e",
      " ",
      "i",
      "t",
      "'",
      "s",
      " ",
      "o",
      "k",
      "a",
      "y",
      " ",
      "t",
      "o",
      " ",
      "b",
      "e",
      " ",
      "h",
      "a",
      "p",
      "p",
      "y"
    ],
    [
      "\n"
    ],
    [
      "그",
      "냥",
      " ",
      "쉽",
      "게",
      " ",
      "쉽",
      "게",
      " ",
      "살",
      "고",
      " ",
      "싶",
      "은",
      "데"
    ],
    [
      "내",
      " ",
      "하",
      "루",
      "하",
      "루",
      "는",
      " ",
      "왜",
      " ",
      "이",
      "리"
    ],
    [
      "놀",
      "라",
      "울",
      " ",
      "정",
      "도",
      "로",
      " ",
      "어",
      "려",
      "운",
      " ",
      "건",
      "데"
    ],
    [
      "\n"
    ],
    [
      "M",
      "a",
      "y",
      " ",
      "I",
      " ",
      "b",
      "e",
      " ",
      "h",
      "a",
      "p",
      "p",
      "y",
      "?"
    ],
    [
      "매",
      "일",
      " ",
      "웃",
      "고",
      " ",
      "싶",
      "어",
      "요"
    ],
    [
      "걱",
      "정",
      " ",
      "없",
      "고",
      " ",
      "싶",
      "어",
      "요"
    ],
    [
      "아",
      "무",
      "나",
      " ",
      "좀",
      " ",
      "답",
      "을",
      " ",
      "알",
      "려",
      "주",
      "세",
      "요"
    ],
    [
      "\n"
    ],
    [
      "S",
      "o",
      " ",
      "h",
      "e",
      "l",
      "p",
      " ",
      "m",
      "e"
    ],
    [
      "주",
      "저",
      "앉",
      "고",
      " ",
      "있",
      "어",
      "요"
    ],
    [
      "눈",
      "물",
      " ",
      "날",
      " ",
      "것",
      " ",
      "같",
      "아",
      "요"
    ],
    [
      "그",
      "러",
      "니",
      "까",
      " ",
      "제",
      "발",
      " ",
      "제",
      "발",
      " ",
      "제",
      "발",
      "요"
    ],
    [
      "T",
      "e",
      "l",
      "l",
      " ",
      "m",
      "e",
      " ",
      "i",
      "t",
      "'",
      "s",
      " ",
      "o",
      "k",
      "a",
      "y",
      " ",
      "t",
      "o",
      " ",
      "b",
      "e",
      " ",
      "h",
      "a",
      "p",
      "p",
      "y"
    ],
    [
      "\n"
    ],
    [
      "\n"
    ]
  ]
}
const onClickfn = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn()
}))
jest.mock('../lyric_li', () => ({ ly }) => {
  return <li data-testid="li">{ly.join('')}</li>
})
jest.mock('../textInput', () => () => <input autoFocus data-testid="textInput" id="textInput" onClick={onClickfn} />)

describe('Sentence styles test : ', () => {
  const pageSheetIdx = 0;
  const setIsFinished = jest.fn();
  const onEnterNextPage = jest.fn();

  useContext.mockReturnValue({
    dispatch: jest.fn(),
    state: {
      time: '',
      accuracy: 0,
      typingSpeed: 0,
    }
  })

  beforeEach(() => {
    render(<Sentence pageSheet={pageSheet} pageSheetIdx={pageSheetIdx} setIsFinished={setIsFinished} onEnterNextPage={onEnterNextPage} />)
  })

  test('ul', () => {
    // ul
    expect(screen.getByTestId('lyric')).toHaveClass(styles.lyric);
  })
  test('li', () => {
    // li
    expect(screen.getAllByTestId('li')).toHaveLength(pageSheet[pageSheetIdx].length);
  })
  test('label', () => {
    // label
    expect(screen.getByTestId('label')).toHaveClass(styles.labelTextInput);
    expect(screen.getByTestId('label')).toHaveAttribute('for', 'textInput'); // htmlFor > for
  })
  test('input', () => {
    // input
    expect(screen.getByTestId('textInput')).toHaveAttribute('id', 'textInput');
    expect(screen.getByTestId('textInput')).toHaveFocus();
  })
  test('label click', async () => {
    // label click
    expect(onClickfn).toHaveBeenCalledTimes(0);
    await userEvent.click(screen.getByTestId('label'));
    expect(onClickfn).toHaveBeenCalledTimes(1);
  })
})

describe('Sentence function test : ', () => {
  const pageSheetIdx = jest.fn().mockReturnValueOnce(0).mockReturnValueOnce(1);
  const setIsFinished = jest.fn();
  const onEnterNextPage = jest.fn();
  let rerenderComponent;

  useContext.mockReturnValue({
    dispatch: jest.fn(),
    state: {
      time: '',
      accuracy: 0,
      typingSpeed: 0,
    }
  })

  beforeEach(() => {
    const { rerender } = render(<Sentence pageSheet={pageSheet} pageSheetIdx={pageSheetIdx()} setIsFinished={setIsFinished} onEnterNextPage={onEnterNextPage} />)

    rerenderComponent = (idx) => rerender(<Sentence pageSheet={pageSheet} pageSheetIdx={idx} setIsFinished={setIsFinished} onEnterNextPage={onEnterNextPage} />)
  })

  test('Each pages have different tag amounts', () => {
    let li_tags = screen.getAllByTestId('li')
    for (let i = 0; i < 29; i++) {
      expect(li_tags[i].textContent).toBe(pageSheet[0][i].join(''));
    }
    expect(li_tags).toHaveLength(pageSheet[0].length);

    // 다음 페이지 li 태그 수
    rerenderComponent(pageSheetIdx());
    li_tags = screen.getAllByTestId('li')

    for (let i = 0; i < 34; i++) {
      expect(li_tags[i].textContent).toBe(pageSheet[1][i].join(''));
    }
    expect(li_tags).toHaveLength(pageSheet[1].length);
  })
})