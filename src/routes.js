import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from './components/Main.vue';
import Articulos from './components/articulos.vue';
import Contacto from './components/usuarios.vue';
import Login from './components/login.vue';
import Registro from './components/registro.vue';
import Perfil from './components/perfil.vue';
import Articulos2 from './components/articulosSeccion.vue';
import DetalleArticulos from './components/detalleArticulo.vue';
import CrearProducto from './components/crearArticulo.vue';


Vue.use(VueRouter);

const routes = [
  { path: '/', component: Main },
  { path: '/articulos', component: Articulos },
  { path: '/usuarios', component: Contacto },
  { path: '/login', component: Login },
  { path: '/registro', component: Registro },
  { path: '/perfil', component: Perfil},
  { path: '/articulo2', component: Articulos2 },
  { path: '/detalleArticulo/:id', name: 'detalleArticulo', component: DetalleArticulos },
  { path: '/crearArticulo', component: CrearProducto},
];

export default new VueRouter({
  mode: 'history',
  routes
});