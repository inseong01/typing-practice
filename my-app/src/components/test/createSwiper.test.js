import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
userEvent.setup();

import CreateSwiper from '../createSwiper';

jest.mock('../ContentsList', () => ({ item }) => {
  return <div>list</div>
})

describe('CreateSwiper style test : ', () => {
  test('className', () => {
    const classNameArr = ['', 'categories', 'main-title', 'mock', 'btn-wrap', 'btn', 'btn'];
    render(<CreateSwiper />)
    const tags = screen.getAllByRole('generic')
    for (let i = 0; i < tags.length; i++) {
      if (i === 0 || classNameArr[i] === 'mock') continue; // 첫번째, mock 태그 건너뜀
      expect(tags[i]).toHaveClass(classNameArr[i])
      expect(tags[i]).toBeInTheDocument()
    }
  })
})

describe('CreateSwiper function test :', () => {
  let pageLength = 3;
  let pageNumber = 1;

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
})
