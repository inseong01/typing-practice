import '@testing-library/jest-dom';
import { act, getByTestId, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useContext, useReducer } from 'react';

import classNameCheck from './classNameCheck.test';
import TextInput from '../textInput';
import { reducer } from '@/pages/_app';
import Sentence from '../sentence';
userEvent.setup();

const currentTextArr = [
  ["그", "런", " ", "날", "이", " ", "있", "을", "까", "요", "?"],
  ["두", " ", "번", "째", " ", "문", "장"]
];
const initialArg = {
  time: null,
  accuracy: 0,
  typingSpeed: 0,
  cursor: {
    top: 2,
    left: 0,
  },
};

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}))

describe('TextInput test : ', () => {
  let dispatchMock = jest.fn();
  beforeEach(() => {
    useContext.mockReturnValue({ dispatch: dispatchMock, initialArg });
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  test('When TextInput is mounted, the input tag styles check', () => {
    const typingtext = '';
    const sentenceArr = [];
    const setTypingText = jest.fn();
    const setSentenceArr = jest.fn();
    const typingSentenceNum = 0;
    const setTypingSentenceNum = jest.fn();

    render(<TextInput
      typingtext={typingtext}
      sentenceArr={sentenceArr}
      setTypingText={setTypingText}
      currentTextArr={currentTextArr}
      setSentenceArr={setSentenceArr}
      typingSentenceNum={typingSentenceNum}
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
    const sentenceArr = [];
    const setTypingText = jest.fn().mockReturnValueOnce('foo');
    const setSentenceArr = jest.fn();
    const typingSentenceNum = 0;
    const setTypingSentenceNum = jest.fn();

    render(<TextInput
      typingtext={setTypingText()}
      sentenceArr={sentenceArr}
      setTypingText={setTypingText}
      currentTextArr={currentTextArr}
      setSentenceArr={setSentenceArr}
      typingSentenceNum={typingSentenceNum}
      setTypingSentenceNum={setTypingSentenceNum} />)

    // CSS 검사
    classNameCheck(['textInput']);
    // setTypingText 호출 검사
    expect(setTypingText).toHaveBeenCalledTimes(1);
    // value 검사
    const element = screen.getByTestId('textInput');
    expect(element).toHaveValue('foo');
  })

  test('Count Enter events', async () => {
    const sentenceArr = [];
    const setTypingText = jest.fn();
    const setSentenceArr = jest.fn();
    const setTypingSentenceNum = jest.fn();

    jest.spyOn(window, 'alert').mockImplementation(() => { });

    const { rerender } = render(
      <TextInput
        typingtext={''}
        sentenceArr={sentenceArr}
        setTypingText={setTypingText}
        currentTextArr={currentTextArr}
        setSentenceArr={setSentenceArr}
        typingSentenceNum={0}
        setTypingSentenceNum={setTypingSentenceNum}
      />
    )

    const rerenderComponent = (typingtext) => {
      return rerender(<TextInput
        typingtext={typingtext}
        sentenceArr={sentenceArr}
        setTypingText={setTypingText}
        currentTextArr={currentTextArr}
        setSentenceArr={setSentenceArr}
        typingSentenceNum={0}
        setTypingSentenceNum={setTypingSentenceNum} />)
    }

    const ul = `
    <ul>
      <li>
        <span>그</span>
        <span>런</span>
        <span> </span>
        <span>날</span>
        <span>이</span>
        <span> </span>
        <span>있</span>
        <span>을</span>
        <span>까</span>
        <span>요</span>
        <span>?</span>
      </li>
      <li>
        <span>두</span>
        <span> </span>
        <span>번</span>
        <span>째</span>
        <span> </span>
        <span>문</span>
        <span>장</span>
      </li>
    </ul>
    `
    document.querySelector('body').insertAdjacentHTML('beforeend', ul);

    // typingtext가 currentText보다 적을 때, 울림
    expect(window.alert).toHaveBeenCalledTimes(0);
    await userEvent.keyboard('{Enter}');
    expect(window.alert).toHaveBeenCalledTimes(1);

    rerenderComponent('01234567891');

    // typingtext가 currentText와 일치할 때, 울리지 않음
    expect(window.alert).toHaveBeenCalledTimes(1);
    await userEvent.keyboard('{Enter}');
    expect(window.alert).toHaveBeenCalledTimes(1);
  })

  describe('Dispatch type "CURSORMOVE"', () => {
    test('is called by Enter', async () => {
      const setTypingText = jest.fn();
      const setSentenceArr = jest.fn();
      const setTypingSentenceNum = jest.fn();
      let typingSentenceNum = 0

      const { rerender } = render(<TextInput
        typingtext={'그런 날이 있을까요?'}
        sentenceArr={[]}
        setTypingText={setTypingText}
        currentTextArr={currentTextArr}
        setSentenceArr={setSentenceArr}
        typingSentenceNum={typingSentenceNum}
        setTypingSentenceNum={setTypingSentenceNum} />
      )
      expect(dispatchMock).toHaveBeenCalledTimes(0);

      // 문장 넘김
      await userEvent.keyboard('{Enter}');
      const liTags = document.getElementsByTagName('li');
      const selectedLetterTag = liTags[typingSentenceNum + 1];
      const tagHeight = Number(selectedLetterTag.getBoundingClientRect().height.toFixed(2));
      expect(dispatchMock).toHaveBeenCalledWith({ type: 'CURSORMOVE', event: 'Enter', tagHeight });
      expect(dispatchMock).toHaveBeenCalledTimes(1);

      rerender(<TextInput
        typingtext={'두 번째 문장'}
        sentenceArr={['그런 날이 있을까요?']}
        setTypingText={setTypingText}
        currentTextArr={currentTextArr}
        setSentenceArr={setSentenceArr}
        typingSentenceNum={1}
        setTypingSentenceNum={setTypingSentenceNum} />
      )
      expect(dispatchMock).toHaveBeenCalledTimes(1);

      // 페이지 넘김
      await userEvent.keyboard('{Enter}')
      expect(dispatchMock).toHaveBeenCalledWith({ type: 'CURSORMOVE', event: 'Enter', tagTop: 0 });
      expect(dispatchMock).toHaveBeenCalledTimes(2);
    })

    test('is called by Backspace', async () => {
      const setTypingText = jest.fn();
      const setSentenceArr = jest.fn();
      const setTypingSentenceNum = jest.fn();

      jest.doMock('../textInput', () => () => {
        return <TextInput
          typingtext={'두 '}
          sentenceArr={["그런 날이 있을까요?"]}
          setTypingText={setTypingText}
          currentTextArr={currentTextArr}
          setSentenceArr={setSentenceArr}
          typingSentenceNum={1}
          setTypingSentenceNum={setTypingSentenceNum} />
      })

      render(<Sentence
        pageSheet={{ 0: currentTextArr }}
        pageSheetIdx={0}
        setIsFinished={() => { }}
        onEnterNextPage={() => { }} />
      )
      expect(dispatchMock).toHaveBeenCalledTimes(0);

      // 입력 글자 없는 상태, 문자 지우기 : tagWidth undefined, li 태그 식별 안 됨
      await userEvent.keyboard('{Backspace}');
      expect(dispatchMock).toHaveBeenCalledWith({ type: 'CURSORMOVE', event: 'Backspace', tagLeft: 0 });
      expect(dispatchMock).toHaveBeenCalledTimes(1);
    })

    test('is called by Typing(en)', async () => {
      const setTypingText = jest.fn();
      const setSentenceArr = jest.fn();
      const setTypingSentenceNum = jest.fn();

      jest.doMock('../textInput', () => () => {
        return <TextInput
          typingtext={''}
          sentenceArr={[]}
          setTypingText={setTypingText}
          currentTextArr={currentTextArr}
          setSentenceArr={setSentenceArr}
          typingSentenceNum={1}
          setTypingSentenceNum={setTypingSentenceNum} />
      })

      render(<Sentence
        pageSheet={{ 0: currentTextArr }}
        pageSheetIdx={0}
        setIsFinished={() => { }}
        onEnterNextPage={() => { }} />
      )
      expect(dispatchMock).toHaveBeenCalledTimes(0);

      // 문자 입력
      const txt = 'abcd'
      await userEvent.keyboard(txt)
      expect(dispatchMock).toHaveBeenCalledWith({ type: 'CURSORMOVE', event: 'Typing', tagWidth: 0 });
      expect(dispatchMock).toHaveBeenCalledTimes(txt.length);
    })

    test('RESET state', () => {
      const { result } = renderHook(() => useReducer(reducer, initialArg));
      const [state, dispatch] = result.current;

      expect(state.cursor.top).toBe(2);
      expect(state.cursor.left).toBe(0);
      act(() => dispatch({ type: "RESET" }));
      const [updateState] = result.current;
      expect(updateState.cursor.top).toBe(2);
      expect(updateState.cursor.left).toBe(0);
    })
    test('Typing state', async () => {
      const { result } = renderHook(() => useReducer(reducer, initialArg));
      const [state, dispatch] = result.current;
      let tagWidth = 10;

      expect(state.cursor.top).toBe(2);
      expect(state.cursor.left).toBe(0);
      act(() => dispatch({ type: 'CURSORMOVE', event: 'Typing', tagWidth }));
      const [updateState] = result.current;
      expect(updateState.cursor.top).toBe(2);
      expect(updateState.cursor.left).toBe(10);
    })
    test('Enter state', () => {
      const { result } = renderHook(() => useReducer(reducer, initialArg));
      const [state, dispatch] = result.current;
      let tagTop = 0;
      let tagHeight = 25.5;

      expect(state.cursor.top).toBe(2);
      expect(state.cursor.left).toBe(0);
      act(() => dispatch({ type: 'CURSORMOVE', event: 'Enter', tagHeight }));
      const [updateState1] = result.current;
      expect(updateState1.cursor.top).toBe(27.5);
      expect(updateState1.cursor.left).toBe(0);
      act(() => dispatch({ type: 'CURSORMOVE', event: 'Enter', tagTop }));
      const [updateState2] = result.current;
      expect(updateState2.cursor.top).toBe(2);
      expect(updateState2.cursor.left).toBe(0);
    })
    test('Backspace state', () => {
      const { result } = renderHook(() => useReducer(reducer, initialArg));
      const [state, dispatch] = result.current;
      let tagWidth = 10;

      expect(state.cursor.top).toBe(2);
      expect(state.cursor.left).toBe(0);
      act(() => dispatch({ type: 'CURSORMOVE', event: 'Backspace', tagWidth }));
      const [updateState] = result.current;
      expect(updateState.cursor.top).toBe(2);
      expect(updateState.cursor.left).toBe(-10);
    })
    test('Each of states', () => {
      const { result } = renderHook(() => useReducer(reducer, initialArg));
      const [state, dispatch] = result.current;
      let tagWidth = 10;
      let tagTop = 0;
      let tagHeight = 25.5;

      expect(state.cursor.top).toBe(2);
      expect(state.cursor.left).toBe(0);
      // 문자 입력 1
      act(() => dispatch({ type: 'CURSORMOVE', event: 'Typing', tagWidth }));
      const [updateState1] = result.current;
      expect(updateState1.cursor.top).toBe(2);
      expect(updateState1.cursor.left).toBe(10);
      // 문자 입력 2
      act(() => dispatch({ type: 'CURSORMOVE', event: 'Typing', tagWidth }));
      const [updateState2] = result.current;
      expect(updateState2.cursor.top).toBe(2);
      expect(updateState2.cursor.left).toBe(20);
      // 문자 지움
      act(() => dispatch({ type: 'CURSORMOVE', event: 'Backspace', tagWidth }));
      const [updateState3] = result.current;
      expect(updateState3.cursor.top).toBe(2);
      expect(updateState3.cursor.left).toBe(10);
      // 줄 바꿈
      act(() => dispatch({ type: 'CURSORMOVE', event: 'Enter', tagHeight }));
      const [updateState4] = result.current;
      expect(updateState4.cursor.top).toBe(27.5);
      expect(updateState4.cursor.left).toBe(0);
      // 페이지 바꿈
      act(() => dispatch({ type: 'CURSORMOVE', event: 'Enter', tagTop }));
      const [updateState5] = result.current;
      expect(updateState5.cursor.top).toBe(2);
      expect(updateState5.cursor.left).toBe(0);
    })
  })
})
