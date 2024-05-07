import Vue from 'vue'
import App from './App.vue'
import axios from './axios';
import router from './routes';
import store from './store';

Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
