import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue'
import Articulos from './components/articulos.vue';
import DetalleArticulo from './components/detalleArticulo.vue';
import Contacto from './components/usuarios.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: App },
  { path: '/articulos', component: Articulos },
  { path: '/articulos/:id', component: DetalleArticulo },
  { path: '/usuarios', component: Contacto }
];

export default new VueRouter({ routes });