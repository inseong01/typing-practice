import styles from '@/styles/createSwiper.module.css';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import useFetchData, { readData, updateData } from '@/hook/useFetchData';
import SwiperSlides from './swiperSlides';
import Loading from './loading';

// Datejs
const nextUpdateTime = dayjs(Date.now())
  .add(1, 'd')
  .set('h', 7)
  .set('m', 0)
  .set('s', 0)
  .set('ms', 0)
  .format('YYYY/MM/DD HH:mm:ss:SSS');
let restTimeToUpdateHour = dayjs(nextUpdateTime).diff(new Date(), 'h') + 1;

export default function CreateSwiper() {
  const [type, setType] = useState('LOAD');
  const [pageNumber, setPageNumber] = useState(0);
  const [isClickAble, setIsClickAlble] = useState(false);
  const { loadingPercent, page, setPage } = useFetchData(type);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // 업데이트 버튼 정보 불러오기
    async function fetchUpdateTimeInfo() {
      const updateTimeInfo = await readData('updateTime');
      const { click, next } = updateTimeInfo;
      const isable = new Date(next) <= new Date(); // <= 변경
      setIsClickAlble(isable);
    }
    try {
      fetchUpdateTimeInfo();
    } catch {
      console.error('FetchUpdateTimeInfo Error');
      setIsClickAlble(false);
    }
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

  function onClickUpdateHandler() {
    if (!isClickAble) return console.log(`${restTimeToUpdateHour}시간 후에 업데이트 가능`);
    try {
      const updateTime = {
        next: nextUpdateTime,
        click: dayjs(Date.now()).format('YYYY/MM/DD HH:mm:ss:SSS'),
      };
      const modal = document.getElementById('modal');
      modal.show();
      // 목차 갱신
      setType('UPDATE');
      // DB 시간 업데이트
      updateData('updateTime/', updateTime);
      // 업데이트 버튼 비활성화
      setIsClickAlble(false);
    } catch {
      console.error('UpdateTime Error');
      restTimeToUpdateHour = 'n';
      if (loadingPercent === 100) setIsError(true);
      setIsClickAlble(false);
    }
  }

  function onClickDisabledUpdateIsAble(e) {
    if (loadingPercent < 100) return;
    if (e.target.nodeName === 'DIALOG') {
      e.target.close();
    }
  }

  return page.length === 0 ? (
    <Loading loadingPercent={loadingPercent} type={type} />
  ) : (
    <div className={`${styles.categories}`}>
      <dialog id="modal" className={styles.modal} onClick={onClickDisabledUpdateIsAble}>
        <Loading loadingPercent={loadingPercent} type={type} error={isError} />
      </dialog>
      <div className={styles['main-title']}>
        목차
        <div
          className={styles.updateBtn}
          onClick={onClickUpdateHandler}
          title={isClickAble ? '현재 업데이트 가능' : `${restTimeToUpdateHour}시간 후에 업데이트 가능`}
        >
          <p className={isClickAble ? styles.able : styles.disable}>업데이트</p>
        </div>
      </div>
      <div className={styles['list-arr']}>
        <SwiperSlides item={page[pageNumber]} />
      </div>
      <div className={styles['btn-wrap']}>
        <div data-testid="btn_l" className={styles.btn} onClick={onClickPrevPage} title="이전 페이지">
          <img src="/img/prev_btn.png" alt="이전 페이지 아이콘" />
        </div>
        <div data-testid="btn_r" className={styles.btn} onClick={onClickNextPage} title="다음 페이지">
          <img src="/img/next_btn.png" alt="다음 페이지 아이콘" />
        </div>
      </div>
    </div>
  );
}
