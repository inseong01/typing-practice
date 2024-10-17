import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import classNameCheck from './classNameCheck.test';
import TextInput from '../textInput';
import userEvent from '@testing-library/user-event';
userEvent.setup()

const currentTextArr = ["그", "런", " ", "날", "이", " ", "있", "을", "까", "요", "?"]

describe('TextInput test : ', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('When TextInput is mounted, the input tag styles check', () => {
    const typingtext = '';
    const setTypingText = jest.fn();
    const setSentenceArr = jest.fn();
    const setTypingSentenceNum = jest.fn();

    render(<TextInput
      typingtext={typingtext}
      setTypingText={setTypingText}
      currentTextArr={currentTextArr}
      setSentenceArr={setSentenceArr}
      setTypingSentenceNum={setTypingSentenceNum} />)

    // CSS 검사
    classNameCheck(['textInput']);
    // 존재확인
    expect(screen.getByTestId('textInput')).toBeVisible();
    // 속성검사
    expect(screen.getByTestId('textInput')).toHaveFocus();
    expect(screen.getByTestId('textInput')).toHaveAttribute('type', 'text');
    expect(screen.getByTestId('textInput')).toHaveAttribute('value', typingtext);
    expect(screen.getByTestId('textInput')).toHaveAttribute('id', 'textInput');
    expect(screen.getByTestId('textInput')).toHaveAttribute('name', 'textInput');
  })

  test('When typing event is on, the input value is correct', () => {
    const setTypingText = jest.fn().mockReturnValueOnce('foo');
    const typingtext = setTypingText();
    const setSentenceArr = jest.fn();
    const setTypingSentenceNum = jest.fn();

    render(<TextInput
      typingtext={typingtext}
      setTypingText={setTypingText}
      currentTextArr={currentTextArr}
      setSentenceArr={setSentenceArr}
      setTypingSentenceNum={setTypingSentenceNum} />)

    // setTypingText 호출 검사
    expect(setTypingText).toHaveBeenCalledTimes(1);
    // value 검사
    const element = screen.getByTestId('textInput');
    expect(element).toHaveValue('foo');
  })

  test('Count the Enter event', async () => {
    const setTypingText = jest.fn()
      .mockReturnValueOnce('')
      .mockReturnValueOnce('f')
      .mockReturnValueOnce('foofoofoofoo')
      .mockReturnValueOnce('foofoofoofoof')
      .mockReturnValueOnce('foofoofoofo');
    const setSentenceArr = jest.fn();
    const setTypingSentenceNum = jest.fn();
    jest.spyOn(window, 'alert').mockImplementation(() => { });

    // 1번째 호출, setTypingText.length(0) !== currentTextArr.length(11)
    const { rerender } = render(<TextInput
      typingtext={setTypingText()}
      setTypingText={setTypingText}
      currentTextArr={currentTextArr}
      setSentenceArr={setSentenceArr}
      setTypingSentenceNum={setTypingSentenceNum} />)

    const rerenderComponent = (typingtext) => {
      return rerender(<TextInput
        typingtext={typingtext}
        setTypingText={setTypingText}
        currentTextArr={currentTextArr}
        setSentenceArr={setSentenceArr}
        setTypingSentenceNum={setTypingSentenceNum} />)
    }

    expect(setTypingText).toHaveBeenCalledTimes(1);
    expect(setSentenceArr).toHaveBeenCalledTimes(0);
    expect(setTypingSentenceNum).toHaveBeenCalledTimes(0);
    expect(window.alert).toHaveBeenCalledTimes(0);
    await userEvent.keyboard('{Enter}');
    expect(setTypingText).toHaveBeenCalledTimes(1);
    expect(setSentenceArr).toHaveBeenCalledTimes(0);
    expect(setTypingSentenceNum).toHaveBeenCalledTimes(0);
    expect(window.alert).toHaveBeenCalledTimes(1);

    // 2번째 호출, setTypingText.length(1) !== currentTextArr.length(11)
    rerenderComponent(setTypingText());

    expect(setTypingText).toHaveBeenCalledTimes(2);
    expect(setSentenceArr).toHaveBeenCalledTimes(0);
    expect(setTypingSentenceNum).toHaveBeenCalledTimes(0);
    expect(window.alert).toHaveBeenCalledTimes(1);
    await userEvent.keyboard('{Enter}');
    expect(setTypingText).toHaveBeenCalledTimes(2);
    expect(setSentenceArr).toHaveBeenCalledTimes(0);
    expect(setTypingSentenceNum).toHaveBeenCalledTimes(0);
    expect(window.alert).toHaveBeenCalledTimes(2);

    // 3번째 호출, setTypingText.length(12) !== currentTextArr.length(11)
    rerenderComponent(setTypingText());

    expect(setTypingText).toHaveBeenCalledTimes(3);
    expect(setSentenceArr).toHaveBeenCalledTimes(0);
    expect(setTypingSentenceNum).toHaveBeenCalledTimes(0);
    expect(window.alert).toHaveBeenCalledTimes(2);
    await userEvent.keyboard('{Enter}');
    expect(setTypingText).toHaveBeenCalledTimes(3);
    expect(setSentenceArr).toHaveBeenCalledTimes(0);
    expect(setTypingSentenceNum).toHaveBeenCalledTimes(0);
    expect(window.alert).toHaveBeenCalledTimes(3);

    // 4번째 호출, setTypingText.length(13) !== currentTextArr.length(11)
    rerenderComponent(setTypingText());

    expect(setTypingText).toHaveBeenCalledTimes(4);
    expect(setSentenceArr).toHaveBeenCalledTimes(0);
    expect(setTypingSentenceNum).toHaveBeenCalledTimes(0);
    expect(window.alert).toHaveBeenCalledTimes(3);
    await userEvent.keyboard('{Enter}');
    expect(setTypingText).toHaveBeenCalledTimes(4);
    expect(setSentenceArr).toHaveBeenCalledTimes(0);
    expect(setTypingSentenceNum).toHaveBeenCalledTimes(0);
    expect(window.alert).toHaveBeenCalledTimes(4);

    // 5번째 호출, setTypingText.length(11) === currentTextArr.length(11)
    rerenderComponent(setTypingText());

    expect(setTypingText).toHaveBeenCalledTimes(5);
    expect(setSentenceArr).toHaveBeenCalledTimes(0);
    expect(setTypingSentenceNum).toHaveBeenCalledTimes(0);
    expect(window.alert).not.toHaveBeenCalledTimes(0);
    await userEvent.keyboard('{Enter}');
    expect(setTypingText).toHaveBeenCalledTimes(6); // setTypingText(''), +1
    expect(setSentenceArr).toHaveBeenCalledTimes(1);
    expect(setTypingSentenceNum).toHaveBeenCalledTimes(1);
    expect(window.alert).not.toHaveBeenCalledTimes(1);
  })
})
