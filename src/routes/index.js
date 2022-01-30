import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './Home';
import Movie from './Movie';
import About from './About';

export default createRouter({
  // Hash 모드
  history: createWebHashHistory(),
  // 페이지들을 구분
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/about',
      component: About,
    },
    {
      path: '/movie/:id',
      component: Movie,
    },
  ],
});
