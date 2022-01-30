import axios from 'axios';
import _uniqBy from 'lodash/uniqBy';

export default {
  // module 화 해서 사용할 수 있다는 것을 의미하는 namespaced
  namespaced: true,
  // 실제로 취급해야하는 data 를 의미함. 리얼 상태
  state: () => ({
    movies: [],
    message: 'Search for the movie title!',
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
  // 이외의 메소드에서는 변경을 할 수 없다.
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
    },
  },
  // actions: 직접적으로 데이터를 수정할 수 없다. 비동기로 작동한다.
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
