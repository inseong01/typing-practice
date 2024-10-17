import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import classNameCheck from './classNameCheck.test';
import Page, { getServerSideProps } from '@/pages/music/[id]';
import React from 'react';

let trackId;
let props;

jest.mock('../resultPage', () => () => <div className='result'>resultPage</div>)
jest.mock('../sentence', () => () => <div className='sentence'>sentence</div>)

describe('[id] unit test : ', () => {
  beforeAll(async () => {
    trackId = { query: { id: 83681270 } };
    const data = await getServerSideProps(trackId);
    props = data.props;
  })

  afterEach(() => {
    jest.resetAllMocks();
  })

  test('First page', () => {
    let page = 0;

    const useStateSpy = jest.spyOn(React, 'useState')
      .mockReturnValueOnce([page, () => null])
      .mockReturnValueOnce([false, () => null])

    // useState 호출 검사
    expect(useStateSpy).toHaveBeenCalledTimes(0);
    render(<Page music={props.music} artistName={props.artistName} pageSheet={props.pageSheet} />)

    // 페이지 숫자 검사
    const pageNumberText = screen.getByText(page + 1, { exact: false }).textContent;
    expect(pageNumberText).toBe(`${page + 1} / 2`);

    // useState 호출 검사
    expect(useStateSpy).toHaveBeenCalledTimes(2);
    // 페이지 구성 검사
    expect(screen.queryByText('resultPage')).not.toBeInTheDocument();
    expect(screen.queryByText('sentence')).toBeInTheDocument();
    // CSS 검사
    classNameCheck(['id-main', 'pageNumber', 'title', 'artist', 'page', 'sentence']);
  })

  test('Second page', () => {
    let page = 1

    const useStateSpy = jest.spyOn(React, 'useState')
      .mockReturnValueOnce([page, () => null])
      .mockReturnValueOnce([false, () => null])

    // useState 호출 검사
    expect(useStateSpy).toHaveBeenCalledTimes(0);
    render(<Page music={props.music} artistName={props.artistName} pageSheet={props.pageSheet} />)

    // 페이지 숫자 검사
    const pageNumberText = screen.getByText(page + 1, { exact: false }).textContent;
    expect(pageNumberText).toBe(`${page + 1} / 2`);

    // useState 호출 검사
    expect(useStateSpy).toHaveBeenCalledTimes(2);
    // 페이지 구성 검사
    expect(screen.queryByText('resultPage')).not.toBeInTheDocument();
    expect(screen.queryByText('sentence')).toBeInTheDocument();
    // CSS 검사
    classNameCheck(['id-main', 'pageNumber', 'page', 'sentence']);
  })

  test('Result page', () => {
    const useStateSpy = jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => [0, () => {
        return null
      }])
      .mockImplementationOnce(() => [true, () => {
        return null
      }])

    // useState 호출 검사
    expect(useStateSpy).toHaveBeenCalledTimes(0);
    render(<Page trackId={props.trackId} music={props.music} artistName={props.artistName} />)

    // useState 호출 검사
    expect(useStateSpy).toHaveBeenCalledTimes(2);
    // 페이지 구성 검사
    expect(screen.queryByText('resultPage')).toBeInTheDocument();
    expect(screen.queryByText('sentence')).not.toBeInTheDocument();
    // CSS 검사
    classNameCheck(['result']);
  })
})