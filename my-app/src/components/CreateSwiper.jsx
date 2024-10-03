import styles from '@/styles/CreateSwiper.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useEffect } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import ContentsList from './ContentsList';

const list = Array(3)
  .fill(1)
  .map((v, i) => v + i);

export default function CreateSwiper() {
  useEffect(() => {
    new Swiper('.swiper', {
      modules: [Navigation, Pagination],
      speed: 400,
      slidesPerView: 1,
      slidesPerGroup: 1,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      allowTouchMove: false,
    });
  }, []);

  return (
    <>
      <div className={`${styles.swiper} swiper`}>
        <div className={`${styles['swiper-wrapper']} swiper-wrapper`}>
          {list.map((v) => (
            <div className={'swiper-slide'} key={v}>
              <ContentsList />
            </div>
          ))}
        </div>
      </div>
      <div className={styles['btn-wrap']}>
        <div className={`swiper-button-prev ${styles['swiper-btn']}`}></div>
        <div className={`swiper-button-next ${styles['swiper-btn']}`}></div>
      </div>
    </>
  );
}
