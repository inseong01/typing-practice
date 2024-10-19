import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import classNameCheck from './classNameCheck.test';
import SwiperSlides from '../swiperSlides';

const testObj = {
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
};

describe('SwiperSlides unit test : ', () => {
  const { item } = testObj.argument;

  beforeEach(() => {
    render(<SwiperSlides item={item} />)
  })

  test('className check', () => {
    classNameCheck(['list-arr', 'list', 'number', 'content-box', 'title', 'descript']);
  })

  test('TextContent is equal to the item value', () => {
    for (let i = 0; i < item.length; i++) {
      const { currentRank, artists, trackTitle } = item[i];
      const artistsName = artists.map((value) => value.artistName);

      switch (item[i]) {
        case currentRank: {
          expect(screen.getByText('number').textContent).toBe(currentRank);
          expect(screen.getByText('number').textContent).not.toBe('');
          break;
        }
        case trackTitle: {
          expect(screen.getByText('title').textContent).toBe(trackTitle);
          expect(screen.getByText('title').textContent).not.toBe('');
          break;
        }
        case artists: {
          expect(screen.getByText('descript').textContent).toBe(artistsName);
          expect(screen.getByText('descript').textContent).not.toBe('');
          break;
        }
      }
    }
  })

  test('Each Link tags have a unique href', () => {
    const link_tags = screen.getAllByTestId('link');
    // correct case
    for (let i = 0; i < item.length; i++) {
      expect(link_tags[i]).toHaveRole('link');
      expect(link_tags[i]).toHaveAttribute('href', `/music/${item[i].trackId}`);
    }
    // wrong case
    for (let i = 0; i < item.length; i++) {
      expect(link_tags[i]).not.toHaveRole('generic');
      expect(link_tags[i]).not.toHaveAttribute('href', `/music/${item[i].trackId - 1}`);
    }
  })
})
