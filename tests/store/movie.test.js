import movieStore from '~/store/movie'
import _cloneDeep from 'lodash/cloneDeep'
import axios from 'axios';
describe('stire/movie.js', () => {
  let store;

  beforeEach(() => {
    // movieStore 는 하나의 객체 데이터로 값을 참조형 데이터다
    // 그리고 그 값을 store 에 할당하게 된다면 store 에서 수정하면 원본을 오염시킬 수 있다
    // 그렇게에 복사한 후에 데이터를 할당해주는 것이 중요하다.
    // lodash 에서 깊은 복사를 할 수 있는 것이 존재함
    store = _cloneDeep(movieStore)
    store.state = store.state()
    // 그런데 문제는, mutations, state, getters, actions 는 정의돼 있으나 commit이나 dispatch 는 정의돼있지 않다
    // 이를 해결하기 위해서 가장 기본적으로는 
    // stor.mutations.updateState(store.state, ~~~) 이런식으로 작성할 수 있게다만은
    // 우리가 테스트를 적용하는데 있어서 더 직관적으로 사용하기 위해
    // 테스트 환경에서 따로 정의해주는 과정이 필요하다
    
    store.commit = (name, payload) => {
      store.mutations[name](store.state, payload)
    }
    // actions 는 비동기로 실행되기 떄문에 dispatch 부분을 비동기 함수로 만들어주거나 
    // actions 자체가 비동기이기 때문에 return 키워드를 통해서 반환해줄 수 있다.
    store.dispatch = (name, payload) => {
      const context = {
        state: store.state,
        commit: store.commit,
        dispatch: store.dispatch
      }
      return store.actions[name](context, payload)
    }
  })
  test('영화 데이터를 초기화합니다', () => {
    // resetMovies 라는 변이 메소드를 사용해야 한다
    // 실제 vue 컴포넌트에서 사용한다고 하면 아래와 같이 코드를 작성해야 한다
    // this.$store.commit('movie/resetMovies')
    // 이것을 안 하기 위해서 위에 beforeEach 문을 만든 것
    
    store.commit('updateState',{
      movies: [{
        imdbID: '1'
      }],
      message: 'Hello world',
      loading: true,
    })
    store.commit('resetMovies')
    expect(store.state.movies).toEqual([])
    expect(store.state.message).toBe('Search for the movie title!')
    expect(store.state.loading).toBe(false)
  })

  test('영화 목록을 잘 가져온 경우 데이터를 확인합니다', async () => {
    const res = {
      data: {
        totalResults: '1',
        Search: [
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2021'
          }
        ]
      }
    }
    // mockResolvedValue 메소드는 만약 비동기 함수가 resolve 로 값을 반환하기만 하는 경우,사용할 수 있다.
    // mockRejectedValue 메소드는 만약 비동기가 거부된 상태를 사용하고 싶을 떄 사용하는 것 
    // mockReturnValue 는 특정함수가 동기적으로 반환하는 함수를 사용한다고 하면 이걸 사용할 수 있다.
    axios.get = jest.fn().mockResolvedValue(res)
    await store.dispatch('searchMovies')
    expect(store.state.movies).toEqual(res.data.Search) 
  })

  test('영화 목록을 가져오지 못한 경우 에러 메시지를 확인합니다', async() => {
    const errorMessage = 'Network Error'
    axios.get = jest.fn().mockRejectedValue(new Error(errorMessage))
    await store.dispatch('searchMovies')
    expect(store.state.message).toBe(errorMessage)
  })

  test('영화 아이템이 중복된 경우 고유하게 처리합니다.', async () => {
    const res = {
      data: {
        totalResults: '1',
        Search: [
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2021'
          },
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2021'
          },
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2021'
          }
        ]
      }
    }
    axios.get = jest.fn().mockResolvedValue(res)
    await store.dispatch('searchMovies')
    expect(store.state.movies.length).toBe(1)
  })

  test('단일 영화의 상세 정보를 잘 가져온 경우 데이터를 확인합니다', async () => {
    const res = {
      data: {
        imdbID: '1',
        Title: 'Frozen',
        Poster: 'frozen.jpg',
        Year: '2021'
      }
    }

    axios.get = jest.fn().mockResolvedValue(res)
    await store.dispatch('searchMovieWithId')
    expect(store.state.theMovie).toEqual(res.data)
  })
})