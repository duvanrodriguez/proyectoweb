import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);



Vue.config.productionTip = false
Vue.prototype.$axios = axios;

new Vue({
  routes,
  render: h => h(App),
}).$mount('#app')
