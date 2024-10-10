import '@testing-library/jest-dom';
import TextInput from '../textInput';
import styles from '@/styles/textInput.module.css';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
userEvent.setup()

const currentTextArr = ["그", "런", " ", "날", "이", " ", "있", "을", "까", "요", "?"]

afterEach(() => {
  jest.clearAllMocks()
})

test('TextInput : When TextInput is amounted, the input tag styles check', () => {
  const typingtext = '';
  const setTypingText = jest.fn();
  const setSentenceArr = jest.fn();
  const setSentenceNum = jest.fn();

  render(<TextInput typingtext={typingtext}
    setTypingText={setTypingText}
    currentTextArr={currentTextArr}
    setSentenceArr={setSentenceArr}
    setSentenceNum={setSentenceNum} />)

  expect(screen.getByTestId('textInput')).toBeVisible();
  expect(screen.getByTestId('textInput')).toHaveClass(styles.textInput);
  expect(screen.getByTestId('textInput')).toHaveFocus();
  expect(screen.getByTestId('textInput')).toHaveAttribute('type', 'text');
  expect(screen.getByTestId('textInput')).toHaveAttribute('value', typingtext);
  expect(screen.getByTestId('textInput')).toHaveAttribute('id', 'textInput');
  expect(screen.getByTestId('textInput')).toHaveAttribute('name', 'textInput');
})

test('TextInput : When typing is on, the input value checks', () => {
  const setTypingText = jest.fn().mockReturnValueOnce('foo');
  const typingtext = setTypingText();
  const setSentenceArr = jest.fn();
  const setSentenceNum = jest.fn();

  render(<TextInput typingtext={typingtext}
    setTypingText={setTypingText}
    currentTextArr={currentTextArr}
    setSentenceArr={setSentenceArr}
    setSentenceNum={setSentenceNum} />)

  const element = screen.getByTestId('textInput');
  expect(setTypingText).toHaveBeenCalledTimes(1);
  expect(element).toHaveValue('foo');
})

test('TextInput : According to the typingText length, the Enter event tests', async () => {
  const setTypingText = jest.fn()
    .mockReturnValueOnce('')
    .mockReturnValueOnce('f')
    .mockReturnValueOnce('foofoofoofoo')
    .mockReturnValueOnce('foofoofoofoof')
    .mockReturnValueOnce('foofoofoofo');
  const setSentenceArr = jest.fn();
  const setSentenceNum = jest.fn();
  jest.spyOn(window, 'alert').mockImplementation(() => { });

  // setTypingText.length(0) !== currentTextArr.length(11)
  const { rerender } = render(<TextInput typingtext={setTypingText()}
    setTypingText={setTypingText}
    currentTextArr={currentTextArr}
    setSentenceArr={setSentenceArr}
    setSentenceNum={setSentenceNum} />)

  const rerenderComponent = (typingtext) => {
    return rerender(<TextInput typingtext={typingtext}
      setTypingText={setTypingText}
      currentTextArr={currentTextArr}
      setSentenceArr={setSentenceArr}
      setSentenceNum={setSentenceNum} />)
  }

  expect(setTypingText).toHaveBeenCalledTimes(1);
  expect(setSentenceArr).toHaveBeenCalledTimes(0);
  expect(setSentenceNum).toHaveBeenCalledTimes(0);
  expect(window.alert).toHaveBeenCalledTimes(0);
  await userEvent.keyboard('{Enter}');
  expect(setTypingText).toHaveBeenCalledTimes(1);
  expect(setSentenceArr).toHaveBeenCalledTimes(0);
  expect(setSentenceNum).toHaveBeenCalledTimes(0);
  expect(window.alert).toHaveBeenCalledTimes(1);

  // setTypingText.length(1) !== currentTextArr.length(11)
  rerenderComponent(setTypingText());

  expect(setTypingText).toHaveBeenCalledTimes(2);
  expect(setSentenceArr).toHaveBeenCalledTimes(0);
  expect(setSentenceNum).toHaveBeenCalledTimes(0);
  expect(window.alert).toHaveBeenCalledTimes(1);
  await userEvent.keyboard('{Enter}');
  expect(setTypingText).toHaveBeenCalledTimes(2);
  expect(setSentenceArr).toHaveBeenCalledTimes(0);
  expect(setSentenceNum).toHaveBeenCalledTimes(0);
  expect(window.alert).toHaveBeenCalledTimes(2);

  // setTypingText.length(12) !== currentTextArr.length(11)
  rerenderComponent(setTypingText());

  expect(setTypingText).toHaveBeenCalledTimes(3);
  expect(setSentenceArr).toHaveBeenCalledTimes(0);
  expect(setSentenceNum).toHaveBeenCalledTimes(0);
  expect(window.alert).toHaveBeenCalledTimes(2);
  await userEvent.keyboard('{Enter}');
  expect(setTypingText).toHaveBeenCalledTimes(3);
  expect(setSentenceArr).toHaveBeenCalledTimes(0);
  expect(setSentenceNum).toHaveBeenCalledTimes(0);
  expect(window.alert).toHaveBeenCalledTimes(3);

  // setTypingText.length(13) !== currentTextArr.length(11)
  rerenderComponent(setTypingText());

  expect(setTypingText).toHaveBeenCalledTimes(4);
  expect(setSentenceArr).toHaveBeenCalledTimes(0);
  expect(setSentenceNum).toHaveBeenCalledTimes(0);
  expect(window.alert).toHaveBeenCalledTimes(3);
  await userEvent.keyboard('{Enter}');
  expect(setTypingText).toHaveBeenCalledTimes(4);
  expect(setSentenceArr).toHaveBeenCalledTimes(0);
  expect(setSentenceNum).toHaveBeenCalledTimes(0);
  expect(window.alert).toHaveBeenCalledTimes(4);

  // setTypingText.length(11) === currentTextArr.length(11)
  rerenderComponent(setTypingText());

  expect(setTypingText).toHaveBeenCalledTimes(5);
  expect(setSentenceArr).toHaveBeenCalledTimes(0);
  expect(setSentenceNum).toHaveBeenCalledTimes(0);
  expect(window.alert).not.toHaveBeenCalledTimes(0);
  await userEvent.keyboard('{Enter}');
  expect(setTypingText).toHaveBeenCalledTimes(6); // setTypingText(''), +1
  expect(setSentenceArr).toHaveBeenCalledTimes(1);
  expect(setSentenceNum).toHaveBeenCalledTimes(1);
  expect(window.alert).not.toHaveBeenCalledTimes(1);
})