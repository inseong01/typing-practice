import styles from '@/styles/createSwiper.module.css';

import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import dayjs from 'dayjs';

import useFetchData, { readData, updateData } from '@/hook/useFetchData';
import SwiperSlides from './swiperSlides';
import Loading from './loading';
import { firebaseConfig } from '../../firebaseConfig';

// Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Datejs
const nextUpdateTime = dayjs(Date.now())
  .add(1, 'd')
  .set('h', 7)
  .set('m', 0)
  .set('s', 0)
  .set('ms', 0)
  .format('YYYY/MM/DD HH:mm:ss:SSS');

export default function CreateSwiper() {
  const [pageNumber, setPageNumber] = useState(0);
  const [isClick, setIsClick] = useState(false);
  const [type, setType] = useState('LOAD');
  const { loadingPercent, page, setPage } = useFetchData(type, database);

  useEffect(() => {
    // 업데이트 버튼 정보 불러오기
    async function fetchUpdateTimeInfo() {
      const updateTimeInfo = await readData(database, 'updateTime');
      const { click, next } = updateTimeInfo;
      const isable = new Date(next) <= new Date(); // <= 변경
      setIsClick(isable);
    }
    fetchUpdateTimeInfo();
  }, []);

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
  function onClickHandler() {
    if (!isClick) return console.log('disable');
    const updateTime = {
      next: nextUpdateTime,
      click: dayjs(Date.now()).format('YYYY/MM/DD HH:mm:ss:SSS'),
    };
    // DB 시간 업데이트
    updateData(database, 'updateTime/', updateTime);
    // 업데이트 버튼 비활성화
    setIsClick(false);
    // 목차 갱신
    setPage([]);
    setType('UPDATE');
  }

  return page.length === 0 ? (
    <Loading loadingPercent={loadingPercent} type={type} />
  ) : (
    <div className={`${styles.categories}`}>
      <div className={styles['main-title']}>
        목차
        <div className={styles.updateBtn} onClick={onClickHandler}>
          {isClick ? 'Update' : 'disable'}
        </div>
      </div>
      <SwiperSlides item={page[pageNumber]} />

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
