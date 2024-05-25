import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    carrito: [], // Almacena los elementos del carrito
    stockDisponible: {}, // Estado para manejar el stock disponible de los artículos
  },
  mutations: {
    // Mutación para agregar un artículo al carrito
    agregarAlCarrito(state, { articulo, cantidad }) {
      const itemEnCarrito = state.carrito.find(item => item.articulo.idproductos === articulo.idproductos);
      if (itemEnCarrito) {
        // Asegurarse de no superar el stock disponible
        if (itemEnCarrito.cantidad + cantidad <= state.stockDisponible[articulo.idproductos]) {
          itemEnCarrito.cantidad += cantidad;
        } else {
          // Manejar el caso donde se intenta agregar más cantidad que el stock disponible
           // eslint-disable-next-line no-console
          console.error('Cantidad solicitada supera el stock disponible');
        }
      } else {
        // Si el artículo no está en el carrito, lo agregamos como un nuevo ítem
        if (cantidad <= state.stockDisponible[articulo.idproductos]) {
          state.carrito.push({ articulo, cantidad });
        } else {
          // Manejar el caso donde se intenta agregar más cantidad que el stock disponible
           // eslint-disable-next-line no-console
          console.error('Cantidad solicitada supera el stock disponible');
        }
      }
      // Reduce el stock disponible
      if (state.stockDisponible[articulo.idproductos] !== undefined) {
        state.stockDisponible[articulo.idproductos] -= cantidad;
      } else {
        Vue.set(state.stockDisponible, articulo.idproductos, articulo.stock - cantidad);
      }
    },

    // Mutación para inicializar el stock disponible
    inicializarStock(state, { articuloId, stock }) {
      Vue.set(state.stockDisponible, articuloId, stock);
    },
    // Mutación para vaciar el carrito
    vaciarCarrito(state) {
      state.carrito = [];
    }
  },
  actions: {
    // Acción para agregar un artículo al carrito
    agregarAlCarrito({ commit, state }, { articulo, cantidad }) {
      if (state.stockDisponible[articulo.id] >= cantidad) {
        commit('agregarAlCarrito', { articulo, cantidad });
      } else {
         // eslint-disable-next-line no-console
        console.error('No hay suficiente stock disponible para agregar este artículo');
      }
    },
    // Acción para inicializar el stock disponible
    inicializarStock({ commit }, { articuloId, stock }) {
      commit('inicializarStock', { articuloId, stock });
    },
    // Acción para vaciar el carrito
    vaciarCarrito({ commit }) {
      commit('vaciarCarrito');
    }
  },
  getters: {
    // Obtener la cantidad total de elementos en el carrito
    totalItemsCarrito(state) {
      return state.carrito.reduce((total, item) => total + item.cantidad, 0);
    },
    // Obtener el stock disponible de un artículo específico
    stockDisponible: (state) => (articuloId) => {
      return state.stockDisponible[articuloId] !== undefined ? state.stockDisponible[articuloId] : 0;
    }
  }
});
