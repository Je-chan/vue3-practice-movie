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
