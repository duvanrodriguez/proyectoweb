import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from './components/Main.vue';
import Articulos from './components/articulos.vue';
import Contacto from './components/usuarios.vue';
import Login from './components/login.vue';
import Registro from './components/registro.vue';
import Perfil from './components/perfil.vue';
import DetalleArticulos from './components/detalleArticulo.vue';
import CrearProducto from './components/crearArticulo.vue';
import CarritoCompras from './components/carritoCompra.vue';
import Trasacciones from './components/transacion.vue';


Vue.use(VueRouter);

const routes = [
  { path: '/', component: Main },
  { path: '/articulos', component: Articulos },
  { path: '/usuarios', component: Contacto },
  { path: '/login', component: Login },
  { path: '/registro', component: Registro },
  { path: '/perfil', component: Perfil},
  { path: '/detalleArticulo/:id', name: 'detalleArticulo', component: DetalleArticulos },
  { path: '/crearArticulo', component: CrearProducto},
  { path: '/carrito', component: CarritoCompras},
  { path: '/transacciones', component: Trasacciones},
];

export default new VueRouter({
  mode: 'history',
  routes
});