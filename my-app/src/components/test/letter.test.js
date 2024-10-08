import '@testing-library/jest-dom'; // dom 사용 시 필요
import Letter from '@/components/letter';
import styles from '@/styles/letter.module.css';
import { render, screen } from '@testing-library/react';

// css 검사
/* correct */
test('Correct: string length === 1', async () => {
  const typingtext = 'a';
  render(<Letter children={'a'} typingtext={typingtext} sentenceNum={0} strNum={0} charNum={0} sentenceArr={[]} />)

  const element = screen.getByTestId('textDiv');
  expect(element).toHaveClass(styles.correct);
});
test('Correct: !typingtext && <br>', () => {
  const typingtext = '\n';
  render(<Letter children={'\n'} typingtext={typingtext} sentenceNum={0} strNum={0} charNum={0} sentenceArr={[]} />)

  const element = screen.getByTestId('br');
  expect(element).not.toHaveClass();
});
test('Correct: typingtext && <br>', () => {
  const typingtext = 'a';
  render(<Letter children={'\n'} typingtext={typingtext} sentenceNum={0} strNum={0} charNum={0} sentenceArr={[]} />)

  const element = screen.getByTestId('br');
  expect(element).not.toHaveClass();
});

/* wrong */
test('Wrong : string length > 1', () => {
  const typingtext = 'ab';
  render(<Letter children={'a'} typingtext={typingtext} sentenceNum={0} strNum={0} charNum={0} sentenceArr={[]} />)

  const element = screen.getByTestId('textDiv');
  expect(element).toHaveClass(styles.wrong);
});
test('Wrong : children !== typingtext', () => {
  const typingtext = 'b';
  render(<Letter children={'a'} typingtext={typingtext} sentenceNum={0} strNum={0} charNum={0} sentenceArr={[]} />)

  const element = screen.getByTestId('textDiv');
  expect(element).toHaveClass(styles.wrong);
});