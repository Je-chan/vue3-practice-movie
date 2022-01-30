export default {
  // module 화 해서 사용할 수 있다는 것을 의미하는 namespaced
  namespaced: true,
  // 실제로 취급해야하는 data 를 의미함. 리얼 상태
  state: () => ({
    movies: [],
  }),
  // computed
  getters: {
    // 직접적으로 명시를 해줘야 한다.
    movieIds(state) {
      return state.movies.map((movie) => movie.imdbID);
    },
  },
  // methods
  // mutations: 변이라는 의미. 데이터를 변경시켜주는 역할을 진행
  // 이외의 메소드에서는 변경을 할 수 없다.
  mutations: {
    resetMovies(state) {
      state.movies = [];
    },
  },
  // actions: 직접적으로 데이터를 수정할 수 없다. 비동기로 작동한다.
  // 인자로 context 가 받아와지고 state, getters, commits 가 내장 함수들이다.
  actions: {
    searchMovies({ state, getters, commit }) {},
  },
};
