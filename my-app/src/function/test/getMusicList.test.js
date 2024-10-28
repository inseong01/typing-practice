import top100 from '../../../public/top100.json';
import getMusicList from '../getMusicList';

global.fetch = jest.fn().mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(top100) }));

describe('getMusicList test : ', () => {
  let list;

  beforeEach(async () => {
    list = await getMusicList();
  })

  test('List has 100 musics', () => {
    expect(list).toHaveLength(100);
  })

  test('Each list has object keys', () => {
    const keys = ['trackId', 'trackTitle', 'artists', 'lyric', 'albumGenres', 'imageUrl', 'currentRank', 'isLyric']

    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < keys.length; j++) {
        expect(list[i]).toHaveProperty(keys[j]);
      }
    }
  })
})