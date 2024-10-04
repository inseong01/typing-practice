export default function getListPage(list) {
  const page = [];

  let listWrap = [];
  for (let i = 0; i <= list.length; i++) {
    if (listWrap.length >= 10) {
      page.push(listWrap);
      listWrap = [];
    }
    listWrap.push(list[i]);
  }

  return page;
}