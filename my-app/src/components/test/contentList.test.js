import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
userEvent.setup()

import ContentsList from '../contentsList';
import styles from '@/styles/ContentsList.module.css';

const item = [
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
    "lyric": ""
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
    "lyric": ""
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
    "lyric": ""
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
    "lyric": ""
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
    "lyric": ""
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
    "lyric": ""
  },
  {
    "trackId": 86409032,
    "trackTitle": "클락션 (Klaxon)",
    "artists": [
      {
        "artistId": 2388740,
        "artistName": "(여자)아이들",
        "isGroup": true,
        "imageUrl": "https://musicmeta-phinf.pstatic.net/artist/002/388/2388740.jpg?type=r300&v=20240703111058"
      }
    ],
    "imageUrl": "https://musicmeta-phinf.pstatic.net/album/031/905/31905390.jpg?type=r480Fll&v=20240819114652",
    "albumGenres": "댄스, 일렉트로니카",
    "currentRank": 7,
    "lyric": ""
  },
  {
    "trackId": 85487533,
    "trackTitle": "How Sweet",
    "artists": [
      {
        "artistId": 5615371,
        "artistName": "NewJeans",
        "isGroup": true,
        "imageUrl": "https://musicmeta-phinf.pstatic.net/artist/005/615/5615371.jpg?type=r300&v=20240621125901"
      }
    ],
    "imageUrl": "https://musicmeta-phinf.pstatic.net/album/031/512/31512201.jpg?type=r480Fll&v=20240524110922",
    "albumGenres": "댄스",
    "currentRank": 8,
    "lyric": ""
  },
  {
    "trackId": 82760023,
    "trackTitle": "나는 아픈 건 딱 질색이니까",
    "artists": [
      {
        "artistId": 2388740,
        "artistName": "(여자)아이들",
        "isGroup": true,
        "imageUrl": "https://musicmeta-phinf.pstatic.net/artist/002/388/2388740.jpg?type=r300&v=20240703111058"
      }
    ],
    "imageUrl": "https://musicmeta-phinf.pstatic.net/album/030/792/30792280.jpg?type=r480Fll&v=20240219144550",
    "albumGenres": "댄스",
    "currentRank": 9,
    "lyric": ""
  },
  {
    "trackId": 86200702,
    "trackTitle": "Small girl (feat. 도경수(D.O.))",
    "artists": [
      {
        "artistId": 2826154,
        "artistName": "이영지",
        "isGroup": false,
        "imageUrl": "https://musicmeta-phinf.pstatic.net/artist/002/826/2826154.jpg?type=r300&v=20240621175901"
      }
    ],
    "imageUrl": "https://musicmeta-phinf.pstatic.net/album/031/862/31862729.jpg?type=r480Fll&v=20240708103841",
    "albumGenres": "랩/힙합",
    "currentRank": 10,
    "lyric": ""
  }
];

describe('contentList test : ', () => {
  beforeEach(() => {
    render(<ContentsList item={item} />)
  })

  test('The counts of List tag has classNames are equal to the item length', () => {
    const tag_names = ["list", "number", "content-box", "title", "descript"]
    expect(screen.getByTestId("list-arr")).toHaveClass(styles["list-arr"]);
    expect(screen.getByTestId("list-arr")).toBeInTheDocument();

    const tags = {}
    for (let i = 0; i < tag_names.length; i++) {
      tags[tag_names[i]] = screen.getAllByTestId(tag_names[i]);
      expect(tags[tag_names[i]]).toHaveLength(item.length);
    }
  })

  test('TextContent is equal to the item value', () => {
    for (let i = 0; i < item.length; i++) {
      const { currentRank, artists, trackTitle } = item[i];
      const artistsName = artists.map((value) => value.artistName);

      switch (item[i]) {
        case currentRank: {
          expect(screen.getByTestId('number').textContent).toBe(currentRank)
          expect(screen.getByTestId('number').textContent).not.toBe('')
          break;
        }
        case trackTitle: {
          expect(screen.getByTestId('title').textContent).toBe(trackTitle)
          expect(screen.getByTestId('title').textContent).not.toBe('')
          break;
        }
        case artists: {
          expect(screen.getByTestId('descript').textContent).toBe(artistsName)
          expect(screen.getByTestId('descript').textContent).not.toBe('')
          break;
        }
      }
    }
  })

  test('Each Link tags have a unique href', async () => {
    const link_tags = screen.getAllByTestId('link');
    // correct
    for (let i = 0; i < item.length; i++) {
      expect(link_tags[i]).toHaveRole('link');
      expect(link_tags[i]).toHaveAttribute('href', `/music/${item[i].trackId}`);
    }
    // wrong
    for (let i = 0; i < item.length; i++) {
      expect(link_tags[i]).not.toHaveRole('generic');
      expect(link_tags[i]).not.toHaveAttribute('href', `/music/${item[i].trackId - 1}`);
    }
  })
})