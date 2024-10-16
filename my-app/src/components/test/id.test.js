import Page, { getServerSideProps } from '@/pages/music/[id]';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('../resultPage', () => () => <div>resultPage</div>)
jest.mock('../sentence', () => () => <div>sentence</div>)

describe('[id] DOM check test : ', () => {
  let trackId;
  let props;
  beforeEach(async () => {
    trackId = { query: { id: 83681270 } };
    const data = await getServerSideProps(trackId)
    props = data.props;
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('First page', () => {
    let page = 0
    const useStateSpy = jest.spyOn(React, 'useState')
      .mockReturnValueOnce([page, () => null])
      .mockReturnValueOnce([false, () => null])

    expect(useStateSpy).toHaveBeenCalledTimes(0);
    render(<Page music={props.music} artistName={props.artistName} pageSheet={props.pageSheet} />)

    const tags = []
    const checkClassNames = ['id-main', 'pageNumber', 'title', 'artist', 'page'];
    const roles = ['generic', 'link', 'group', 'ariticle', 'complementary', 'blockquote', 'button', 'caption', 'dialog', 'figure', 'form', 'img', 'checkbox', 'textbox', 'main', 'heading', 'paragraph', 'list', 'listitem'];
    for (let i = 0; i < roles.length; i++) {
      try {
        const selectedTags = screen.getAllByRole(roles[i]);
        tags.push(selectedTags);
      } catch (e) {
        continue;
      }
    }

    const allTag = tags.flat()
    const classNameCount = {}
    for (let i = 0; i < allTag.length; i++) {
      if (!allTag[i].className) continue;
      classNameCount[allTag[i].className] = ++classNameCount[allTag[i].className] || 1;
    }

    for (let i = 0; i < checkClassNames.length; i++) {
      let className;
      try {
        className = checkClassNames[i].replace(' ', '.');
      } catch {
        // 컴포넌트 className 목록 제시
        console.error('Check the checkClassNames variable, it must be contained : ', Object.keys(classNameCount))
      }
      const selectedDOMTagArr = document.querySelectorAll(`.${className}`);
      const selectedDOMTag = document.querySelector(`.${className}`);
      // DOM className 존재 확인
      expect(classNameCount[checkClassNames[i]]).not.toBeUndefined()
      // DOM className 개수 확인 (중복확인)
      expect(classNameCount[checkClassNames[i]]).toBe(selectedDOMTagArr.length)
      // tag, DOM에서 보임 확인
      expect(selectedDOMTag).toBeVisible()
    }

    const pageNumberText = screen.getByText(page + 1, { exact: false }).textContent;
    expect(pageNumberText).toBe(`${page + 1} / 2`);

    expect(useStateSpy).toHaveBeenCalledTimes(2);
    expect(screen.queryByText('resultPage')).not.toBeInTheDocument();
    expect(screen.queryByText('sentence')).toBeInTheDocument();
  })

  test('Second page', () => {
    let page = 1
    const useStateSpy = jest.spyOn(React, 'useState')
      .mockReturnValueOnce([page, () => null])
      .mockReturnValueOnce([false, () => null])

    expect(useStateSpy).toHaveBeenCalledTimes(0);

    render(<Page music={props.music} artistName={props.artistName} pageSheet={props.pageSheet} />)

    const tags = []
    const checkClassNames = ['id-main', 'pageNumber', 'page'];
    const roles = ['generic', 'link', 'group', 'ariticle', 'complementary', 'blockquote', 'button', 'caption', 'dialog', 'figure', 'form', 'img', 'checkbox', 'textbox', 'main', 'heading', 'paragraph', 'list', 'listitem']
    for (let i = 0; i < roles.length; i++) {
      try {
        const selectedTags = screen.getAllByRole(roles[i]);
        tags.push(selectedTags);
      } catch (e) {
        continue;
      }
    }

    const allTag = tags.flat()
    const classNameCount = {}
    for (let i = 0; i < allTag.length; i++) {
      if (!allTag[i].className) continue;
      classNameCount[allTag[i].className] = ++classNameCount[allTag[i].className] || 1;
    }

    for (let i = 0; i < Object.keys(classNameCount).length; i++) {
      let className;
      try {
        className = checkClassNames[i].replace(' ', '.');
      } catch {
        // 컴포넌트 className 목록 제시
        console.error('Check the checkClassNames variable, it must be contained : ', Object.keys(classNameCount))
      }
      const selectedDOMTagArr = document.querySelectorAll(`.${className}`);
      const selectedDOMTag = document.querySelector(`.${className}`);
      // DOM className 존재 확인
      expect(classNameCount[checkClassNames[i]]).not.toBeUndefined()
      // DOM className 개수 확인 (중복확인)
      expect(classNameCount[checkClassNames[i]]).toBe(selectedDOMTagArr.length)
      // tag, DOM에서 보임 확인
      expect(selectedDOMTag).toBeVisible()
    }

    const pageNumberText = screen.getByText(page + 1, { exact: false }).textContent;
    expect(pageNumberText).toBe(`${page + 1} / 2`);

    expect(useStateSpy).toHaveBeenCalledTimes(2);
    expect(screen.queryByText('resultPage')).not.toBeInTheDocument();
    expect(screen.queryByText('sentence')).toBeInTheDocument();
  })

  test('Result page', () => {
    const useStateSpy = jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => [0, () => {
        return null
      }])
      .mockImplementationOnce(() => [true, () => {
        return null
      }])

    expect(useStateSpy).toHaveBeenCalledTimes(0);

    render(<Page trackId={props.trackId} music={props.music} artistName={props.artistName} />)

    expect(useStateSpy).toHaveBeenCalledTimes(2);
    expect(screen.queryByText('resultPage')).toBeInTheDocument();
    expect(screen.queryByText('sentence')).not.toBeInTheDocument();
  })
})