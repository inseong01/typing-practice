import styles from '@/styles/createSwiper.module.css';

import { useEffect, useState } from 'react';

import SwiperSlides from './swiperSlides';
// import top100 from '../../public/top100.json';
import getMusicList, { getLyric } from '@/function/getMusicList';
import getListPage from '@/function/getListPage';

export async function getServerSideProps() {
  console.log('Hi');
}

async function fetchData() {
  const top100 = await getMusicList();
  console.log(top100);
  const list = await getLyric(top100);
  console.log(list);
  const page = getListPage(list);
  return page;
}

const page = fetchData();

export default function CreateSwiper() {
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {}, []);

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
      {/* <SwiperSlides item={page[pageNumber]} /> */}
      <div className={styles['btn-wrap']}>
        <div data-testid="btn_l" className={styles.btn} onClick={onClickPrevPage} title="이전 페이지">
          <img src="./img/prev_btn.png" alt="이전 페이지 아이콘" />
        </div>
        <div data-testid="btn_r" className={styles.btn} onClick={onClickNextPage} title="다음 페이지">
          <img src="./img/next_btn.png" alt="다음 페이지 아이콘" />
        </div>
      </div>
    </div>
  );
}
