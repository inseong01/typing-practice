import getListPage from "../getListPage";
import top100 from '../../../public/top100.json';
import getMusicList from "../getMusicList";

describe('getListPage test : ', () => {
  const list = getMusicList(top100);
  const page = getListPage(list);

  test('Max page number is 10 ', () => {
    expect(page).toHaveLength(10);
  })
  test('Each page has 10 music lists', () => {
    for (let i = 0; i < page.length; i++) {
      expect(page[i]).toHaveLength(10);
    }
  })
})