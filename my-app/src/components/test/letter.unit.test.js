import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import classNameCheck from './classNameCheck.test';
import Letter from '@/components/letter';

describe('Letter unit test : ', () => {
  describe('Correct case', () => {
    afterEach(() => {
      const tag = screen.getByTestId("word");
      if (tag.tagName === 'SPAN') {
        classNameCheck(['correct']);
      } else {
        expect(tag).not.toHaveClass();
      }
    })

    test('typedText("a") is equal to children("a")', async () => {
      const typedText = 'a';
      render(<Letter children={'a'} typingtext={typedText} sentenceNum={0} strNum={0} charNum={0} sentenceArr={[]} />)
    });
    test('typedText(Enter) is equal to children(Enter)', () => {
      const typedText = '\n';
      render(<Letter children={'\n'} typingtext={typedText} sentenceNum={0} strNum={0} charNum={0} sentenceArr={[]} />)
    });
  })

  describe('Wrong case', () => {
    afterEach(() => {
      const tag = screen.getByTestId("word");
      if (tag.tagName === 'SPAN') {
        classNameCheck(['wrong']);
      } else {
        expect(tag).not.toHaveClass();
      }
    })

    test('typedText("ab") length is not 1', () => {
      const typedText = 'ab';
      render(<Letter children={'a'} typingtext={typedText} sentenceNum={0} strNum={0} charNum={0} sentenceArr={[]} />)
    });
    test('typedText("b") is not equal to children("a")', () => {
      const typedText = 'b';
      render(<Letter children={'a'} typingtext={typedText} sentenceNum={0} strNum={0} charNum={0} sentenceArr={[]} />)
    });
    test('typedText("a") is not equal to children(Enter)', () => {
      const typedText = 'a';
      render(<Letter children={'\n'} typingtext={typedText} sentenceNum={0} strNum={0} charNum={0} sentenceArr={[]} />)
    });
  })
})