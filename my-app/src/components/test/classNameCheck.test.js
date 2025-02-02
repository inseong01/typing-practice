import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

/*
  classNameCheck 테스트
  
  - 사옹방법
    1. classNameCheck 함수로 검사할 클래스명 문자열 배열 전달
        ㄴ 검사하고자 하는 클래스명 삽입, 컴포넌트에서 중복되는 클래스명 추가 작성 상관 없음
    3. 예외) 모킹 컴포넌트가 있을 때, 작성한 태크에도 className을 작성해야 함 
    **test() 함수로 감싸서 사용 권장**

  - 검사 제외 항목
    : 조건부 className, 띄어쓰기가 포함된 클래스명(첫번째 클래스명으로 검사됨), no role 태그 검사 불가, input type: 'password' 선택 안 됨

  - 에러 설명
    1. "Wrong className is contained in checkClassNames variable"
      잘못된 클래스명이 삽입되었을 때, 검사 개수가 존재 개수보다 많을 때
    2. "Some classNames are not contained in checkClassNames variable"  
      전체 클래스명 개수와 검사 개수가 일치하지 않을 때, 검사 개수가 존재 개수보다 부족할 때
    3. expect(classNameCount.DOM[checkClassNames[i]]).toEqual(selectedDOMTagArr.length); // expect: 1, received: undefined
      띄어쓰기 된 하나의 클래스명을 2개로 나눠 작성했을 때 'id-main res'

  - 에러 해결
      에러 발생 시, 콘솔로그로 해당 에러 메시지 전달 됨
      기존 작성한 클래스명 배열과 DOM에서 존재하는 클래스명 배열을 콘솔 로그에서 확인
      두 배열을 비교하여 기존 클래스명 배열에서 클래스명 추가 또는 삭제
*/

export default function classNameCheck(classNameArr) {
  expect(classNameArr).not.toHaveLength(0);

  let tags = [];
  let checkClassNames = classNameArr;
  expect(checkClassNames.length).not.toEqual(0); // 검증할 className은 존재해야 함

  const roles = [
    'generic', 'link', 'group', 'ariticle', 'complementary', 'blockquote', 'button', 'caption', 'dialog', 'figure', 'form', 'img', 'checkbox', 'textbox', 'main', 'heading', 'paragraph', 'list', 'listitem'
  ];
  for (let i = 0; i < roles.length; i++) {
    try {
      const selectedTags = screen.getAllByRole(roles[i]);
      tags.push(selectedTags);
    } catch (e) {
      continue;
    }
  }

  const allTag = tags.flat()
  expect(allTag.length).not.toEqual(0); // DOM에서 선택된 태그는 없지 않아야 함

  let classNameCount = {
    DOM: {},
    classArr: [],
    total: 0,
  }
  for (let i = 0; i < allTag.length; i++) { // Screen
    if (!allTag[i].className) continue;
    const DOMclassName = allTag[i].className.split(' ')[0].replace(/\s+$/, '');
    classNameCount.DOM[DOMclassName] = ++classNameCount.DOM[DOMclassName] || 1; // 모든 className 개별 개수 측정 
    classNameCount.classArr.push(DOMclassName); // 모든 className 집합 배열
    classNameCount.total = classNameCount.DOM[DOMclassName] && ++classNameCount['total'] // 모든 className 총 개수
  }

  for (let i = 0; i < checkClassNames.length; i++) { // DOM
    const className = checkClassNames[i] ? checkClassNames[i] : null;
    const selectedDOMTagArr = document?.querySelectorAll(`.${className}`);
    const selectedDOMTag = document?.querySelector(`.${className}`);

    if (!selectedDOMTagArr || !selectedDOMTag) { // 해당 className DOM에 없음
      console.log('Current checkClassNames : ', checkClassNames, `(${checkClassNames.length})`, '\n', 'DOM classNames : ', new Set(classNameCount.classArr))
      expect(() => { }).toThrow(`Wrong className is contained in checkClassNames variable`);
    }

    // DOM에서 className 확인 (중복 포함)
    expect(classNameCount.DOM[checkClassNames[i]]).toEqual(selectedDOMTagArr.length);
    // tag, DOM에서 보임 확인
    expect(selectedDOMTag).toBeVisible();
  }

  let checkClassNameCount = 0;
  // checkClassNames 중복 클래스 제외, DOM에서 className 총 개수
  for (let i = 0; i < new Set(checkClassNames).size; i++) {
    const className = checkClassNames[i] ? checkClassNames[i] : null;
    const selectedDOMTagArr = document?.querySelectorAll(`.${className}`);
    checkClassNameCount += selectedDOMTagArr.length;
  }

  if (classNameCount['total'] !== checkClassNameCount) { // 전체 className 개수 일치 판별
    console.log('Current checkClassNames : ', checkClassNames, '\n', 'DOM classNames : ', new Set(classNameCount.classArr))
    expect(() => { }).toThrow(`Some classNames are not contained in checkClassNames variable`);
  }
  // })
}