---
title: 'React 19.2에서의 새로운 기능!'
date: '2025-10-17'
tags: ['React 19.2', 'React conf']
published: true
---

## 목차

## 새로운 React 기능

---

길었던 추석 연휴에 리액트 컨퍼런스가 있었다.  
React나 React Native에 대한 발표가 여러개 있었는데 React 19.2 버전이 나왔고 여기에서 어떤 변화가 생겼는지 알아보았다.

---

### \<Activity />

Activity 컴포넌트는 앱을 활동 단위로 나누고 제어할 수 있는 컴포넌트다.  
기존에는 어떠한 컴포넌트를 조건에 따라 노출시키려고 할 때 다음과 같은 패턴을 사용했다.

```js
// Before
{
  isVisible && <Page />;
}
```

하지만 이 방식에는 단점이 있다.  
상태(isVisible)에 따라서 Page 컴포넌트는 DOM Tree에 붙였다가 완전히 제거되고 한다.  
상태이 자주 바뀌는 상황이라면 리액트는 내부적으로 Page 컴포넌트를 반복적으로 mount하고 unmount해야 한다.  
이는 렌더링 부담으로 이어지게 된다.

하지만 이번에 추가된 Activity 컴포넌트는 좀 다르다.
Activity 컴포넌트는 다음과 같이 사용된다.

```js
// After
<Activity mode={isVisible ? 'visible' : 'hidden'}>
  <Page />
</Activity>
```

hidden과 visible이라는 두 가지 상태를 mode로 사용하여 전환할 수 있다.

`hidden`  
자식 요소를 숨기고, effects를 unmount한다.  
또 React에서 작업할 것이 없을 때까지 모든 업데이트를 연기한다.  
`visible`  
자식 요소를 표시하고, effects를 mount하고 업데이트가 정상적으로 처리되도록 한다.

기존 방식과 다른 점은 기존에는 요소를 숨길 경우 DOM Tree에서 완전히 제거된다는 점이였지만 Avtivity의 hidden은 DOM Tree에는 유지된 채 화면에서 숨길 수 있다.  
따라서 입력필드가 숨겨지더라도 상태를 유지할 수 있기 때문에 다시 화면에 표시했을 때 값을 유지할 수도 있다.

ex) 사이드바가 닫혔다가 열리더라도 입력하던 값, 혹은 카테고리의 토글 상태를 유지할 수 있다.  
ex) 탭 전환 시 이전 탭에서 불러온 데이터를 다시 로드할 필요 없이 표시할 수 있다.

따라서 조건부 렌더링이나 페이지 전환 시 유용하게 사용할 수 있는 기능으로 보인다.

### useEffectEvent

useEffect는 외부 시스템에서 발생하는 일종의 이벤트를 앱 코드에 알려서 동작을 수행하도록 한다.  
예를 들면 다음 코드는 채팅방에 연결하고 알림을 띄운다.

```js {5, 11}
function ChatRoom({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      showNotification('Connected!', theme);
    });
    connection.connect();
    return () => {
      connection.disconnect()
    };
  }, [roomId, theme]);
  // ...
```

이 코드에는 문제가 있다.  
의존성 배열에 포함된 상태가 변경될 때마다 effect함수가 다시 호출되면서 불필요한 연결이 발생하게 된다.  
✔️ roomId가 변경될 때마다 채팅방에 다시 연결하는 것은 올바른 동작이지만  
❌ theme가 변경될 때마다 채팅방에 다시 연결하는 것은 매우 비효율적이다.

![의존성 경고](/images/react19.2/missing-dependency.png)
기존에는 이런 문제를 해결하기 위해 theme를 의존성 배열에서 제거하고 eslint 경고를 비활성화하여 처리했다.  
하지만 theme은 이제 최신 상태를 유지한다고 보기 어렵다.

React 19.2에서 추가된 useEffectEvent 훅은 이 문제를 해결할 수 있다.

```js {2-4, 9}
function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared (Effect Events aren't dependencies)
  // ...
```

위와 같이 event로직을 useEffect와 분리하여 useEffectEvent로 감싼 뒤 useEffect 내부에서 호출한다.  
theme이 사용되는 곳이 분리되었으니 `의존성 이슈도 해결되고 ESLint 규칙도 유지`할 수 있다.

### cacheSignal

cacheSignal은 React 렌더링 생명주기와 외부 비동기 작업(fetch, DB연결 등)과 같은 작업들을  
연결해 더이상 필요하지 않은 작업을 자동으로 취소할 수 있게 해주는 API다.

공식문서에 현재는 서버 컴포넌트에서만 가능하지만 추후 클라이언트 컴포넌트에서도 사용가능 할 것이라고 한다.

![서버컴포넌트 렌더링](/images/react19.2/server-component.png)
보통 서버컴포넌트는 비동기 작업을 완료한 뒤 html을 생성하여 클라이언트로 스트리밍 한다.  
그런데 만약 사용자가 요청이 끝나기 전에 페이지를 이탈한다면?  
그 요청은 더이상 필요 없어지지만 fetch는 계속해서 실행될 것이다.  
이건 불필요한 네트워크 낭비로 이어진다.

이 문제를 해결하기 위해 나온 것이 `cacheSignal`이라고 이해하면 쉽다.

```js
import { cache, cacheSignal } from 'react';
const dedupedFetch = cache(fetch);

async function Component() {
  await dedupedFetch(url, { signal: cacheSignal() });
}
```

이렇게 cache라는 함수로 기존의 fetch를 감싸면 React가 더이상 필요하지 않은 요청이라고 판단할 때 자동으로 요청을 취소할 수 있다.  
👍 불필요한 네트워크 및 DB 리소스 낭비를 방지할 수 있어 애플리케이션의 전반적인 성능을 개선할 수 있게 되었다.

### Performance Tracks

![성능 트랙](/images/react19.2/perf_tracks_dark.png)
다음 추가된 기능은 퍼포먼트 트랙이다.  
React 19.2 버전의 개발자도구 성능 탭에 새로운 트랙이 추가되었다.  
Scheduler와 Components 트랙으로 React 내부의 작업들이 어떤 우선순위로 처리되고 있는지,  
각 컴포넌트가 언제 렌더링 되고 effect가 실행되는지 한눈에 파악할 수 있게 되었다.  
👍 이 트랙들로 성능 병목 구간을 찾을 때 유용하게 활용 가능하여 개발 생산성과 분석 효율성을 높일 수 있게 되었다.

## 새로운 React DOM 기능

리액트 19.2에서 Partial Pre-rendering 이 추가됐다.  
Next.js 14 부터 공식 문서에 실험적 기능으로 추가되어 있었는데 이번에 리액트에서 정식으로 발표한 걸까?

### Partial Pre-rendering

Partial Pre-rendering은 부분 사전 렌더링으로 `앱의 일부를 미리 렌더링하고 나중에 렌더링을 재개하는 기능`이다.  
SSR과 SSG의 장점을 결합한 새로운 렌더링 방식이다.  
![SSR](/images/react19.2/ssr.png)

SSR은 요청이 올 때마다 서버에서 HTML을 렌더링 해준다.

![SSG](/images/react19.2/ssg.png)
SSG는 빌드 시점에 HTML을 생성에서 미리 CDN에 배포해 두는 방식이다.

PPR(Partial Pre-rendering)은 다음과 같이 사용된다.  
prerender라는 함수의 응답을 구조분해할당하여 prelude, postponed 값을 받는다.

두 값의 의미는 다음과 같다.  
`prelude`: 미리 렌더링 가능한 정적 부분  
`postponed`: 이후 렌더링에 필요한 상태를 저장한 값

```js
const { prelude, postponed } = await prerender(<App />, {
  signal: controller.signal,
});

// 나중에 사용하기 위해 postponed 값을 저장
await savePostponedState(postponed);

// Send prelude to client or CDN.
```

prelude는 SSG 처럼 미리 렌더링 가능한 정적인 부분이다.  
postponed는 나중을 위하여 저장해두고 prelude는 렌더링한다.

```js
const postponed = await getPostponedState(request);
const resumeStream = await resume(<App />, postponed);

// Send stream to client.
```

필요한 시점이 오면 저장했뒀던 postponed값을 꺼내와서 렌더링을 재개한다.

웹사이트를 만들 때 목적에 맞에 SSR을 사용할지 SSG를 사용할지 고민하고 사용했었는데 PPR을 잘 활용할 줄 알게 된다면 상황에 따라 최적화된 렌더링 방식을 사용할 수 있을 것 같다.

## 주목할만한 변화

다음은 새로운 기능은 아니고 변화가 있던 점들인데 따로 정리하지는 않았다.

### Batching Suspense Boundaries for SSR

### SSR: Web Streams support for Node

### eslint-plugin-react-hooks v6

### Update the default useId prefix

---

사용하는 라이브러리가 버전업할 때 어떤 기능들이 추가되었는지 알고 있으면 나중에 필요한 상황에 생각날 것 같아서 정리해보았다.

---

**REFERENCE**

- https://react.dev/blog/2025/10/01/react-19-2
