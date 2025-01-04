---
title: '웹 애플리케이션 보안: XSS의 개념'
date: '2025-1-4'
tags:
  [
    'XSS',
    'Cross Site Scripting',
    'Reflected XSS',
    'Stored XSS',
    'DOM Based XSS',
    '반사형 XSS',
    '저장형 XSS',
    'DOM 기반 XSS',
  ]
---

## 목차

## XSS (Cross-Site Scripting)란?

웹 애플리케이션에서 발생하는 일반적인 보안 취약점 중 하나이다.  
공격자가 악의적인 스크립트를 삽입하여 피해자의 브라우저에서 실행시키는 공격 방법이다.

OWASP (Open Web Application Security Project)는 웹 애플리케이션 보안을 위한 비영리 조직이다. 다음은 OWASP에서 발표한 **웹 애플리케이션 보안 취약점 목록**으로, 웹 애플리케이션에서 가장 위험하고 흔히 발생하는 보안 취약점을 순위별로 나열한 것이다. 2017년에 있던 Cross-Site-Scripting 카테고리가 2021년에는 Injection이라는 카테고리로 들어갔다.

![img](/images/xss/xss-top10.png)
_출처: [owasp](https://owasp.org/Top10)_

OWASP 깃허브에 2024년 폴더가 있어서 최근 Top 10이 나온 줄 알았는데 2025년 상반기에 발표할 계획이라고 한다.

## XSS 유형

**1. 반사형 XSS(Reflected XSS)**  
사용자가 조작할 수 있는 입력값을 갖는 요청이 즉각적으로 사용자에게 응답되고 이 응답에 사용자의 입력값이 안전하지 않은 방식으로 포함될 때 발생한다.

**2. 저장형 XSS(Stored or Persistent XSS)**  
악성 스크립트가 서버에 저장되어, 해당 페이지를 방문하는 모든 사용자에게 실행된다.

**3. DOM 기반(DOM Based XSS)**  
클라이언트 측 JavaScript 코드에서 발생하며, DOM(Document Object Model)을 통해 공격이 이루어진다.

---

## XSS 공격 실습

### 반사형 XSS(Reflected XSS)

다음은 반사형 XSS의 전체적인 흐름이다.  
![반사형 xss의 흐름](/images/xss/reflected-xss.jpg)

사이트의 취약한 부분을 발견하고 스크립트가 실행될 수 있는 URL을 만들어 공유하면 사용자가 접속하면서 스크립트가 실행되게 된다.

다음은 비슷한 시나리오로 예제를 만들어봤다.  
쿠팡을 예시로 보자면 검색어를 입력할 경우 url 쿼리에 값이 보이고 콘텐츠에 검색어를 표기하고 있다.  
![쿠팡의 검색어 표기](/images/xss/reflected-query.jpg)

간단하게 이런 검색 기능을 만들고 검색 페이지로 넘어가게 만들어봤다.

1. 검색어 입력
   ![검색창에 검색어 입력](/images/xss/reflected-search-input.jpg)
2. 검색 페이지 이동  
   ![검색 페이지 이동 후 화면에 검색어 표기](/images/xss/reflected-search-result.jpg)
   이 취약한 검색 결과 페이지에서는 keyword에 따른 서버의 응답값이 아닌 url의 쿼리 값을 별도의 처리 없이 그대로 검색어로 표기하고 있다.

**악의적인 사용자가 이러한 취약점을 발견했다.**  
검색어로 악성스크립트를 입력한다.

1. 스크립트가 포함된 검색어 입력
   ![검색창에 스크립트가 포함된  검색어 입력](/images/xss/reflected-hacker-search-input.jpg)
2. 검색 페이지 이동
   ![검색 페이지 이동 후 화면에 검색어 표기](/images/xss/reflected-hacker-search-result.jpg)
   keyword에 담긴 스크립트가 그대로 실행되어 버린다.

그럼 악의적인 사용자는 악성 스크립트가 담긴 페이지의 url을 여러 사람에게 공유하여 접속하게 유도한다.  
아래처럼 링크가 보이지 않게 걸어서 메일로 전달할 수도 있고, 게시글에 올려둘 수도 있다.  
[사이트 바로가기]()  
접속하는 사용자 화면에서는 악성스크립트가 실행된다.

---

### 저장형 XSS(Stored XSS)

이번엔 저장형 XSS다. 이번에도 간단한 예시를 만들어봤다.  
**의도)** **게시판을 만드려고 한다. 에디터에 태그를 입력하여 저장하면 그에 맞게 화면에 보여주고 싶다.**
이런 경우 javascript의 `innerHTML`을 사용해서 콘텐츠 div 영역에 넣어줄 수 있겠다.  
Vue의 경우 `v-html`을 사용할 수 있고, React라면 `dangerouslySetInnerHTML`을 사용할 수 있다. 둘다 innerHTML 기반이다.

![입력한 html 태그가 그대로 표현되는 게시판 예시](/images/xss/stored-xss.jpg)
![](/images/xss/stored-example.jpg)

이제 악의적인 사용자는 입력값이 검증이나 정화 작업이 없다는 취약한 점을 확인했다.  
따라서 스크립트를 작성하여 게시글 콘텐츠에 삽입을 시도한다.  
그럼 이 게시글에 접속하면 스크립트가 실행될까?  
![게시글에 스크립트 삽입을 시도](/images/xss/stored-script.jpg)

결과는 다음과 같다.  
제목만 보이고 콘텐츠는 아무것도 보이지 않는다. 개발자 도구에서 봐도 아무것도 없는 것을 볼 수 있다.  
![](/images/xss/stored-result1.jpg)
![](/images/xss/stored-element.jpg)

innerHTML은 code injection과 같은 경우를 방지하기 위해 script태그가 실행되지 않는다.  
자세한 내용은 다음 MDN 참고  
[Element: innerHTML property](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations:~:text=Security%20considerations)

**하지만 javascript를 실행시킬 수 있는 방법은 많다.**

- \<script> 객체를 생성해서 DOM 에 직접적으로 넣기

```js
const script = document.createElement('script');
const text = document.createTextNode("alert('XSS 공격!!!')");

script.appendChild(text);
document.body.append(script);
```

- 이벤트 핸들러 속성

```js
// 유효한 이미지 로드 후
<img src="https://example.com/a.jpg" onload="alert('XSS 공격!!!')"/>

// 이미지 로드 실패 시
<img src=x onload="alert('XSS 공격!!!')"/>

// input 태그에 포커스 될 경우
<input type="text" onfocus="alert('XSS 공격!!!')"/>
```

- 활성 하이퍼 링크  
  javascript: 스키마는 URL 로드 시 자바스크립트 코드를 실행할 수 있게 함

```js
<a href="javascript:alert('XSS 공격!!!')">링크</a>
<iframe src="alert('XSS 공격!!!')"/>
```

- 활성 하이퍼 링크 javascript: 스키마 필터링 시 우회 방법  
  웹사이트에서 javascript: 스키마를 필터하여 막는다면 다음과 같이 필터링을 우회할 수 있다.

브라우저들이 URL을 사용할 때 정규화를 하면서 특수문자가 제거되고, 스키마의 대소문자 통일된다.

```js
// 특수문자를 포함한 우회(\x01, \x04, \t)
<a href="\1\4jAVasC\triPT:alert('XSS 공격!!!')">링크</a>
<iframe src="\1\4jAVasC\triPT:alert('XSS 공격!!!')"/>
```

HTML 태그 속성 내에서는 HTML 인코딩을 사용할 수 있어 XSS 키워드를 인코딩하여 필터링 우회가 가능하다.

```js
// HTML Entity Encoding을 통한 우회
<a href="\1&#4;\J&#97;\v&#x61;sCr\tip&tab;&colon;alert('XSS 공격!!!');">링크</a>
<iframe src="\1&#4;\J&#97;\v&#x61;sCr\tip&tab;&colon;alert('XSS 공격!!!');"/>
```

악의적인 사용자는 위와 같은 방법으로 악성 스크립트가 담긴 요소를 DB에 저장했다.  
![게시글에 악성 스크립트 입력 시도](/images/xss/stored-hacker-input.jpg)

다른 사용자들이 해당 게시글을 보고 링크를 열게 되면 스크립트가 실행된다.  
![](/images/xss/stored-result2.jpg)

---

## DOM 기반(DOM Based XSS)

1. 악의적인 사용자가 클라이언트 단에서 동적으로 구성되는 페이지 파악한다.  
   Sources 탭에서 route가 어떻게 구성되는지 파악하고 동적으로 받는 값이 있는 것을 확인한다.  
   ![](/images/xss/dom-based-source.jpg)

2. 입력 값이 그대로 노출되는 부분 발견했다.  
   ![](/images/xss/dom-route.png)

3. 악성 스크립트 인코딩 하여 url을 만든 후 유포한다.
   ![](/images/xss/dom-encoded.jpg)

---

## XSS 방지를 위한 대책

사용자가 입력한 값을 그대로 사용하는 것은 위험하다.
이러한 값은 검증 및 정화(sanitize)가 필요하다.

**입력값 치환**  
악성 스크립트를 만들 수 있는 특수 문자들을 치환한다.

| ASCII 문자 | 참조 문자 | ASCII 문자 | 참조 문자 |
| :--------: | :-------: | :--------: | :-------: |
|     &      |  \&amp;   |     "      |  \&quot;  |
|     <      |   \&lt;   |     '      |  \&#x27;  |
|     >      |   \&gt;   |     /      |  \&#x2F;  |
|     (      |  \&#40;   |     )      |  \&#41;   |

**innerText나 textContent를 활용해보기**  
입력값을 text로만 사용해도 된다면 innerHTML이 아닌 innerText나 textContent를 사용한다.

![](/images/xss/xss-prevent.jpg)

innerHTML 방식을 꼭 써야한다면?  
DOMPurify와 같은 라이브러리를 통해 HTML 콘텐츠를 안전하게 필터링할 수 있다.

```js
import DOMPurify from 'dompurify';

const safeHTML = DOMPurify.sanitize(userInputHTML);
```

---

**REFERENCE**

- https://owasp.org/Top10
- https://junhyunny.github.io/information/security/dom-based-cross-site-scripting
- https://limvo.tistory.com/32
- https://www.bugbountyclub.com/pentestgym/view/44
- https://medium.com/@bsalwiczek/danger-of-using-v-html-in-vue-applications-see-better-approach-3def415ba32b
- https://html5sec.org
- https://blog.naver.com/sk_shieldus/222902533919
- https://youtu.be/m_b5PLwYtsY?si=a4hpWe1cBOG6OcEA
