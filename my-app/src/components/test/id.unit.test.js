import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import classNameCheck from './classNameCheck.test';

import Page, { getServerSideProps } from '@/pages/music/[id]';
import React from 'react';

const testObj = {
  compName: '[id]',
  argument: {
    item: [
      {
        "trackId": 83681270,
        "trackTitle": "HAPPY",
        "artists": [
          {
            "artistId": 455339,
            "artistName": "DAY6(데이식스)",
            "isGroup": true,
            "imageUrl": "https://musicmeta-phinf.pstatic.net/artist/000/455/455339.jpg?type=r300&v=20240902182711"
          }
        ],
        "imageUrl": "https://musicmeta-phinf.pstatic.net/album/031/043/31043036.jpg?type=r480Fll&v=20240402145726",
        "albumGenres": "락",
        "currentRank": 1,
        "lyric": "그런 날이 있을까요? \n마냥 좋은 그런 날이요\n내일 걱정 하나 없이 \n웃게 되는 그런 날이요\n\n뭔가 하나씩은 \n걸리는 게 생기죠\n과연 행복할 수 있을까요 \n\n그런 날이 있을까요? \n꿈을 찾게 되는 날이요 \n너무 기뻐 하늘 보고\n소리를 지르는 날이요\n\n뭐 이대로 계속해서  \n버티고 있으면 언젠가\n그런 날이 올까요  \n\nMay I be happy? \n매일 웃고 싶어요\n걱정 없고 싶어요\n아무나 좀 답을 알려주세요\n\nSo help me\n주저앉고 있어요\n눈물 날 것 같아요\n그러니까 제발 제발 제발요\nTell me it's okay to be happy\n\n알고리즘엔 잘된 사람만 \n수도 없이 뜨네요 \n\n뭐 이대로 계속해서 \n살아만 있으면 언젠가\n저런 날이 올까요  \n\nMay I be happy? \n매일 웃고 싶어요\n걱정 없고 싶어요\n아무나 좀 답을 알려주세요\n\nSo help me\n주저앉고 있어요\n눈물 날 것 같아요\n그러니까 \nTell me it's okay to be happy\n\n그냥 쉽게 쉽게 살고 싶은데\n내 하루하루는 왜 이리\n놀라울 정도로 어려운 건데\n\nMay I be happy? \n매일 웃고 싶어요\n걱정 없고 싶어요\n아무나 좀 답을 알려주세요\n\nSo help me\n주저앉고 있어요\n눈물 날 것 같아요\n그러니까 제발 제발 제발요\nTell me it's okay to be happy\n\n",
        "isLyric": true
      },
      {
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
        "lyric": "aaa\n aa aa\n\n aa\n a a\n \n\n\n\n\n\n\n\n\n\n\n\n\n aaa\n\n\n\n\n aa\na\n \n\n\n\n\n\n\n\n\n\n\n\n\n aaa\n\n\n\n\n aa\na\n \n\n\n\n\n\n\n\n\n\n\n\n\n aaa\n\n\n\n\n aa\na\n \n\n\n\n\n\n\n\n\n\n\n\n\n aaa\n\n\n\n\n aa\n",
        "isLyric": true
      },
      {
        "trackId": 27852478,
        "trackTitle": "한 페이지가 될 수 있게",
        "artists": [
          {
            "artistId": 455339,
            "artistName": "DAY6(데이식스)",
            "isGroup": true,
            "imageUrl": "https://musicmeta-phinf.pstatic.net/artist/000/455/455339.jpg?type=r300&v=20240902182711"
          }
        ],
        "imageUrl": "https://musicmeta-phinf.pstatic.net/album/003/117/3117381.jpg?type=r480Fll&v=20230331153414",
        "albumGenres": "락",
        "currentRank": 3,
        "lyric": "",
        "isLyric": false
      },
      {
        "trackId": 83681269,
        "trackTitle": "Welcome to the Show",
        "artists": [
          {
            "artistId": 455339,
            "artistName": "DAY6(데이식스)",
            "isGroup": true,
            "imageUrl": "https://musicmeta-phinf.pstatic.net/artist/000/455/455339.jpg?type=r300&v=20240902182711"
          }
        ],
        "imageUrl": "https://musicmeta-phinf.pstatic.net/album/031/043/31043036.jpg?type=r480Fll&v=20240402145726",
        "albumGenres": "락",
        "currentRank": 4,
        "lyric": "",
        "isLyric": false
      },
      {
        "trackId": 84176520,
        "trackTitle": "고민중독",
        "artists": [
          {
            "artistId": 8055137,
            "artistName": "QWER",
            "isGroup": true,
            "imageUrl": "https://musicmeta-phinf.pstatic.net/artist/008/055/8055137.jpg?type=r300&v=20240923175900"
          }
        ],
        "imageUrl": "https://musicmeta-phinf.pstatic.net/album/031/194/31194405.jpg?type=r480Fll&v=20240507111203",
        "albumGenres": "락",
        "currentRank": 5,
        "lyric": "",
        "isLyric": false
      },
      {
        "trackId": 87188016,
        "trackTitle": "내 이름 맑음",
        "artists": [
          {
            "artistId": 8055137,
            "artistName": "QWER",
            "isGroup": true,
            "imageUrl": "https://musicmeta-phinf.pstatic.net/artist/008/055/8055137.jpg?type=r300&v=20240923175900"
          }
        ],
        "imageUrl": "https://musicmeta-phinf.pstatic.net/album/032/057/32057155.jpg?type=r480Fll&v=20240923180256",
        "albumGenres": "락",
        "currentRank": 6,
        "lyric": "",
        "isLyric": false
      },
    ]
  },
  classNameArr: ['id-main', 'pageNumber', 'title', 'artist', 'page'],
};

jest.mock('../resultPage', () => () => <div>resultPage</div>)
jest.mock('../sentence', () => () => <div>sentence</div>)

let trackId;
let props;

describe('[id] DOM check test : ', () => {
  beforeAll(async () => {
    trackId = { query: { id: 83681270 } };
    const data = await getServerSideProps(trackId)
    props = data.props;
  })

  afterEach(() => {
    jest.resetAllMocks()
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
    expect(pageNumberText).toBe(`${page + 1} / 2`);

    // useState 호출 검사
    expect(useStateSpy).toHaveBeenCalledTimes(2);
    // 페이지 구성 검사
    expect(screen.queryByText('resultPage')).not.toBeInTheDocument();
    expect(screen.queryByText('sentence')).toBeInTheDocument();
  })

  // CSS 검사
  classNameCheck(testObj);

  test('Second page', () => {
    let page = 1

    const useStateSpy = jest.spyOn(React, 'useState')
      .mockReturnValueOnce([page, () => null])
      .mockReturnValueOnce([false, () => null])

    // useState 호출 검사
    expect(useStateSpy).toHaveBeenCalledTimes(0);
    render(<Page music={props.music} artistName={props.artistName} pageSheet={props.pageSheet} />)

    // 페이지 숫자 검사
    const pageNumberText = screen.getByText(page + 1, { exact: false }).textContent;
    expect(pageNumberText).toBe(`${page + 1} / 2`);

    // useState 호출 검사
    expect(useStateSpy).toHaveBeenCalledTimes(2);
    // 페이지 구성 검사
    expect(screen.queryByText('resultPage')).not.toBeInTheDocument();
    expect(screen.queryByText('sentence')).toBeInTheDocument();
  })

  // CSS 검사
  testObj['classNameArr'] = ['id-main', 'pageNumber', 'page'];
  classNameCheck(testObj);

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

    // CSS 검사
    describe('', () => {
      classNameCheck(testObj);
    })

    // useState 호출 검사
    expect(useStateSpy).toHaveBeenCalledTimes(2);
    // 페이지 구성 검사
    expect(screen.queryByText('resultPage')).toBeInTheDocument();
    expect(screen.queryByText('sentence')).not.toBeInTheDocument();
  })

  // CSS 검사
  testObj['classNameArr'] = [];
  classNameCheck(testObj);
})