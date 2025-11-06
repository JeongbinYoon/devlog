---
title: 'Next.js에서 서버 컴포넌트를 렌더링하는 방법'
date: '2025-02-07'
tags: ['Next.js', 'Server component', '서버 컴포넌트', '서버 컴포넌트 렌더링']
published: false
---

## 목차

## 컴포넌트의 정의

컴포넌트란?  
UI를 구성하는 독립적인 단위로 보통 props(데이터)를 인자로 받아 JSX를 return 하는 함수 또는 클래스입니다.

```js {6, 10-15}
<Counter label="카운트 횟수" />;
...

import { useState } from 'react';

const Counter = ({ label }) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>
        {label}: {count}
      </p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};

export default Counter;
```

컴포넌트가 위와 같이 jsx 반환하는 함수라는 건 알겠는데 그러면 **컴포넌트가 렌더링된다는 건 뭘까요?**

## 컴포넌트 렌더링 과정

return된 jsx는 브라우저가 직접 이해하지 못합니다.  
사람 친화적 문법인(읽기 쉬운) jsx는 `Babel`을 통해 브라우저가 이해할 수 있도록 실제 객체로 변환이 됩니다.  
Babel은 JSX를 React.createElement를 호출하여 React Element를 만들고 이건 단순한 JS 객체입니다.

![babel 로고](/images/nextjs-server-component/babel.png)

```js
// React Element
{
  "$$typeof": Symbol(react.element),
  "type": "div",
  "key": null,
  "ref": null,
  "props": {
    "children": [
      {
        "$$typeof": Symbol(react.element),
        "type": "p",
        "key": null,
        "ref": null,
        "props": {
          "children": [
            label,
            ": ",
            count
          ]
        }
      },
      {
        "$$typeof": Symbol(react.element),
        "type": "button",
        "key": null,
        "ref": null,
        "props": {
          "onClick": () => setCount(count + 1),
          "children": "+"
        }
      }
    ]
  }
}
```

React element는 "어떤 태그를 만들지(type)", "어떤 속성(props)이 있는지", "자식(children)이 뭔지"를 표현한 트리 구조 데이터입니다.

![React Element가 DOM이 되는 과정](/images/nextjs-server-component/react_element_to_dom.png)

이제 이 React Element는 React 내부에서 `Fiber 노드로 변환`되는 과정을 거칩니다.  
정적인 객체였던 React Element는 React가 실제 렌더링 과정을 추적하고 관리하기 위한 구조체인 Fiber가 됩니다.
이 Fiber들이 트리 형태를 이룬 것이 Virtual DOM 입니다.

Fiber 트리는 실제 DOM과 1:1 대응되며, 변경이 생기면 "이전 Fiber 트리"와 "새 Fiber 트리"를 비교(diffing)해서 어떤 부분만 업데이트할지 결정합니다.

그리고 바뀐 부분만 실제 DOM에 반영합니다.

아하~ 그러면 **컴포넌트가 jsx라는 것을 반환하고 이것이 결국 실제 DOM에 반영되는 과정이** 렌더링이라는 것을 알게 되었습니다.

그럼 다시 돌아가서 서버 컴포넌트라는 것은 뭘까요?

## 서버 컴포넌트의 개념

![서버 컴포넌트와 클라이언트 컴포넌트](/images/nextjs-server-component/components.png)

## 서버 컴포넌트의 렌더링 과정

## 간단 코드 예시

---

**REFERENCE**
