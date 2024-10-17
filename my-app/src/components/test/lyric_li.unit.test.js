import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Lyric_li from '../lyric_li';

const ly = ["그", "런", " ", "날", "이", " ", "있", "을", "까", "요", "?"]

jest.mock('../letter', () => ({ children }) => {
  return children === '\n' ? (<br data-testid="br" />) : (<span data-testid="span">{children}</span>)
});

describe('Lyric_li unit test : ', () => {
  afterAll(() => {
    jest.resetModules();
  })

  test('Sentences check', () => {
    const { rerender } = render(<Lyric_li ly={ly} typingtext={''} sentenceNum={0} strNum={0} sentenceArr={[]} />)

    // 문자 개수 일치
    const element = screen.getAllByTestId('span');
    expect(element).toHaveLength(ly.length);

    // 문자 내용 일치
    for (let i = 0; i < element.length; i++) {
      expect(element[i].textContent).toEqual(ly[i])
    }

    // <li> 생성 확인
    const li_tag = screen.getByTestId('li');
    expect(li_tag).toBeVisible();

    // <br/> 생성 확인
    rerender(<Lyric_li ly={['\n']} typingtext={''} sentenceNum={0} strNum={0} sentenceArr={[]} />)
    const br_tag = screen.getByTestId('br');
    expect(br_tag).toBeVisible();
  })
})