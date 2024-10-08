import styles from '@/styles/CreateSwiper.module.css';

import { useState } from 'react';

import ContentsList from './ContentsList';
import top100 from '../../public/top100.json';
import getMusicList from '@/function/getMusicList';
import getListPage from '@/function/getListPage';

const list = getMusicList(top100);
const page = getListPage(list);

export default function CreateSwiper() {
  const [pageNumber, setPageNumber] = useState(0);

  function onClickNextPage() {
    if (pageNumber < page.length - 1) {
      setPageNumber((num) => num + 1);
    }
  }
  function onClickPrevPage() {
    if (pageNumber > 0) {
      setPageNumber((num) => num - 1);
    }
  }

  return (
    <div className={`${styles.categories}`}>
      <div className={styles['main-title']}>목차</div>
      <ContentsList item={page[pageNumber]} />
      <div className={styles['btn-wrap']}>
        <div className={styles.btn} onClick={onClickPrevPage}>
          <img src="./img/prev_btn.png" alt="이전 페이지" />
        </div>
        <div className={styles.btn} onClick={onClickNextPage}>
          <img src="./img/next_btn.png" alt="다음 페이지" />
        </div>
      </div>
    </div>
  );
}
