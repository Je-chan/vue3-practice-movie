# 1. 플러그인

- $translate 를 이용해 등록해서 플러그인으로 사용할 수 있다.
- $store, $route, $router 도 일종의 플러그인
- main.js 에서 use 를 통해 플러그인을 사용할 수 있도록 지원한다.
- 플러그인을 사용하는 경우는 보통 자주 사용하는 기능(함수) 등을 저장하기 위한 것

# 2. sass-loader github

- options 에서 additionalData 를 이용해 매번 @import 로 scss 를 불러오지 않아도 필요한 데이터를 받아올 수 있다

# Vuex

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
