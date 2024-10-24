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
      - 입력화면
      - 결과화면
  3. **JavaScript 활용 예시**  
      - 초기화면
        - 목차생성
        - 목차넘김
        - 목록이동
      - 입력화면
        - 문장생성
        - 오타표시
        - 커서표시
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
   - 커서표시
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
입력화면은 `문장생성`, `오타표시`, `커서표시` 기능을 제공합니다.    

`문장생성`은 하나의 함수를 거쳐 문장을 생성합니다. **splitLyric** 함수는 가사를 인자로 받습니다. 가사는 문장으로, 문장은 문자로 분할되어 페이지 당 지정한 문장 수를 배열로 가진 객체로 반환합니다. 반환된 객체는 페이지 숫자를 **key**로 가지고 있습니다. 페이지 숫자에 맞춰 해당 **key**가 가진 문장 배열을 화면에 생성합니다.

`오타표시`는 생성된 문자와 입력한 문자의 일치를 나타냅니다. 입력한 문자와 입력하고 있는 문자, 두 종류의 경우로 구분하여 문자 일치여부를 확인합니다. 일치 여부에 따라 지정한 **className**을 부여합니다. 

`커서표시`는 현재 입력할 문자를 표시합니다. `input` 속성을 이용하여 발생한 이벤트에 따라 **커서**가 움직입니다. **커서**는 **top**과 **left**의 `css` 속성에 변수가 적용되어 `Javascript`에서 픽셀값이 변동됩니다. 

### 결과화면
---
결과화면은 `결과측정`, `다시하기`, `돌아가기` 기능을 제공합니다.    

`결과측정`은 **타수**, **정확도**, **소요시간**을 측정합니다. `입력화면`에서 사용자가 문자를 입력할 때부터 마지막 문자를 입력했을 때까지의 문자열과 시간을 기록합니다. 계산과정을 거쳐 **결과화면**으로 이동하여 사용자에게 측정 결과를 보여줍니다. 

`다시하기`는 입력 완료한 주제를 다시 시작합니다. `결과측정`을 초기화하여 **입력화면** 첫 페이지로 이동합니다.

`돌아가기`는 **초기화면**으로 이동합니다.

### 1.2. 기능 작동 예시
---

<h3>초기화면</h3>
<p>
  <b>목차생성, 목차넘김</b>
</p>

![](../src/gif/next%20page.gif)

<p>
  <b>목록이동</b>
</p>

![](../src/gif/link.gif)

---
<h3>입력화면</h3>
<p>
  <b>문장생성, 오타표시, 커서이동</b>
</p>

![](../src/gif/typingScreen2.gif)


---
<h3>결과화면</h3>
<p>
  <b>결과측정</b>
</p>

![](../src/gif/resultpage.gif)

<p>
  <b>다시하기</b>
</p>

![](../src/gif/again.gif)

<p>
  <b>돌아가기</b>
</p>

![](../src/gif/prevpage.gif)


### 1.3. JavaScript 활용 예시
---

| 개발 플랫폼  | 분류 |  기능  |           참고           |
| :---------: | :----: | :---: | :----------------------: |
|  Javascript | 초기화면  | 목차생성 |     [ 예제 ](#211-목차생성)        |
|      -      |     -    | 목차넘김 |     [ 예제 ](#212-목차넘김)        |
|      -      |     -    | 목록이동 |     [ 예제 ](#213-목록이동)        |
|      -      |  입력화면 | 문장생성 |     [ 예제 ](#221-문장생성)        |
|      -      |     -    | 오타표시 |     [ 예제 ](#222-오타표시)        |
|      -      |     -    | 커서표시 |     [ 예제 ](#223-커서표시)        |
|      -      |  결과화면 | 결과측정 |     [ 예제 ](#231-결과측정)        |
|      -      |     -    | 다시하기 |     [ 예제 ](#232-다시하기)        |
|      -      |     -    | 돌아가기 |     [ 예제 ](#233-돌아가기)        |

## 2. 활용하기  
이 섹션은 JavaScript를 사용한 타자연습 기능 구현 방법을 안내합니다.   

*코드의 가독성을 위해 필요한 JSX 컴포넌트의 props만 작성되었고 태그 속성은 생략되었습니다.*
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

### 2.2.3. 커서표시
이번 차례는 커서표시 기능을 안내합니다.   

- 초기설정
  ```css
  /* /styles/variables.css */
  :root {
    --cursor-top: 2px;
    --cursor-left: 0px;
  }
  ```
  ```javascript
  import '@/styles/variables.css';

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
      ...
      case 'CURSORMOVE': {
        const { tagWidth, tagHeight, tagLeft, tagTop } = action;
        let cursorTopValue = state.cursor.top;
        let cursorLeftValue = state.cursor.left;
        switch (action.event) {
          case 'Typing': {
            cursorLeftValue += tagWidth;
            document.documentElement
              .style.setProperty('--cursor-top', `${cursorTopValue}px`);
            document.documentElement
              .style.setProperty('--cursor-left', `${cursorLeftValue}px`);
            return {
              ...state,
              cursor: {
                top: cursorTopValue,
                left: cursorLeftValue,
              },
            };
          }
          case 'Enter': {
            cursorTopValue = tagTop === 0 ? 
              2 : tagHeight + state.cursor.top;
            cursorLeftValue = 0;
            document.documentElement
              .style.setProperty('--cursor-top', `${cursorTopValue}px`);
            document.documentElement
              .style.setProperty('--cursor-left', `${cursorLeftValue}px`);
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
            cursorLeftValue = tagLeft === 0 ? 
              tagLeft : state.cursor.left - tagWidth;
            document.documentElement
              .style.setProperty('--cursor-top', `${cursorTopValue}px`);
            document.documentElement
              .style.setProperty('--cursor-left', `${cursorLeftValue}px`);
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
  ```

- 요청    
  ```javascript
  // textInput.jsx
  import { Context } from '@/pages/_app';

  let isFull = false;
  let composedText = '';

  export default function TextInput({
    typingtext,
    sentenceArr,
    setTypingText,
    currentTextArr,
    setSentenceArr,
    typingSentenceNum,
    setTypingSentenceNum,
  }) {
    const { dispatch, state } = useContext(Context);

    return (
      <input
        ...
        onChange={...}
        onKeyDown={...}
        onCompositionStart={...}
        onCompositionUpdate={...}
        onCompositionEnd={...}
      />
    );
  }
  ```
- 반응    
  문자를 입력하면 언어에 따라 해당 이벤트가 작동합니다.    

  ```
  영문: onKeyDown
  조합형 입력 문자: onComposition 예) 한글, 중국어, 일본어
  ```

  **커서**는 색상이 변한 문자 다음에 위치해야 합니다. **커서**는 이벤트가 작동하면 입력되어야 할 문자의 크기 만큼 이동합니다. 문자는 태그로 감싸져 있어, 태그는 문자 만큼의 너비를 가지고 있습니다. 태그를 선택을 하기 위해 `입력한 문자 길이 - 1`을 인덱스로 활용합니다. 너비 만큼 **커서**의 **left**를 변경할 수 있습니다. **커서**의 **top**은 지정된 `px` 만큼 할당됩니다.

  `onComposition` 관련 이벤트 설정 시 `onKeyUp`, `onKeyDown` 이벤트는 동작하지 않습니다.
  > 관련 이벤트: **onCompositionStart**, **onCompositionUpdate**, **onCompositionEnd**

- **\<input onChange={} />**     

  ```javascript
  onChange={(e) => {
    const txt = e.target.value;
    const generatedSentence = currentTextArr[typingSentenceNum];
    // 작성 문자 길이 제한
    if (generatedSentence.length >= txt.length) setTypingText(txt);
    setTypingText((prev) => prev.slice(0, generatedSentence.length));
  }}
  ```
  `onChange` 이벤트는 누르는 만큼 입력되기 때문에 **커서** 오작동을 발생시킵니다. 이를 위해 입력 길이를 제한합니다. 기존 문자 길이 이상을 입력할 때 **커서 이동**을 방지합니다.    

- **\<input onKeyDown={} />**     
  `onKeyDown`은 키보드 눌림을 감지합니다. 키보드 이벤트는 `e.key`로 구분하여 **Enter**, **Backspace**, **default**로 나뉘어져 있습니다.    
  
  **Enter**, **Backspace** 이벤트는 한영문에서 공동으로 사용됩니다.    

  ```javascript
  // switch case 'Enter'
  onKeyDown={(e) => {
    const generatedSentence = currentTextArr[typingSentenceNum];
    switch (e.key) {
      case 'Enter': {
        if (
           generatedSentence.length === typingtext.length ||
          (generatedSentence[0] === '\n' && typingtext === '')
        ) {
          ...
          isFull = false;

          // 다음 페이지 커서 위치 초기화
          if (sentenceArr.length + 1 === currentTextArr.length) {
            dispatch({ type: 'CURSORMOVE', event: 'Enter', tagTop: 0 });
            break;
          }
          // 커서 아래 이동
          const tagHeight = 25.5;
          dispatch({ type: 'CURSORMOVE', event: 'Enter', tagHeight });
          break;
        } 
        ...
      }
  ```     
  **다음 문장 이동**    
  `Enter`를 눌렀을 때 생성된 문장(**generatedSentence**)과 사용자가 입력한 문장(**typingtext**)의 길이가 동일하다면 **커서 top 위치**를 **tagHeight** 만큼 하단으로, **커서 left 위치**는 `0`으로 초기화 합니다.     
  
  **다음 페이지 이동**    
  `Enter`를 눌렀을 때 현재 페이지에서 생성된 문장(**sentenceArr**)과 사용자가 입력한 문장(**currentTextArr**) 개수가 동일하다면 **커서 top 위치**를 `0`으로, **커서 left 위치**는 `0`으로 초기화 합니다.

  `isFull = false;`는 `onComposition` 이벤트에서 필요한 코드입니다. 줄 바꿈이 되었을 때 **isFull** 변수를 **false**로 초기화 합니다.

  ```javascript
  // switch case 'Backspace'
      case 'Backspace': {
        isFull = false;
        // 커서 이전 이동
        const txt = e.target.value;
        // 현재 문자 인덱스
        const typingtextIdx = txt.length - 1;
        if (typingtextIdx < 0) {
          dispatch({ type: 'CURSORMOVE', event: 'Backspace', tagLeft: 0 });
          break;
        }
        // 태그 선택
        const liTags = document.getElementsByTagName('li');
        const selectedTag = 
          liTags[typingSentenceNum].children[typingtextIdx];
        // 태그 크기
        const tagWidth = selectedTag?.offsetWidth;
        if (!tagWidth) return;
        dispatch({ type: 'CURSORMOVE', event: 'Backspace', tagWidth });
        break;
      }
  ```      
  **문자 삭제**   
  `Backspace`를 눌렀을 때 현재 입력된 마지막 문자 너비(**tagWidth**) 만큼 **커서** 좌측으로 이동시킵니다. 만약 문자 인덱스가 `0` 미만이면 삭제할 문자가 없는 경우이기 때문에 **커서 left 위치**를 `0`으로 초기화 합니다. 

  선택한 태그(**selectedTag**)는 커서가 뒤로 가야 할 너비의 태그여야 합니다. 
  > **Enter**, **default** 부분과 **selectedTag** 변수 선언 코드가 다름으로 유의해야 합니다. 

  `isFull = false;`는 `onComposition` 이벤트에서 필요한 코드입니다. 문자를 삭제했을 때 **isFull** 변수를 **false**로 초기화 합니다.

  ```javascript
  // switch case default
      default: {
        // 영문, 숫자 외 입력 방지(한글 e.key: process)
        if (e.key.length !== 1) return;
        const txt = typingtext;
        // 현재 문자 인덱스
        const typingtextIdx = txt.length - 1;
        // 작성 문자 길이 제한
        if (generatedSentence.length < txt.length + 1) return;
        // 태그 선택
        const liTags = document.getElementsByTagName('li');
        const selectedTag = 
          liTags[typingSentenceNum].children[typingtextIdx + 1];
        // 태그 크기
        const tagWidth = selectedTag.offsetWidth;
        dispatch({ type: 'CURSORMOVE', event: 'Typing', tagWidth });
      }
    }
  }}
  ```
  **영문 숫자 입력**    
  영문, 숫자, 특수문자는 **e.key.length**가 한 자리수로, 해당 문자를 입력했을 때 **default**문을 수행합니다. 입력한 문자열 길이(**typingtext**)가 생성된 문장의 길이(**generatedSentence**) 이상일 때 필요 길이 이상으로 **커서**가 움직이는 것을 방지합니다.     

  생성된 문장보다 입력한 문장 길이가 작을 때 **커서**는 입력한 문자 너비(**tagWidth**) 만큼 우측으로 움직입니다.  
  
  *영문, 숫자, 특수문자를 입력한 경우만 **default** 구문이 동작합니다.*

- **\<input onCompositionStart={} />**    
  `onCompositionStart` 이벤트는 조합형 입력 시작을 감지합니다. 

  ```javascript
  // textInput.jsx <input onCompositionStart={} />
  onCompositionStart={(e) => {
    const txt = e.target.value; // 첫 입력 비어있음
    const generatedSentence = currentTextArr[typingSentenceNum];
    // 현재 문자 인덱스
    const typingtextIdx = txt.length; // 기본 0
    // 작성 문자 길이 제한
    if (generatedSentence.length < txt.length + 1) return (isFull = true);
     if (isFull || typingtextIdx < 0) return;
    // 태그 선택
    const liTags = document.getElementsByTagName('li');
    const selectedTag = 
      liTags[typingSentenceNum].children[typingtextIdx];
    // 태그 크기
    const tagWidth = selectedTag.offsetWidth;
    dispatch({ type: 'CURSORMOVE', event: 'Typing', tagWidth });
  }}
  ```
  **조합형 문자 입력**   
  감지된 문자는 항상 빈 문자로 시작됩니다. **onKeyDown** 이벤트와 인덱스 변수 초기 선언 값이 다릅니다. 조합형 문장(**txt**)이 생성된 문장(**generatedSentence**)보다 길면 **isFull**을 **true**로 할당합니다. **isFull**은 `onComposition` 관련 이벤트 동작을 제한하는 역할을 합니다.   

  `txt.length + 1`은 **txt**가 빈 문자열로 시작하기 때문에 `1`을 더하여 이전에 **isFull** 변수가 **true**로 반환되지 않도록 합니다.

- **\<input onCompositionUpdate={} />**    

  ```javascript
  // textInput.jsx <input onCompositionUpdate={} />
  onCompositionUpdate={(e) => {
    const txt = e.target.value;
    composedText = txt;
  }}
  ```
  **조합형 문자 입력 업데이트**   
  조합형 문자 입력 중을 감지합니다. 문자를 이어서 작성할 때 `onCompositionUpdate`가 동작합니다. 입력한 문자를 **composedText** 변수에 할당합니다.

  **composedText** 변수는 항상 한 글자 이상을 가지고 있습니다.
  
- **\<input onCompositionEnd={} />**    

  ```javascript
  // textInput.jsx <input onCompositionEnd={} />
  onCompositionEnd={(e) => {
    const txtLength = isFull ? typingtext.length : e.target.value.length;
    // 작성 문자 길이 제한
    if (0 > txtLength) return;
    // 이전 문자가 현재 문자 길이보다 클 때
    if (composedText.length > txtLength) {
      // 현재 문자 인덱스
      const typingtextIdx = txtLength;
      // 태그 선택
      const liTags = document.getElementsByTagName('li');
      const selectedTag = liTags[typingSentenceNum].children[typingtextIdx];
      // 태그 크기
      const tagWidth = selectedTag.offsetWidth;
      dispatch({ type: 'CURSORMOVE', event: 'Backspace', tagWidth });
      isFull = false;
    }
    composedText = '';
  }}
  ```
  **조합형 문자 입력 끝**   
  조합형 문자 입력 끝을 감지합니다. 문자가 완성되었을 때 `onCompositionEnd`가 동작합니다. 입력한 문장이 **isFull**이면 문장 최대 길이로 고정하고 아니면 입력한 문장 길이를 **txtLength** 변수에 할당합니다. **composedText**는 항상 문자를 가지고 있습니다. 먼저 입력된 문장(**composedText**) 길이가 수정한 문장 길이(**txtLength**)보다 작으면 **커서**를 뒤로 이동시킵니다.    

  `if (0 > txtLength) return;` 코드는 조합형 첫번째 문자 삭제 예외상황을 처리합니다. `0`을 포함해야 조합형 문자 첫글자를 지우고 **커서**를 이동시킬 수 있습니다. `0`을 포함하지 않는다면 **커서**는 앞으로 한칸 움직인 상태에서 뒤로 한칸 움직이지 않습니다. `onCompositionEnd`가 끝난 이후 **backspace**를 누르면 `onKeyDown`이 적용됩니다.
  
  `onCompositionEnd`은 단독으로 동작할 수 없습니다. `onCompositionStart`가 동작해야 발생합니다. `onCompositionStart`는 조립형 문자를 입력할 때만 동작합니다.

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
    ...
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
      typingtext 
      sentenceArr 
      setTypingText 
      setSentenceArr 
      currentTextArr
      typingSentenceNum 
      setTypingSentenceNum 
    }) {
    ...
    return (
      <input
        ...
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
                ...
                break;
              } ...
            }
          }
        }}
        ...
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
            sentenceArr={sentenceArr}
            setTypingText={setTypingText}
            setSentenceArr={setSentenceArr}
            currentTextArr={pageSheet[pageSheetIdx]}
            typingSentenceNum={typingSentenceNum}
            setTypingSentenceNum={setTypingSentenceNum}
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
  **sentenceArr** 변수는 한 페이지에서 입력한 문장의 배열입니다. 배열 요소가 삽입될 때마다 `useEffect`가 실행됩니다. 마지막 페이지에서 입력한 문장 수가 기존 문장 수와 동일하며 현재 페이지가 마지막이라면 **isFinished** 변수를 `true`로 변환합니다.     
  
  기록된 인자들은 **dispatch** 함수로 할당됩니다. `_app.jsx` 파일에서 작성한 **dispatch** 함수가 실행되어 함수에 할당된 변수들은 초기화 됩니다. 이후 `<ResultPage/>` 컴포넌트 화면에서 측정값이 표시됩니다. 

  **dispatch** 결과값은 `_app.jsx` 파일에서 `Context.Provider`를 적용하여 컴포넌트 전역에서 가져올 수 있습니다. 현재 `_app.jsx` 파일에서 전역 변수로 **dispatch**, **state**를 할당하고 있습니다.


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
    cursor: {
      top: 2,
      left: 0,
    },
  };
  function reducer(state, action) {
    switch (action.type) {
      ...
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
      dispatch({ type: 'RESET' });
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

- **테스트 파일 작성 방법**
  ```js
  // 라이브러리, 프레임워크 파일 import 선언 부분
  import '@testing-library/jest-dom';
  import { render, screen } from '@testing-library/react';

  // 외부 파일 import 선언 부분
  import 컴포넌트명 from '../컴포넌트명';

  // 변수 선언 부분

  // mock 선언 부분
  jest.mock('', () => {})

  describe('(컴포넌트명) (테스트유형) test : ', () => {
    beforeEach(() => {})
    afterEach(() => {})

    test('(테스트명)', () => {})
  })
  ```
  **test** 함수는 **describe** 최하단에서 추가 작성합니다. 이외 **test 환경설정** 함수는 **test** 함수보다 상단에서 작성합니다.


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
### 단위 테스트 (unit)  
- 목적: 각 개별 모듈 또는 함수가 의도된 대로 동작하는지 확인      
- 항목: 태그 존재, 클래스명 일치, 함수 동작 정상 여부   