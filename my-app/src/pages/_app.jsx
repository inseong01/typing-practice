import '@/styles/globals.css';
import '@/styles/variables.css';
import Head from 'next/head';
import { createContext, useReducer } from 'react';

export const Context = createContext(null);

const initialArg = {
  time: null,
  accuracy: 0,
  typingSpeed: 0,
  cursor: {
    top: 2,
    left: 0,
  },
};

export function reducer(state, action) {
  switch (action.type) {
    case 'CALCULATE': {
      const { start, end, totalSentenceObj, pageSheet } = action;
      const totalPageCount = Object.keys(pageSheet).length;
      const pageSentenceLength = totalSentenceObj[i].length;
      const sentenceLength = totalSentenceObj[i][j].length;

      let wrongTextCount = 0;
      let totalTextCount = 0;
      for (let i = 0; i < totalPageCount; i++) {
        for (let j = 0; j < pageSentenceLength; j++) {
          for (let k = 0; k < sentenceLength; k++) {
            const originalLetter = pageSheet[i][j][k];
            const typedLetter = totalSentenceObj[i][j][k];
            totalTextCount += 1;
            if (originalLetter === typedLetter) continue;
            wrongTextCount += 1;
          }
        }
      }

      const time = ((end - start) / 1000).toFixed(1);
      const accuracy = Number((((totalTextCount - wrongTextCount) / totalTextCount) * 100).toFixed(1));
      const typingSpeed = Number(((totalTextCount / time) * 60).toFixed(1));

      return {
        ...state,
        time,
        accuracy,
        typingSpeed,
      };
    }
    case 'RESET': {
      document.documentElement.style.setProperty('--cursor-top', `2px`);
      document.documentElement.style.setProperty('--cursor-left', `0px`);
      return {
        ...state,
        time: null,
        accuracy: 0,
        typingSpeed: 0,
        cursor: {
          top: 2,
          left: 0,
        },
      };
    }
    case 'CURSORMOVE': {
      const { tagWidth, tagHeight, tagLeft, tagTop } = action;
      let cursorTopValue = state.cursor.top;
      let cursorLeftValue = state.cursor.left;

      switch (action.event) {
        case 'Typing': {
          cursorLeftValue += tagWidth;
          document.documentElement.style.setProperty('--cursor-top', `${cursorTopValue}px`);
          document.documentElement.style.setProperty('--cursor-left', `${cursorLeftValue}px`);
          return {
            ...state,
            cursor: {
              top: cursorTopValue,
              left: cursorLeftValue,
            },
          };
        }
        case 'Enter': {
          cursorTopValue = tagTop === 0 ? 2 : tagHeight + state.cursor.top;
          cursorLeftValue = 0;
          document.documentElement.style.setProperty('--cursor-top', `${cursorTopValue}px`);
          document.documentElement.style.setProperty('--cursor-left', `${cursorLeftValue}px`);
          return {
            ...state,
            cursor: {
              top: cursorTopValue,
              left: cursorLeftValue,
            },
          };
        }
        case 'Backspace': {
          cursorTopValue = state.cursor.top;
          cursorLeftValue = tagLeft === 0 ? tagLeft : state.cursor.left - tagWidth;
          document.documentElement.style.setProperty('--cursor-top', `${cursorTopValue}px`);
          document.documentElement.style.setProperty('--cursor-left', `${cursorLeftValue}px`);
          return {
            ...state,
            cursor: {
              top: cursorTopValue,
              left: cursorLeftValue,
            },
          };
        }
      }
    }
  }
}

export default function App({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, initialArg);
  return (
    <>
      <Head>
        <title>Typing-practice</title>
      </Head>
      <div className="wrap">
        <main className="main">
          <div className="framebox t">
            <div className="frame">
              <img src="/img/(left)point.png" />
            </div>
            <div className="frame">
              <img src="/img/(right)point.png" />
            </div>
          </div>
          <div className="content">
            <Context.Provider value={{ dispatch, state }}>
              <Component {...pageProps} />
            </Context.Provider>
          </div>
          <div className="framebox b">
            <div className="frame">
              <img src="/img/(left)btm-point.png" />
            </div>
            <div className="frame">
              <img src="/img/(right)btm-point.png" />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
