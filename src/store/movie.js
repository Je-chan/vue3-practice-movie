import axios from 'axios';
import _uniqBy from 'lodash/uniqBy';

// movie.js 에서만 사용한다는 의미를 담아서 _ 기호를 사용
const _defaultMessage = 'Search for the movie title!';

export default {
  // module 화 해서 사용할 수 있다는 것을 의미하는 namespaced
  namespaced: true,
  // 실제로 취급해야하는 data 를 의미함. 리얼 상태
  // state 는 할당된 값이 하나의 함수. state 는 하나의 메소드고, 실행되야지만 데이터가 반환되는 구조
  // state 는 하나의 데이터고, 객체와 같은 참조형은 데이터의 불변성이 적용되지 않기 때문에 함수로 만들어서 반환되도록 함
  // 새로 store 로 만들어서 데이터가 중복되지 않도록 한다. 
  // 그러니 꼭 state 는 함수로 만들어서 반환되도록 한다.
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {},
  }),
  // computed
  getters: {
    // 직접적으로 명시를 해줘야 한다.
    // movieIds(state) {
    //   return state.movies.map((movie) => movie.imdbID);
    // },
  },
  // methods
  // mutations: 변이라는 의미. 데이터를 변경시켜주는 역할을 진행
  // 이외의 메소드에서는 state를 변경을 할 수 없다.
  mutations: {
    updateState(state, payload) {
      // ['movies', 'message', 'loading']
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      state.message = payload.message;
      });
    },
    resetMovies(state) {
      state.movies = [];
      state.message = _defaultMessage;
      state.loading = false;
    },
  },
  // actions: 직접적으로 데이터를 수정할 수 없다. 모두 비동기로 동작한다.
  // 첫 번째 인자로 context(함수 작성할 때 이름은 상관 없음) 가 받아와지고 state, getters, commits 가 내장 함수들이다.
  actions: {
    async searchMovies({ state, commit }, { title, type, number, year }) {
      if (state.loading) return;
      commit('updateState', {
        message: '',
        loading: true,
      });
      try {
        const res = await _fetchMovie({
          title,
          type,
          year,
          page: 1,
        });

        const { Search, totalResults } = res.data;

        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID'),
        });
        const total = parseInt(totalResults, 10);
        const pageLength = Math.ceil(total / 10);
        // 추가 요청을 전송
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page++) {
            // number 는 사용자가 영화 몇 개까지 볼것인지를 설정하는 것
            if (page > number / 10) break;
            const res = await _fetchMovie({
              title,
              type,
              year,
              page,
            });
            const { Search } = res.data;
            commit('updateState', {
              movies: [...state.movies, ..._uniqBy(Search, 'imdbID')],
            });
          }
        }
      } catch (message) {
        commit('updateState', {
          movies: [],
          message,
        });
      } finally {
        commit('updateState', {
          loading: false,
        });
      }
    },
    // 단일 영회의 상세 정보를 가져오고 있음
    // context 라는 개념이 첫 번째 인자로 들어온다.
    // 그 안에 데이ㅏ터에 접근할 수 있는 state
    // 변이 메소드를 실행할 수 있는 commit
    // 그외에는 첫 getters 에 접근할 수 있는 getters
    // 다른 Action 을 실행할 수 있는 dispatch 
    // 이 내용들을 첫 번째 인자로 받을 수 있다.
    async searchMovieWithId({ state, commit }, payload) {
      if (state.loading) return;

      commit('updateState', {
        theMovie: {},
        loading: true,
      });
      try {
        const res = await _fetchMovie(payload);
        commit('updateState', {
          theMovie: res.data,
        });
      } catch (err) {
        commit('updateState', {
          theMovie: {},
        });
      } finally {
        commit('updateState', {
          loading: false,
        });
      }
    },
  },
};

function _fetchMovie(payload) {
  const { title, type, year, page, id } = payload;
  const OMDB_API_KEY = '7035c60c';
  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        if (res.data.Error) {
          reject(res.data.Error);
        }
        resolve(res);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
}
