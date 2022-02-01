# 1. 플러그인

- $translate 를 이용해 등록해서 플러그인으로 사용할 수 있다.
- $store, $route, $router 도 일종의 플러그인
- main.js 에서 use 를 통해 플러그인을 사용할 수 있도록 지원한다.
- 플러그인을 사용하는 경우는 보통 자주 사용하는 기능(함수) 등을 저장하기 위한 것

# 2. sass-loader github

- options 에서 additionalData 를 이용해 매번 @import 로 scss 를 불러오지 않아도 필요한 데이터를 받아올 수 있다

# 3. Vuex

- store 를 만들어서 모듈들을 관리하는 용도로 사용한다
- state 는 data 처럼 사용하는 사용
- getters 는 computed 처럼 사용되어 state 를 계산된 형태로 사용
  - state 에서 데이터를 가지고 와서 활용만 하는 역할
- mutations 는 methods 에서 state 를 변경하는 로직으로 사용
  - state 에서 데이터를 가지고 와서 직접적인 수정가지도 가능
- actions 는 methods 에서 state 를 변경하지 않는 로직들을 사용
  - state, getters, mutations 들을 가져와서 사용할 수 있음
  - 첫 번째 인자로 받는 context 객체 내부에는 state, getters, commits (mutations), dispatch (actions) 가 존재한다
- Vue 컴포넌트에서 사용할 때는
  - $store.state.모듈명.state명
  - $store.getters['모듈몀/getters명']
  - $store.commit('모둘명/mutatios명')
  - $store.dispatch('모둘명/actions명')
- Vuex helpers

  - mapState, mapGetters 는 computed 에서 사용
  - mapMutations, mapActions 는 method 에서 사용

# 4. Vue Router

- scrollBehavior 를 이용하면 라우팅 했을 때, 스크롤의 위치를 지정할 수 있다.
- RouterView : 변경하는 페이지가 출력될 영역을 의미.
- RouterLink : 페이지 이동을 위한 링크 컴포넌트.

- this.$route : Route(페이지) 정보를 가지는 객체.
  - 속성을 갖고 있어 데이터를 조회
  - fullPath 는 접근된 페이지에 대한 전체 경로
  - params 는 접근된 페이지의 params 에 대한 정보를 지님
- this.$router : Route 를 조작하기 위한 객체
  - 메소드를 갖고 있어서 동작을 일으키는 용도
  - push 를 이용해서 페이지를 이동하는 동작을 만듦
- 더 자세한 내용은 공식문서
  - https://next.router.vuejs.org/api/

# 5. SPA 의 개념

- 전통적인 웹 애플리케이션은 데이터를 요청할 때마다 새롭게 페이지를 로드했다.
- SPA 는 별도의 페이지 로드 없이 데이터를 요청한다.

  - 기존에 존재하던 것과 다른 부분만을 서버에 요청한다 (AJAX 요청)
  - 새롭게 바뀐 데이터만 렌더링하는 방식

- 장점

  1. 빠르고 자연스러운 전환으로 사용자에게 더 나은 경험을 제공한다
  2. 더 적게 요청해서 빠른 렌더링이 가능하다
  3. 컴포넌트 단위로 개발해서 생산성을 향상시킬 수 있다
  4. 분업화가 쉬워진다. 프론트엔드는 프론트엔드로, 백엔드는 백엔드로

- 단점
  1. 최초 로딩이 느리다.
  - 하나의 페이지, index.html 로 동작을 하므로 초반에 가져와야할 데이터가 비교적 많아진다
  - 밑의 두 가지로 개선할 수 있음
    - Lazy Loading(지금 당장 화면에 보이지 않는 컨텐츠는 최대한 늦게 가져와서 보여주고, 당장 보여야할 컨텐츠는 빠르게 보일 수 있도록 하는 것)
    - 브라우저 캐싱
  2. 검색 엔진을 최적화하기가 어렵다.
  - 여러 사이트들의 목록에 들어가려면 SEO 작업이 필요한다
  - 하나의 index.html 밖에 없으므로 세부적으로 분리된 페이지에 대한 상세 정보를 가지고 가기 어려워진다.
  - 개선할 수 있는 방법
    - SSR, Severless Functions
  - 모든 파일이 사용자에게 넘어가서 사용자 브라우저에서 동작하는 것이므로 보안상 취약할 수 있다
    - 중요한 정보들이 사이트에 포함된다면 데이터 노출이 될 수 있기 떄문
    - 비즈니스 로직을 최대한 작성하지 않는 것이 좋다

# 6. Jest

- 전역 함수 (Globals)
  1. beforeAll : 모든 테스트가 시작하기 전에 한 번만 작동
  2. beforeEach : 각각의 테스트가 시작하기 전에 작동하는 함수
  3. afterEach: 각각의 테스타가 동작한 이후에 작동하는 함수
  4. afterAll : 모든 테스트 다음에 한 번만 작동하는 함수
