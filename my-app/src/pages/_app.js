import "@/styles/globals.css";
import { createContext, useReducer } from "react";

export const Context = createContext(null);

const initialArg = {
  time: '',
  accuracy: 0,
  typingSpeed: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case 'CALCULATE': {
      const { start, end, totalSentenceArr, pageSheet } = action
      const time = ((end - start) / 1000).toFixed(1);

      let wrongTextCount = 0;
      let totalTextLength = 0;
      for (let i = 0; i < Object.keys(pageSheet).length; i++) {
        // pageSheet와 동일하게 구조 변경 ->> [[pageSheet], [pageSheet]] 
        for (let j = 0; j < totalSentenceArr[i].length; j++) {
          console.log(totalSentenceArr, totalSentenceArr[i])
          for (let k = 0; k < totalSentenceArr[i][j].length; k++) {
            totalTextLength += 1
            if (pageSheet[i][j][k] === totalSentenceArr[i][j][k]) continue;
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
        typingSpeed
      };
    }
    case 'RESET': {
      return {
        time: '',
        accuracy: 0,
        typingSpeed: 0,
      }
    }
  }
}

export default function App({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, initialArg);
  return (
    <>
      <div className="wrap">
        <main className="main">
          <div className="framebox t">
            <div className="frame">
              <img src="./img/(left)point.png" />
            </div>
            <div className="frame">
              <img src="./img/(right)point.png" />
            </div>
          </div>
          <div className="content">
            <Context.Provider value={{ dispatch, state }}>
              <Component {...pageProps} />
            </Context.Provider>
          </div>
          <div className="framebox b">
            <div className="frame">
              <img src="./img/(left)btm-point.png" />
            </div>
            <div className="frame">
              <img src="./img/(right)btm-point.png" />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
