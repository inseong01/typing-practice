import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React, { useContext } from 'react';

import classNameCheck from './classNameCheck.test';
import Page, { getServerSideProps } from '@/pages/music/[id]';
import useFetchData from '@/hook/useFetchData';

const initialArg = {
  time: null,
  accuracy: 0,
  typingSpeed: 0,
  cursor: {
    top: 2,
    left: 0,
  },
};
const dataObj = {
  "music": {
    "albumGenres": "락, 댄스",
    "artists": [
      {
        "artistId": 500567,
        "artistName": "로제 (ROSÉ)",
        "imageUrl": "https://musicmeta-phinf.pstatic.net/artist/000/500/500567.jpg?type=r300&v=20241018125903",
        "isGroup": false
      },
      {
        "artistId": 132647,
        "artistName": "Bruno Mars",
        "imageUrl": "https://musicmeta-phinf.pstatic.net/artist/000/132/132647.jpg?type=r300&v=20240513155129",
        "isGroup": false
      }
    ],
    "currentRank": 1,
    "imageUrl": "https://musicmeta-phinf.pstatic.net/album/032/218/32218786.jpg?type=r480Fll&v=20241018150710",
    "isLyric": true,
    "lyric": "I'm on my way \nHold on, hold on\nI'm on my way \nYeah yeah yeah yeah yeah \nI'm on my way \n\nDon't you want me like I want you, baby \nDon't you need me like I need you now \nSleep tomorrow but tonight go crazy \nAll you gotta do is just meet me at the \n\n아파트 아파트 \n아파트 아파트 \n아파트 아파트 \nJust meet me at the \n(Uh huh uh huh)\n \n아파트 아파트 \n아파트 아파트",
    "trackId": 87518567,
    "trackTitle": "APT."
  },
  "artistName": "로제 (ROSÉ), Bruno Mars"
}
const pageSheet = {
  "0": [
    ["I", "'", "m", " ", "o", "n", " ", "m", "y", " ", "w", "a", "y"],
    ["H", "o", "l", "d", " ", "o", "n", ",", " ", "h", "o", "l", "d", " ", "o", "n"],
    ["I", "'", "m", " ", "o", "n", " ", "m", "y", " ", "w", "a", "y"],
    ["Y", "e", "a", "h", " ", "y", "e", "a", "h", " ", "y", "e", "a", "h", " ", "y", "e", "a", "h", " ", "y", "e", "a", "h"],
    ["I", "'", "m", " ", "o", "n", " ", "m", "y", " ", "w", "a", "y"],
    ["\n"],
    ["D", "o", "n", "'", "t", " ", "y", "o", "u", " ", "w", "a", "n", "t", " ", "m", "e", " ", "l", "i", "k", "e", " ", "I", " ", "w", "a", "n", "t", " ", "y", "o", "u", ",", " ", "b", "a", "b", "y"],
    ["D", "o", "n", "'", "t", " ", "y", "o", "u", " ", "n", "e", "e", "d", " ", "m", "e", " ", "l", "i", "k", "e", " ", "I", " ", "n", "e", "e", "d", " ", "y", "o", "u", " ", "n", "o", "w"],
    ["S", "l", "e", "e", "p", " ", "t", "o", "m", "o", "r", "r", "o", "w", " ", "b", "u", "t", " ", "t", "o", "n", "i", "g", "h", "t", " ", "g", "o", " ", "c", "r", "a", "z", "y"],
    ["A", "l", "l", " ", "y", "o", "u", " ", "g", "o", "t", "t", "a", " ", "d", "o", " ", "i", "s", " ", "j", "u", "s", "t", " ", "m", "e", "e", "t", " ", "m", "e", " ", "a", "t", " ", "t", "h", "e"],
    ["\n"],
    ["아", "파", "트", " ", "아", "파", "트"],
    ["아", "파", "트", " ", "아", "파", "트"],
    ["아", "파", "트", " ", "아", "파", "트"],
    ["J", "u", "s", "t", " ", "m", "e", "e", "t", " ", "m", "e", " ", "a", "t", " ", "t", "h", "e"],
    ["\n"],
    ["아", "파", "트", " ", "아", "파", "트"],
    ["아", "파", "트", " ", "아", "파", "트"]
  ]
}
let trackId;
let props;

jest.mock('../resultPage', () => () => <div className='result'>resultPage</div>)
jest.mock('../sentence', () => () => <div className='sentence'>sentence</div>)
jest.mock('../loading', () => () => <div className='Loading'>Loading</div>)
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}))
jest.mock('../../hook/useFetchData');

describe('[id] unit test : ', () => {
  beforeEach(async () => {
    trackId = { query: { id: 83681270 } };
    const data = await getServerSideProps(trackId);
    props = data.props;
    // useFetchData mock
    useFetchData.mockReturnValue({ dataObj: dataObj, pageSheet: pageSheet, loadingPercent: 100 });
    // useContext mock
    useContext.mockReturnValue({ dispatch: jest.fn(), initialArg });
  })

  afterEach(() => {
    jest.resetAllMocks();
  })

  test('First page', () => {
    let page = 0;

    const useStateSpy = jest.spyOn(React, 'useState')
      .mockReturnValueOnce([page, () => null])
      .mockReturnValueOnce([false, () => null])

    // useState 호출 검사
    expect(useStateSpy).toHaveBeenCalledTimes(0);
    render(<Page music={props.music} artistName={props.artistName} pageSheet={props.pageSheet} />)

    // 페이지 숫자 검사
    const pageNumberText = screen.getByText(page + 1, { exact: false }).textContent;
    expect(pageNumberText).toBe(`${page + 1} / ${page + 1}`);

    // useState 호출 검사
    expect(useStateSpy).toHaveBeenCalledTimes(2);
    // 페이지 구성 검사
    expect(screen.queryByText('resultPage')).not.toBeInTheDocument();
    expect(screen.queryByText('sentence')).toBeInTheDocument();
    // CSS 검사
    classNameCheck(['id-main', 'pageNumber', 'title', 'artist', 'page', 'sentence']);
  })

  // test('Second page', () => {
  //   let page = 1

  //   const useStateSpy = jest.spyOn(React, 'useState')
  //     .mockReturnValueOnce([page, () => null])
  //     .mockReturnValueOnce([false, () => null])

  //   // useReducer mock
  //   const { result } = renderHook(() => useReducer(reducer, initialArg));
  //   // const [state, dispatch] = result.current;
  //   // act(() => {dispatch({ type: "RESET" })});
  //   // const [updateState] = result.current;

  //   // useState 호출 검사
  //   expect(useStateSpy).toHaveBeenCalledTimes(0);
  //   render(<Page music={props.music} artistName={props.artistName} pageSheet={props.pageSheet} />)

  //   // 페이지 숫자 검사
  //   const pageNumberText = screen.getByText(page, { exact: false }).textContent;
  //   expect(pageNumberText).toBe(`${page} / ${page}`);

  //   // useState 호출 검사
  //   expect(useStateSpy).toHaveBeenCalledTimes(2);
  //   // 페이지 구성 검사
  //   expect(screen.queryByText('resultPage')).not.toBeInTheDocument();
  //   expect(screen.queryByText('sentence')).toBeInTheDocument();
  //   // CSS 검사
  //   classNameCheck(['id-main', 'pageNumber', 'page', 'sentence']);
  // })

  test('Result page', () => {
    const useStateSpy = jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => [0, () => {
        return null
      }])
      .mockImplementationOnce(() => [true, () => {
        return null
      }])

    // useState 호출 검사
    expect(useStateSpy).toHaveBeenCalledTimes(0);
    render(<Page trackId={props.trackId} music={props.music} artistName={props.artistName} />)

    // useState 호출 검사
    expect(useStateSpy).toHaveBeenCalledTimes(2);
    // 페이지 구성 검사
    expect(screen.queryByText('resultPage')).toBeInTheDocument();
    expect(screen.queryByText('sentence')).not.toBeInTheDocument();
    // CSS 검사
    classNameCheck(['result']);
  })
})