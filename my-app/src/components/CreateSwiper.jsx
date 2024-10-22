import styles from '@/styles/createSwiper.module.css';

import { Suspense, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { child, get, getDatabase, ref, set } from 'firebase/database';

import getMusicList, { getLyric } from '@/function/getMusicList';
import getListPage from '@/function/getListPage';
import useFetchData from '@/hook/useFetchData';
import SwiperSlides from './swiperSlides';
import musicList from '../../public/musicList.json';
import Loading from './loading';
import { firebaseConfig } from '../../firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// writeData();

export default function CreateSwiper() {
  const [pageNumber, setPageNumber] = useState(0);
  const [isClick, setIsClick] = useState(false);
  const { loadingPercent, page, setPage } = !isClick
    ? useFetchData('LOAD', database)
    : useFetchData('UPDATE', database);

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

  return page.length === 0 ? (
    <Loading loadingPercent={loadingPercent} text="파일 불러오는 중.." />
  ) : (
    <div className={`${styles.categories}`}>
      <div className={styles['main-title']}>목차</div>
      <SwiperSlides item={page[pageNumber]} />
      <div
        onClick={() => {
          setPage([]);
          setIsClick(true);
        }}
      >
        click me
      </div>
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
