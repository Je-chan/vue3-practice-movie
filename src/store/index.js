import { createStore } from 'vuex';
import movie from './movie';
import about from './about';
// createStore 를 통해서 스토어를 형성함
export default createStore({
  modules: {
    movie,
  },
});
