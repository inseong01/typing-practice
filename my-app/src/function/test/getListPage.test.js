import getListPage from "../getListPage";
import getMusicList from "../getMusicList";
import top100 from '../../../public/top100.json';

global.fetch = jest.fn().mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(top100) }));

describe('getListPage test : ', () => {
  let list;
  let page;

  beforeAll(async () => {
    list = await getMusicList();
    page = await getListPage(list);
  })

  test('Music page max number is 10 ', () => {
    expect(Object.keys(page)).toHaveLength(10);
  })
  test('Each page has 10 music lists', () => {
    for (let i = 0; i < page.length; i++) {
      expect(page[i]).toHaveLength(10);
    }
  })
})