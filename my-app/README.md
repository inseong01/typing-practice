# 타자연습 개발 문서
이 문서는 타자연습 프로젝트 개발 내용을 설명합니다. 
## 목차
### 1. 이해하기
  1. **기능 소개**  
     - 초기화면
     - 입력화면
     - 결과화면
  2. **기능 작동 예시**  
      - 초기화면
        - 목차생성
        - 목차넘김
        - 목록이동
      - 입력화면
        - 문장생성
        - 오타표시
      - 결과화면
        - 결과측정
        - 다시하기
        - 돌아가기

  3. **JavaScript 활용 예시**  
      - 초기화면
        - 목차생성
        - 목차넘김
        - 목록이동
      - 입력화면
        - 문장생성
        - 오타표시
      - 결과화면
        - 결과측정
        - 다시하기
        - 돌아가기

### 2. 활용하기   
 - 초기화면
   - 목차생성
   - 목차넘김
   - 목록이동
 - 입력화면
   - 문장생성
   - 오타표시
 - 결과화면
   - 결과측정
   - 다시하기
   - 돌아가기 

### 3. 보완 사항
   - 에러 처리
   - 테스트 가이드

## 1. 이해하기
이 섹션은 타자연습 주요 기능과 작동 방식에 대해 설명합니다.   
### 1.1. 기능 소개
---
### 초기화면
---
초기화면은 `목차생성`, `목차넘김`, `목록이동` 기능을 제공합니다.

`목차생성`은 두 함수를 걸쳐 반환된 음악 목록, **목차**를 생성합니다. **getMusicList** 함수와 **getListPage** 함수를 활용합니다. **getMusicList** 함수는 `API`를 통해 데이터를 부여 받아 객체로 가공합니다. **getListPage** 함수는 페이지 별 목록 개수를 지정하여 음악 목록 페이지 배열을 반환합니다.    

`목차넘김`은 목차 페이지를 이전, 이후로 이동합니다. **목차** 길이를 초과, 미만의 페이지로 이동할 수 없습니다.

`목록이동`은 선택한 목록으로 이동합니다. `문장생성`이 되어 있지 않은 목록은 `목록이동`이 제한됩니다.

### 입력화면
---
입력화면은 `문장생성`, `오타표시` 기능을 제공합니다.    

`문장생성`은 하나의 함수를 거쳐 문장을 생성합니다. **splitLyric** 함수는 가사를 인자로 받습니다. 가사는 문장으로, 문장은 문자로 분할되어 페이지 당 지정한 문장 수를 배열로 가진 객체로 반환합니다. 반환된 객체는 페이지 숫자를 **key**로 가지고 있습니다. 페이지 숫자에 맞춰 해당 **key**가 가진 문장 배열을 화면에 생성합니다.

`오타표시`는 생성된 문자와 입력한 문자의 일치를 나타냅니다. 입력한 문자와 입력하고 있는 문자, 두 종류의 경우로 구분하여 문자 일치여부를 확인합니다. 일치 여부에 따라 지정한 **className**을 부여합니다. 


### 결과화면
---
결과화면은 `결과측정`, `다시하기`, `돌아가기` 기능을 제공합니다.    

`결과측정`은 **타수**, **정확도**, **소요시간**을 측정합니다. `입력화면`에서 사용자가 문자를 입력할 때부터 마지막 문자를 입력했을 때까지의 문자열과 시간을 기록합니다. 계산과정을 거쳐 **결과화면**으로 이동하여 사용자에게 측정 결과를 보여줍니다. 

`다시하기`는 입력 완료한 주제를 다시 시작합니다. `결과측정`을 초기화하여 **입력화면** 첫 페이지로 이동합니다.

`돌아가기`는 **초기화면**으로 이동합니다.

### 1.2. 기능 작동 예시
---
: 기능 동작 예시, 사진/gif 첨부

<h3>초기화면</h3>
<p>
  <b>목차생성</b>
</p>
<p>
  <b>목차넘김</b>
</p>
<p>
  <b>목록이동</b>
</p>

---
<h3>입력화면</h3>
<p>
  <b>문장생성</b>
</p>
<p>
  <b>오타표시</b>
</p>

---
<h3>결과화면</h3>
<p>
  <b>결과측정</b>
</p>
<p>
  <b>다시하기</b>
</p>
<p>
  <b>돌아가기</b>
</p>

![](.gif)

### 1.3. JavaScript 활용 예시
---
: javascript 코드 안내 링크 연결, 링크 목록

| 개발 플랫폼  |  기능  |           참고           |
| :---------: | :----: | :----------------------: |
|      -      |   -    |       [ 예제 ](#)        |
|      -      |   -    |       [ 예제 ](#)        |
|      -      |   -    |       [ 예제 ](#)        |
|      -      |   -    |       [ 예제 ](#)        |

## 2. 활용하기  
이 섹션은 JavaScript를 사용한 타자연습 기능 구현 방법을 안내합니다.   

*코드의 가독성을 위해 JSX 컴포넌트의 props, 태그 속성은 생략되었습니다.*
### 2.1. 초기화면
---
### 2.1.1. 목차생성
이번 차례는 목차생성 기능을 안내합니다.

- 요청    

  ```javascript
  // createSwiper.jsx
  const list = getMusicList(top100);
  const page = getListPage(list);

  export default function CreateSwiper() {
    const [pageNumber, setPageNumber] = useState(0);
    return (
        ...
        <SwiperSlides item={page[pageNumber]} />
        ...
    );
  }
  ```
  ```javascript
  // swiperSlides.jsx
  export default function SwiperSlides({ item }) {
    return (
      ...
        {item.map((value, idx) => {
          const { 
            currentRank, 
            artists, 
            trackTitle
            } = value;
          const artistsName = artists.map((value) => value.artistName);
          return (
              <div>
                <div>
                  {currentRank}
                </div>
                <div>
                  <div>
                    {trackTitle}
                  </div>
                  <div>
                    {artistsName}
                  </div>
                </div>
              </div>
          );
        })}
      ...
    );
  }
  ```
- 반응    
  **item** 인자가 가지고 있는 배열 길이 만큼 레이어가 생성됩니다. **page[pageNumber]** 는 **page** 객체의 `key-value`를 나타냅니다. **pageNumber** 변수가 증가하면 다음 페이지 배열을 전달합니다. 

- 활용    

  - 실시간 차트 반영    
  **createSwiper.jsx**에서 `API`를 호출하여 매 접속마다 목차를 실시간으로 생성할 수 있습니다. **getMusicList** 함수 인자를 `API` 반응값으로 할당할 수 있습니다. 

    > 음원 사이트 API 호출 경로가 필요합니다.

### 2.1.2. 목차넘김
이번 차례는 목차넘김 기능을 안내합니다.

- 요청    

  ```javascript
  // createSwiper.jsx
  ...
  export default function CreateSwiper() {
    const [pageNumber, setPageNumber] = useState(0);

    function onClickNextPage() {
      if (pageNumber < page.length - 1) {
        setPageNumber((num) => num + 1);
      }
    }

    function onClickPrevPage() {
      if (pageNumber > 0) {
        setPageNumber((num) => num - 1);
      }
    }
    return (
      ...
          <SwiperSlides item={page[pageNumber]} />
          <div onClick={onClickPrevPage}>
            <img src="./img/prev_btn.png"/>
          </div>
          <div onClick={onClickNextPage}>
            <img src="./img/next_btn.png"/>
          </div>
      ...
    );
  }
  ```
- 반응    
  **onClickPrevPage**, **onClickNextPage** 함수는 **pageNumber** 숫자를 증가시키거나 감소시킵니다. 각 함수에 부여된 조건은 **page** 객체 변수의 최대 길이, 최소 길이를 넘지 않도록 합니다.     
  > **page**의 길이는 객체 **key**의 개수입니다. 

### 2.1.3. 목록이동
이번 차례는 목록이동 기능을 안내합니다.   

- 요청    

  ```javascript
  // swiperSlides.jsx
  import Link from 'next/link';

  export default function SwiperSlides({ item }) {
    return (
      ...
        {item.map((value, idx) => {
          ...
          return (
            <Link href={`/music/${trackId}`} key={idx}>
              <div>
                <div>
                  {currentRank}
                </div>
                <div>
                  <div>
                    {trackTitle}
                  </div>
                  <div>
                    {artistsName}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      ...
    );
  }
  ```
  ```javascript
  // src/pages/music/[id].jsx
  export const getServerSideProps = async (data) => {
    const trackId = await data.query.id;
    const music = await musicList.find((item) => item.trackId === Number(trackId));
    const artistName = await music.artists.map((value) => value.artistName);

    if (music.lyric.length === 0) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    return { props: { trackId, music, artistName } };
  };

  export default function Page({ trackId, music, artistName }) {
    ...
  }
  ```
- 반응    
  `<Link>` 태그는 지정한 **herf**로 이동시킵니다. `music/${trackId}` 주소는 `pages/music` 폴더의 `trackId.jsx` 파일을 실행합니다. `trackId`는 사용자의 선택에 따라 변경됨으로 **경로 파라미터** 동적 할당을 허용해야 합니다. `[id]` 파일명으로 파일을 생성하여 경로 동적할당을 허용할 수 있습니다. 또한 `[id].jsx` 파일은 현재 **url**에 접근할 수 있습니다.    

  음악 가사가 없다면 초기화면으로 이동, 입력화면으로 진입하지 않습니다. 

  `<Link>` 태그는 `DOM`에서 `<a>` 태그로 표시됩니다. 

- 활용    
  **href** 링크를 지정하여 원하는 파일링크로 이동할 수 있습니다. 
  > [Next 라우팅 공식 문서 참고](https://nextjs.org/docs/app/building-your-application/routing/pages) 

### 2.2. 입력화면
---
### 2.2.1. 문장생성
이번 차례는 문장생성 기능을 안내합니다.   

- 초기설정    

  ```javascript
  // src/pages/music/[id].jsx
  export const getServerSideProps = async (data) => {
    const trackId = await data.query.id;
    const music = await musicList.find((item) => item.trackId === Number(trackId));
    const artistName = await music.artists.map((value) => value.artistName);
    const pageSheet = splitLyric(music);
    ...
    return { props: { trackId, music, artistName, pageSheet } };
  };

  export default function Page({ trackId, music, artistName, pageSheet }) {
    ...
  }
  ```
- 요청    
  ```javascript  
  // src/pages/music/[id].jsx
  ...
  export default function Page({ music, artistName, pageSheet }) {
    const [pageSheetIdx, setPageSheetIdx] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    ...
    switch (isFinished) {
      case true: {
        return (
          <ResultPage/>
        );
      }
      case false: {
        return (
          <>
            {pageSheetIdx === 0 ? (
              <div>
                <h1>{music.trackTitle}</h1>
                <p>{artistName}</p>
                <Sentence pageSheet={pageSheet} pageSheetIdx={pageSheetIdx} />
                <div>
                  <p>
                    {pageSheetIdx + 1} / {Object.keys(pageSheet).length}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <Sentence pageSheet={pageSheet} pageSheetIdx={pageSheetIdx} />
                <div>
                  <p>
                    {pageSheetIdx + 1} / {Object.keys(pageSheet).length}
                  </p>
                </div>
              </div>
            )}
          </>
        );
      }
    }
  }
  ```
  ```javascript
  // sentence.jsx
  export default function Sentence({ pageSheet, pageSheetIdx }) {
    ...
    return (
      <>
        <ul>
          {pageSheet[pageSheetIdx].map((ly, i) => <Lyric_li ly={ly} />)}
        </ul>
        <label>
          <TextInput/>
        </label>
      </>
    );
  }
  ```
  ```javascript
  // lyric_li.jsx
  export default function Lyric_li({ ly }) {
    return (
      <li>
        {ly.map((txt, idx) => <Letter>{txt}</Letter>)}
      </li>
    );
  }
  ```
  ```javascript
  // letter.jsx
  export default function Letter({ children }) {
    ...
    return children === '\n' ? <br/> : <span>{children}</span>
  }
  ```
- 반응    
  **pageSheet** 변수는 **splitLyric** 함수가 반환한 각 페이지 별 문장을 문자 배열로 가지고 있는 객체입니다. `[['안', '녕', '하', '세', '요'], ...]`  

  **splitLyric** 함수는 **trackId**와 일치하는 음악을 인자로 받아 제한한 문장 수에 맞춰 페이지 별로 객체를 생성합니다. *첫 페이지 29줄, 이후 34줄*

  **isFinished** 변수가 참이면 `<ResultPage/>` 컴포넌트를, 그렇지 않으면 `<Sentence/>` 컴포넌트를 실행합니다. **isFinished** 변수가 거짓이고 **pageSheetIdx** 변수가 `0`이라면, 첫 페이지 구성을 출력합니다. `0`이 아니라면 **pageSheet** 객체가 가지고 있는 배열 수 만큼 문장을 출력합니다. *최대 34줄*

  `<Lyric_li/>` 컴포넌트는 하나의 문장을 만듭니다. 배열 요소를 인자로 받는 `<Letter/>` 컴포넌트는 줄바꿈을 판별하여 하나의 문자를 태그로 출력합니다. 완성된 페이지는 모든 문자가 태그로 감싸져 있는 구조로 구성됩니다.

### 2.2.2. 오타표시
이번 차례는 오타표시 기능을 안내합니다.   

- 초기설정    
  ```javascript
  // sentence.jsx
  export default function Sentence({ pageSheet, pageSheetIdx }) {
    const [typingtext, setTypingText] = useState('');
    const [typingSentenceNum, setTypingSentenceNum] = useState(0);
    const [sentenceArr, setSentenceArr] = useState([]);
    ...
    return (
      <>
        <ul>
          {pageSheet[pageSheetIdx].map((ly, i) => {
            return (
              <Lyric_li
                ly={ly}
                typingtext={typingtext}
                sentenceArr={sentenceArr}
                lyricSentenceNum={i}
                typingSentenceNum={typingSentenceNum}
              />
            );
          })}
        </ul>
        <label>
          <TextInput/>
        </label>
      </>
    );
  }
  ```
  ```javascript
  // lyric_li.jsx
  export default function Lyric_li({ 
      ly, 
      typingtext, 
      sentenceArr 
      typingSentenceNum, 
      lyricSentenceNum, 
    }) {
    return (
      <li>
        {ly.map((txt, idx) => {
          return (
            <Letter
              typingtext={typingtext[idx]}
              sentenceArr={sentenceArr}
              lyricTextNum={idx}
              lyricSentenceNum={lyricSentenceNum}
              typingSentenceNum={typingSentenceNum}
            >
              {txt}
            </Letter>
          );
        })}
      </li>
    );
  }
  ```
- 요청    
  ```javascript
  // letter.jsx
  export default function Letter({ 
      children, 
      typingtext, 
      typingSentenceNum, 
      lyricSentenceNum, 
      lyricTextNum, 
      sentenceArr 
    }) {
    const cssName =
      typingtext && lyricSentenceNum === typingSentenceNum ? 
      (typingtext === children ? styles.correct : styles.wrong) : '';

    const strCssName = sentenceArr[lyricSentenceNum]
      ? sentenceArr[lyricSentenceNum][lyricTextNum] === children
        ? styles.correct
        : styles.wrong
      : cssName;
    return children === '\n' ? <br/> : <span className={strCssName}>{children}</span>
  }
  ```
- 반응    
  문자를 입력하면 입력한 문자가 있는지 **sentenceArr[lyricSentenceNum]** 변수를 확인한다.   
  
  해당 문장에 입력한 문자가 없다면 **cssName** 변수를 실행한다. 현재 입력한 문자가 있고 가사 문장 인덱스와 입력중인 문장 인덱스가 동일하다면 입력한 **typingtext** 문자가 기존 문자와 일치하는지 판별한다.    

  입력한 문장이 있다면 기존 문자와 입력한 문자와 일치여부를 판별한다.
  > \<TextInput/> 컴포넌트에서 Enter 이벤트 발생    
  > Enter를 누르면 sentenceArr 변수에 문장 삽입, 페이지 증가, 페이지 넘어가면 sentenceArr 초기화   
  >> **typingSentenceNum**은 \<Sentence/> 컴포넌트가 생성될 때마다 초기값 `0`으로 할당된다. 다음 페이지로 넘어가면 초기화 되어, **sentenceArr**의 첫번째 문장부터 확인한다.

  기존 문자와 입력 문자가 동일하면 **styles.correct**, 아니면 **styles.wrong** 변수를 **className**으로 부여한다. *문자열 X*
  > [Next 스타일링 공식 문서 참고](https://nextjs.org/docs/app/building-your-application/styling/css-modules)   
  

### 2.3. 결과화면
---
### 2.3.1. 결과측정
이번 차례는 결과측정 기능을 안내합니다.   

- 초기설정    
  ```javascript
  // pages/_app.jsx
  export const Context = createContext(null);

  const initialArg = {
    time: null,
    accuracy: 0,
    typingSpeed: 0,
  };
  function reducer(state, action) {
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
        const accuracy = Number(
          (((totalTextLength - wrongTextCount) / totalTextLength) * 100)
          .toFixed(1));
        const typingSpeed = Number(
          ((totalTextLength / time) * 60).toFixed(1)
          );

        return {
          ...state,
          accuracy,
          time,
          typingSpeed,
        };
      }
      ...
    }
  }

  export default function App({ Component, pageProps }) {
    const [state, dispatch] = useReducer(reducer, initialArg);
    return (
      ...
        <Context.Provider value={{ dispatch, state }}>
          <Component {...pageProps} />
        </Context.Provider>
      ...
    );
  }
  ```
  ```javascript  
  // src/pages/music/[id].jsx
  ...
  export default function Page({ music, artistName, pageSheet }) {
    const [pageSheetIdx, setPageSheetIdx] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    
    function onEnterNextPage() {
      if (pageSheetIdx < Object.keys(pageSheet).length - 1) {
        setPageSheetIdx((prev) => prev + 1);
      }
    }

    switch (isFinished) {
      case true: {
        return (
          <ResultPage 
            music={music} 
            artistName={artistName}
            setIsFinished={setIsFinished} 
            setPageSheetIdx={setPageSheetIdx} 
          />
        );
      }
      case false: {
        return (
          <>
            {pageSheetIdx === 0 ? (
              <div>
                <h1>{music.trackTitle}</h1>
                <p>{artistName}</p>
                <Sentence 
                  pageSheet={pageSheet} 
                  pageSheetIdx={pageSheetIdx} 
                  setIsFinished={setIsFinished} 
                  onEnterNextPage={onEnterNextPage} 
                />
                <div>
                  <p>
                    {pageSheetIdx + 1} / {Object.keys(pageSheet).length}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <Sentence 
                  pageSheet={pageSheet} 
                  pageSheetIdx={pageSheetIdx} 
                  setIsFinished={setIsFinished} 
                  onEnterNextPage={onEnterNextPage} 
                />
                <div>
                  <p>
                    {pageSheetIdx + 1} / {Object.keys(pageSheet).length}
                  </p>
                </div>
              </div>
            )}
          </>
        );
      }
    }
  }
  ```
  ```javascript
  // textInput.jsx
  export default function TextInput({ 
      typingtext, 
      setTypingText, 
      currentTextArr, 
      setSentenceArr, 
      setTypingSentenceNum 
    }) {
    return (
      <input
        id="textInput"
        type="text"
        name="textInput"
        value={typingtext}
        autoFocus
        onChange={(e) => setTypingText(e.target.value)}
        onKeyUp={(e) => {
          switch (e.key) {
            case 'Enter': {
              if (
                currentTextArr.length === typingtext.length ||
                (currentTextArr[0] === '\n' && typingtext === '')
              ) {
                setSentenceArr((prev) => [...prev, typingtext]);
                setTypingSentenceNum((prev) => prev + 1);
                setTypingText('');
                break;
              } else if (
                currentTextArr.length > typingtext.length ||
                currentTextArr.length < typingtext.length
              ) {
                alert('문장 전체를 입력해주세요');
                break;
              }
            }
          }
        }}
      />
    );
  }
  ```
  ```javascript
  // sentence.jsx
  import { Context } from '@/pages/_app';

  let start = null;
  let isFirstTime = true;
  let totalSentenceObj = {};

  export default function Sentence({ pageSheet, pageSheetIdx, setIsFinished, onEnterNextPage }) {
    const [typingtext, setTypingText] = useState('');
    const [typingSentenceNum, setTypingSentenceNum] = useState(0);
    const [sentenceArr, setSentenceArr] = useState([]);
    const { dispatch, state } = useContext(Context);

    useEffect(() => {
      if (sentenceArr.length === 0) return;
      // 한 페이지 작성 완료했을 때
      if (sentenceArr.length === pageSheet[pageSheetIdx].length) {
        totalSentenceObj[pageSheetIdx] = sentenceArr;
        setSentenceArr([]);
        onEnterNextPage();
      }

      // 모든 페이지 작성 완료했을 때
      if (
        sentenceArr.length === pageSheet[pageSheetIdx].length &&
        Object.keys(pageSheet).length === pageSheetIdx + 1
      ) {
        setIsFinished(true);
        const end = Date.now();
        dispatch({ type: 'CALCULATE', start, end, totalSentenceObj, pageSheet });
        totalSentenceObj = {};
        start = null;
        isFirstTime = true;
      }
    }, [sentenceArr]);

    useEffect(() => {
      if (!isFirstTime || !typingtext) return;
      start = Date.now();
      isFirstTime = false;
    }, [typingtext]);

    return (
      <>
        <ul>
          {pageSheet[pageSheetIdx].map((ly, i) => <Lyric_li/>)}
        </ul>
        <label htmlFor="textInput">
          <TextInput
            typingtext={typingtext}
            setTypingText={setTypingText}
            setSentenceArr={setSentenceArr}
            setTypingSentenceNum={setTypingSentenceNum}
            currentTextArr={pageSheet[pageSheetIdx][typingSentenceNum]}
          />
        </label>
      </>
    );
  }
  ```

- 요청    
  ```javascript
  import { Context } from '@/pages/_app';

  export default function ResultPage({ music, artistName }) {
    const { state } = useContext(Context);
    ...
    return (
      ...
        <h1>{music.trackTitle}</h1>
        <p>{artistName}</p>
        <ul>
          <li>타수: {state.typingSpeed}</li>
          <li>정확도: {state.accuracy}%</li>
          <li>소요 시간: {state.time}초</li>
        </ul>
      ...
    );
  }
  ```

- 반응    
  **sentenceArr** 변수는 한 페이지에서 입력한 문장의 배열이다. 배열 요소가 삽입될 때마다 `useEffect`가 실행된다. 마지막 페이지에서 입력한 문장 수가 기존 문장 수와 동일하고 현재 페이지가 마지막이라면 **isFinished** 변수를 `true`로 변환한다. 기록된 인자들은 **dispatch** 함수에 할당된다. `_app.jsx` 파일에서 **dispatch** 함수가 실행되고 함수에 할당된 변수들은 초기화 된다. 이후 `<ResultPage/>` 컴포넌트 화면에서 측정값이 표시된다. 

  **dispatch** 결과값은 `useContext`를 활용하여 전역에서 가져올 수 있다. `_app.jsx` 파일에서 전역 변수로 **dispatch**, **state**를 할당하고 있다.


### 2.3.2. 다시하기
이번 차례는 다시하기 기능을 안내합니다.   

- 초기설정    

  ```javascript
  // pages/_app.jsx
  export const Context = createContext(null);

  const initialArg = {
    time: null,
    accuracy: 0,
    typingSpeed: 0,
  };
  function reducer(state, action) {
    switch (action.type) {
      ...
      case 'RESTART': {
        return {
          time: null,
          accuracy: 0,
          typingSpeed: 0,
        };
      }
    }
  }

  export default function App({ Component, pageProps }) {
    const [state, dispatch] = useReducer(reducer, initialArg);
    return (
      <>
        ...
          <Context.Provider value={{ dispatch, state }}>
            <Component {...pageProps} />
          </Context.Provider>
        ...
      </>
    );
  }
  ```

- 요청    

  ```javascript
  import { Context } from '@/pages/_app';

  export default function ResultPage({ setIsFinished, setPageSheetIdx }) {
    const { dispatch, state } = useContext(Context);
    ...
    function reset() {
      dispatch({ type: 'RESTART' });
      setIsFinished(false);
      setPageSheetIdx(0);
    }

    return (
      ...
        <ul>
          <li onClick={reset} title="try again">
            다시하기
          </li>
          <li>
            돌아가기
          </li>
        </ul>
      ...
    );
  }
  ```
- 반응    
  다시하기 글자를 선택하면 `onClick` 이벤트가 동작하여 **reset** 함수가 실행됩니다. 기존 계산한 측정값을 초기화 하고 `결과화면`을 `입력화면`으로 전환합니다. **pageSheetIdx**를 `0`으로 할당하여 첫 페이지부터 작성하도록 설정합니다.   

### 2.3.3. 돌아가기
이번 차례는 돌아가기 기능을 안내합니다.   

- 요청    

  ```javascript
  import { useRouter } from 'next/router';

  export default function ResultPage() {
    const router = useRouter();
    ...
    return (
      ...
        <ul>
          <li>
            다시하기
          </li>
          <li onClick={() => router.back()} title="go back">
            돌아가기
          </li>
        </ul>
      ...
    );
  }
  ```
- 반응    
  돌아가기 글자를 선택하면 `onClick` 이벤트가 동작하여 **router.back()** 함수가 실행됩니다. 이전 페이지인 `초기화면`으로 이동합니다.

- 활용    
  `useRouter()`를 활용하여 다른 링크로 이동하는 기능을 추가할 수 있습니다.
  > [Next useRouter 공식 문서 참고](https://nextjs.org/docs/app/api-reference/functions/use-router)

## 3. 보완 사항 
이 섹션은 타자연습 보완 사항에 대해 설명합니다.   
### 3.1. 에러 처리
---
이번 차례는 에러 처리를 안내합니다.   

### NextRouter was not mounted    
---
`Next Router`가 동작하지 않을 때 발생하는 오류입니다.     
테스트를 실행할 때 발생할 수 있습니다.    
**useRouter** 함수를 모킹하거나 **getServerSideProps** 함수를 모킹하여 해결할 수 있습니다. 

```javascript
// id.test.js
import { getServerSideProps } from '@/pages/music/[id]';

describe('[id] DOM check test : ', () => {
  let trackId;
  let props;

  beforeEach(async () => {
    trackId = { query: { id: 83681270 } };
    const data = await getServerSideProps(trackId)
    props = data.props;
  })
  ...
})
```

> [Next Errors 공식 문서 참고](https://nextjs.org/docs/messages/next-router-not-mounted)

### ESLint: Failed to load config "next/babel" to extend from.    
---
`ESLint "next/babel"`을 불러오지 못할 때 발생하는 오류입니다.    
프로젝트를 빌드할 때 발생할 수 있습니다.    

****next/babel****을 ****next****로 수정하여 해결할 수 있습니다.

**.eslinttrc.json 파일수정** 
```
{
  "extends": ["next", "next/core-web-vitals"]
}
```

### Parsing error: You appear to be using a native ECMAScript module configuration file,    
---
파일 내용을 분석할 때 발생하는 오류입니다.    
**.eslinttrc.json** 파일에서 `next/babel`을 `next`로 수정하고 빌드할 때 발생할 수 있습니다.  

루트 디렉터리에 **.babelrc** 파일을 추가하여 해결할 수 있습니다.

**.babelrc 파일생성**
```
{ 
  "presets": ["next/babel"], "plugins": []
}
```
> [Next babel 공식 문서 참고](https://nextjs.org/docs/pages/building-your-application/configuring/babel)

### eslintrc.cjs to a dynamic import() which is available in all CommonJS modules.
---
**eslintrc** 파일을 불러오는 유형이 일치하지 않을 때 발생하는 오류입니다.   
프로젝트를 빌드할 때 **package.json, type: module**일 때 발생할 수 있습니다.

`ESlint`는 **commonJS** 방식을 사용하기 때문에 **type: module** 방식으로 불러올 수 없습니다.    
`eslintrc.cjs` 파일을 동적 호출로 변경하면 `eslintrc.cjs` 내부 변수가 인식되지 않아 또 다른 오류를 발생합니다.    

`ESlint` 빌드 오류는 `next.config.mjs` 파일에 변수를 추가하여 해결할 수 있습니다.
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  }
};
export default nextConfig;
```

### ESLint: Invalid Options: - Unknown options: useEslintrc, extensions - 'extensions' has been removed.    
---
`ESLint` 옵션을 인식하지 못할 때 발생하는 오류입니다.   
`ESLint` 최신 버전일 때 발생할 수 있습니다.     

이전 버전으로 설치하여 해결할 수 있습니다.
```
npm remove eslint
```
```
npm install eslint^8
```

### 3.2. 테스트 가이드
---
이번 차례는 테스트 및 디버깅 가이드를 안내합니다.   
테스트 도구로 `Jest`를 사용합니다.

### 테스트 파일 구조
---
테스트 하고자 하는 파일이 존재하는 디렉터리에 `test` 디렉터리를 생성합니다.   
`test` 디렉터리에서 테스트 파일을 생성합니다.

- **test 디렉터리 생성 전**

  ```
  ㄴsrc
    ㄴcomponents
        ㄴ0.jsx
        ㄴ1.jsx
  ```
- **test 디렉터리 생성 후**

  ```
  ㄴsrc
    ㄴcomponents
        ㄴtest
            ㄴ0.test.js
            ㄴ1.test.js
        ㄴ0.jsx
        ㄴ1.jsx
  ```

### 테스트 파일 명명 규칙
---
- **단위 테스트**: `*.unit.test.js`  
  개별 컴포넌트나 함수의 단일 기능을 테스트합니다.

- **통합 테스트**: `*.integration.test.js`  
  여러 모듈이 함께 동작하는지를 확인하는 테스트입니다.


### 테스트 실행 방법
---
- **테스트 실행**

  ```
  npm run test // 모든 테스트 파일 실행
  ```
- **특정 파일 테스트 실행**

  ```
  npm run test 0 // '0' 문자 가지고 있는 테스트 파일 모두 실행
  ```
- **유닛 테스트 실행**

  ```
  npm run test:unit
  ```
- **통합 테스트 실행**

  ```
  npm run test:integration
  ```

### 테스트 유형
---
### 단위 테스트   
- 목적: 각 개별 모듈 또는 함수가 의도된 대로 동작하는지 확인.   
- 항목: 태그 존재, 클래스명 일치, 함수 동작 정상 여부