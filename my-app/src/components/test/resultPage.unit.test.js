import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext } from 'react';

import classNameCheck from './classNameCheck.test';
import ResultPage from '../resultPage';
userEvent.setup()

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
};
const artistName = ["aespa"];

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn()
}))

describe('ResultPage unit test : ', () => {
  describe('Styles', () => {
    useContext.mockReturnValue({
      dispatch: jest.fn(),
      state: {
        time: 2.3,
        accuracy: 57.1,
        typingSpeed: 182.6,
        cursor: {
          top: 2,
          left: 0,
        },
      }
    })

    beforeEach(() => {
      const setIsFinished = jest.fn()
      const setPageSheetIdx = jest.fn()

      render(<ResultPage
        setIsFinished={setIsFinished}
        setPageSheetIdx={setPageSheetIdx}
        music={music}
        artistName={artistName}
      />)
    })

    afterAll(() => {
      jest.resetModules();
    })

    test('className check', () => {
      const classNameArr = ['id-main', 'title', 'artist', 'results', 'nav', 'pageNumber', 'page'];
      classNameCheck(classNameArr);
    })

    test('Results text is correct', () => {
      const state = {
        "time": 2.3,
        "accuracy": 57.1,
        "typingSpeed": 182.6
      }

      for (let i = 0; i < Object.keys(state).length; i++) {
        switch (Object.keys(state)[i]) {
          case 'time': {
            const minute = parseInt(state.time / 60) === 0 ? undefined : parseInt(state.time / 60);
            const second = parseInt(state.time % 60) === 0 ? 0 : parseInt(state.time % 60);
            expect(screen.getByText(`${second}초`, { exact: false }).textContent).toBe(`- 소요 시간: ${second}초`)
            expect(screen.getByText(`${second}초`, { exact: false })).toBeVisible()
            break;
          }
          case 'accuracy': {
            expect(screen.getByText(state[Object.keys(state)[i]], { exact: false }).textContent).toBe(`- 정확도: ${state.accuracy}%`)
            expect(screen.getByText(state[Object.keys(state)[i]], { exact: false })).toBeVisible()
            break;
          }
          case 'typingSpeed': {
            expect(screen.getByText(state[Object.keys(state)[i]], { exact: false }).textContent).toBe(`- 타수: ${state.typingSpeed}`)
            expect(screen.getByText(state[Object.keys(state)[i]], { exact: false })).toBeVisible()
            break;
          }
          default: {
            console.error('Nothing is matched')
          }
        }
      }
    })
  })

  describe('Functions', () => {
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
})