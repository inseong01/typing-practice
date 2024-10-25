import '@/styles/globals.css';
import '@/styles/variables.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { createContext, useEffect, useReducer } from 'react';

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
      const time = ((end - start) / 1000).toFixed(1);

      let wrongTextCount = 0;
      let totalTextLength = 0;
      for (let i = 0; i < Object.keys(pageSheet).length; i++) {
        for (let j = 0; j < totalSentenceObj[i].length; j++) {
          for (let k = 0; k < totalSentenceObj[i][j].length; k++) {
            totalTextLength += 1;
            if (pageSheet[i][j][k] === totalSentenceObj[i][j][k]) continue;
            wrongTextCount += 1;
          }
        }
      }
      const accuracy = Number((((totalTextLength - wrongTextCount) / totalTextLength) * 100).toFixed(1));
      const typingSpeed = Number(((totalTextLength / time) * 60).toFixed(1));
      return {
        ...state,
        accuracy,
        time,
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
