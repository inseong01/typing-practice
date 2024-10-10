import '@testing-library/jest-dom';

import Lyric_li from '../lyric_li';
import { render, screen } from '@testing-library/react';

jest.resetModules()
jest.mock('../letter', () => ({ children }) => {
  return children === '\n' ? (<br data-testid="br" />) : (<span data-testid="span">{children}</span>)
});

const ly = ["그", "런", " ", "날", "이", " ", "있", "을", "까", "요", "?"]

test('Lyric_li : Sentences check test', () => {
  const { rerender } = render(<Lyric_li ly={ly} typingtext={''} sentenceNum={0} strNum={0} sentenceArr={[]} />)

  const element = screen.getAllByTestId('span');
  // 문자 개수 일치
  expect(element).toHaveLength(ly.length)
  // 문자 내용 일치
  for (let i = 0; i < element.length; i++) {
    expect(element[i].textContent).toBe(ly[i])
  }
  // <li> 생성 확인
  const li_tag = screen.getByTestId('li');
  expect(li_tag).toBeVisible()
  // <br/> 생성 확인
  rerender(<Lyric_li ly={['\n']} typingtext={''} sentenceNum={0} strNum={0} sentenceArr={[]} />)
  const br_tag = screen.getByTestId('br');
  expect(br_tag).toBeVisible();
})