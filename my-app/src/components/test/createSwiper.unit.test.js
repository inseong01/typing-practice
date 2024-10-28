import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import classNameCheck from './classNameCheck.test';
import CreateSwiper from '../createSwiper';
import pageData from '../../../public/pageData.json';
import useFetchData, { readData, updateData } from '@/hook/useFetchData';
userEvent.setup();

jest.mock('../SwiperSlides', () => () => {
  return <div>SwiperSlides</div>
})
jest.mock('../loading', () => () => {
  return <div>loading</div>
})
jest.mock('../../hook/useFetchData');

const updateTime = {
  click: "2024/10/28 11:07:09:023",
  next: "2024/10/29 07:00:00:000"
}

describe('CreateSwiper unit test : ', () => {
  let pageLength = 3;
  let pageNumber = 1;

  beforeEach(() => {
    // useFetchData mock
    useFetchData.mockReturnValue({ page: pageData });
    // readData mock
    readData.mockReturnValue(updateTime);
    updateData.mockImplementation(() => { });
  })

  test('className check', () => {
    render(<CreateSwiper />);
    const classNameArr = ['categories', 'main-title', 'updateBtn', 'disable', 'list-arr', 'btn-wrap', 'btn', 'btn']
    // disable / able은 update 상태에 따라 다름
    classNameCheck(classNameArr);
  })

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

  test('onClick updateBtn', async () => {
    const onClickUpdateHandler = () => {
      updateData();
    }
    let isClickAble = true;

    render(<div
      data-testid="btn_update"
      onClick={onClickUpdateHandler}
    >
      <p className={isClickAble ? 'able' : 'disable'}>업데이트</p>
    </div>)

    const btn = screen.getByTestId('btn_update');
    const btnProps = screen.getByText('업데이트');

    expect(btnProps).toHaveClass('able');

    if (btnProps.className === 'able') {
      expect(updateData).toHaveBeenCalledTimes(0);
      await userEvent.click(btn);
      expect(updateData).toHaveBeenCalledTimes(1);
      return;
    }
  })
})