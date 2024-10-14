export default function getListPage(list) {
  const page = [];

  let pageListWrap = [];
  for (let i = 0; i <= list.length; i++) {
    if (pageListWrap.length >= 10) {
      page.push(pageListWrap);
      pageListWrap = [];
    }
    pageListWrap.push(list[i]);
  }

  return page;
}