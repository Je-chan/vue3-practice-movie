import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/index.js';

// use 메소드는 플러그인을 적용하고자 할 때 사용
createApp(App).use(router).mount('#app');
