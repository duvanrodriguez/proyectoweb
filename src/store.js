import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    carrito: [] // Almacena los elementos del carrito
  },
  mutations: {
    // Agregar un artículo al carrito
    agregarAlCarrito(state, { articulo, cantidad }) {
      const item = {
        articulo: articulo,
        cantidad: cantidad
      };
      state.carrito.push(item);
    },
    // Vaciar el carrito
    vaciarCarrito(state) {
      state.carrito = [];
    }
  },
  actions: {
    // Acción para agregar un artículo al carrito
    agregarAlCarrito({ commit }, articulo) {
      commit('agregarAlCarrito', articulo);
    },
    // Acción para vaciar el carrito
    vaciarCarrito({ commit }) {
      commit('vaciarCarrito');
    }
  },
  getters: {
    // Obtener la cantidad total de elementos en el carrito
    totalItemsCarrito(state) {
      return state.carrito.length;
    }
  }
});
