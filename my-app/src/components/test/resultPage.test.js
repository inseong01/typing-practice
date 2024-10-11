import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
userEvent.setup()

import ResultPage from '../resultPage';
import { useContext } from 'react';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn()
}))

describe('ResultPage style test : ', () => {
  const setIsFinished = jest.fn()
  const setPageSheetIdx = jest.fn()
  const music = {
    "trackId": 85264265,
    "trackTitle": "Supernova",
    "artists": [
      {
        "artistId": 3980296,
        "artistName": "aespa",
        "isGroup": true,
        "imageUrl": "https://musicmeta-phinf.pstatic.net/artist/003/980/3980296.jpg?type=r300&v=20240524115312"
      }
    ],
    "imageUrl": "https://musicmeta-phinf.pstatic.net/album/031/577/31577945.jpg?type=r480Fll&v=20240828151204",
    "albumGenres": "댄스",
    "currentRank": 2,
    "lyric": "na\nz\na\nz\na\nz"
  }
  const artistName = ["aespa"]

  useContext.mockReturnValue({
    dispatch: jest.fn(),
    state: {
      "time": 2.3,
      "accuracy": 57.1,
      "typingSpeed": 182.6
    }
  })

  beforeEach(() => {
    render(<ResultPage
      setIsFinished={setIsFinished}
      setPageSheetIdx={setPageSheetIdx}
      music={music}
      artistName={artistName}
    />)
  })

  test('className', () => {
    const classNameArr = ['id-main res', 'title', 'artist', 'results', 'nav', 'pageNumber', 'page'];

    const tags = []
    tags.push(screen.getAllByRole('generic'))
    tags.push(screen.getAllByRole('heading'))
    tags.push(screen.getAllByRole('paragraph'))
    tags.push(screen.getAllByRole('list'))
    tags.push(screen.getAllByRole('listitem'))
    const allTag = tags.flat()
    const classNameCount = {}
    for (let i = 0; i < allTag.length; i++) {
      if (!allTag[i].className) continue;
      classNameCount[allTag[i].className] = ++classNameCount[allTag[i].className] || 1;
    }

    for (let i = 0; i < classNameArr.length; i++) {
      const selectedTagArr = document.querySelectorAll(`.${classNameArr[i].replace(' ', '.')}`);
      const selectedTag = document.querySelector(`.${classNameArr[i].replace(' ', '.')}`);
      // className 존재 확인
      expect(classNameCount[classNameArr[i]]).not.toBe(0)
      // className 개수 확인 (중복확인)
      expect(classNameCount[classNameArr[i]]).toBe(selectedTagArr.length)
      // tag, DOM에서 보임 확인
      expect(selectedTag).toBeVisible()
    }
  })

  test('results text', () => {
    const state = {
      "time": 2.3,
      "accuracy": 57.1,
      "typingSpeed": 182.6
    }
    for (let i = 0; i < Object.keys(state).length; i++) {
      switch (Object.keys(state)[i]) {
        case 'time': {
          expect(screen.getByText(state[Object.keys(state)[i]], { exact: false }).textContent).toBe(`소요 시간: ${state.time}초`)
          break;
        }
        case 'accuracy': {
          expect(screen.getByText(state[Object.keys(state)[i]], { exact: false }).textContent).toBe(`정확도: ${state.accuracy}%`)
          break;
        }
        case 'typingSpeed': {
          expect(screen.getByText(state[Object.keys(state)[i]], { exact: false }).textContent).toBe(`타수: ${state.typingSpeed}`)
          break;
        }
        default: {
          console.error('Nothing is matched')
        }
      }
      expect(screen.getByText(state[Object.keys(state)[i]], { exact: false })).toBeVisible()
    }
  })
})

describe('ResultPage function test : ', () => {
  test('onClick left', async () => {
    const reset = jest.fn();
    render(<li data-testid="left" onClick={reset} title="try again">
      다시하기
    </li>)

    const tag = screen.getByTestId('left');
    expect(tag).toBeVisible();
    expect(tag.textContent).not.toBe('');
    expect(tag).toHaveAttribute('title', 'try again');
    expect(reset).toHaveBeenCalledTimes(0);
    await userEvent.click(tag);
    expect(reset).toHaveBeenCalledTimes(1);
  })

  test('onClick right', async () => {
    const back = jest.fn();
    render(<li data-testid="right" onClick={back} title="go back">
      돌아가기
    </li>)

    const tag = screen.getByTestId('right');
    expect(tag).toBeVisible();
    expect(tag.textContent).not.toBe('');
    expect(tag).toHaveAttribute('title', 'go back');
    expect(back).toHaveBeenCalledTimes(0);
    await userEvent.click(tag);
    expect(back).toHaveBeenCalledTimes(1);
  })
})