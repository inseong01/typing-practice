import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

// 선택적 className은 테스트 불가
export default function classNameCheck({ compName, classNameArr, argument }) {
  test(`ClassName check`, () => {
    expect(compName).not.toBeUndefined();
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

      if (!selectedDOMTagArr || !selectedDOMTag) { // 해당 className DOM에 없음, 많을 때 오류 발생
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

    if (classNameCount['total'] !== checkClassNameCount) { // 전체 className 개수 일치 판별, 부족할 때 오류 발생
      console.log('Current checkClassNames : ', checkClassNames, '\n', 'DOM classNames : ', new Set(classNameCount.classArr))
      expect(() => { }).toThrow(`Some classNames are not contained in checkClassNames variable`);
    }
  })
}