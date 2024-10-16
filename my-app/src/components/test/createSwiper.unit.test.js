import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import classNameCheck from './classNameCheck.test';
import userEvent from '@testing-library/user-event';
userEvent.setup();

import CreateSwiper from '../createSwiper';

const testObj = {
  compName: 'CreateSwiper',
  argument: {},
  classNameArr: ['categories', 'main-title', 'btn-wrap', 'btn', 'btn'],
};

jest.mock('../SwiperSlides', () => () => {
  return <div>SwiperSlides</div>
})

describe('CreateSwiper unit test : ', () => {
  render(<CreateSwiper />)

  // CSS 검사
  classNameCheck(testObj);

  let pageLength = 3;
  let pageNumber = 1;

  // 페이지 좌클릭 검사
  test('onClick left, decrease PageNumber', async () => {
    const onClickPrevPage = jest.fn(() => {
      if (pageNumber > 0) {
        pageNumber -= 1;
      }
    });

    render(<div data-testid="btn_l" onClick={onClickPrevPage}>
      <img src="./img/prev_btn.png" alt="이전 페이지" />
    </div>);

    const leftClick = screen.getByTestId('btn_l');

    expect(onClickPrevPage).toHaveBeenCalledTimes(0);
    expect(pageNumber).toBe(1);
    await userEvent.click(leftClick);
    expect(onClickPrevPage).toHaveBeenCalledTimes(1)
    expect(pageNumber).toBe(0);
    await userEvent.click(leftClick);
    expect(onClickPrevPage).toHaveBeenCalledTimes(2)
    expect(pageNumber).toBe(0);
  })

  // 페이지 우클릭 검사
  test('onClick right, increase PageNumber', async () => {
    const onClickNextPage = jest.fn(() => {
      if (pageNumber < pageLength - 1) {
        pageNumber += 1;
      }
    });

    render(<div data-testid="btn_r" onClick={onClickNextPage}>
      <img src="./img/next_btn.png" alt="다음 페이지" />
    </div>);

    const rightClick = screen.getByTestId('btn_r');

    expect(onClickNextPage).toHaveBeenCalledTimes(0)
    expect(pageNumber).toBe(0);
    await userEvent.click(rightClick);
    expect(onClickNextPage).toHaveBeenCalledTimes(1)
    expect(pageNumber).toBe(1);
    await userEvent.click(rightClick);
    expect(onClickNextPage).toHaveBeenCalledTimes(2)
    expect(pageNumber).toBe(2);
    await userEvent.click(rightClick);
    expect(onClickNextPage).toHaveBeenCalledTimes(3)
    expect(pageNumber).toBe(2);
  })
})