<template>
  <main>
    <div class="detalle-articulo">
      <div class="imagen-container">
        <div class="imagenes">
          <img src="imagen1.jpg" alt="Imagen 1">
          <img src="imagen2.jpg" alt="Imagen 2">
          <img src="imagen3.jpg" alt="Imagen 3">
          <img src="imagen4.jpg" alt="Imagen 4">
          <img src="imagen5.jpg" alt="Imagen 5">
        </div>
      </div>
      <div class="info-articulo">
        <h2>{{ articulo.nombre }}</h2>
        <p>{{ articulo.descripcion }}</p>
        <p>Precio: ${{ articulo.precio }}</p>
        <p>Stock disponible: {{ articulo.stock }}</p>
        
        <!-- Apartado de cantidad -->
        <div class="cantidad-container">
          <div class="cantidad">
            <button class="cantidad-btn" @click="decrementarCantidad" :disabled="cantidad <= 1">-</button>
            <input class="cantidad-input" type="number" v-model="cantidad" :min="1" :max="stockRestante">
            <button class="cantidad-btn" @click="incrementarCantidad" :disabled="cantidad >= stockRestante">+</button>
          </div>
          <button @click="agregarAlCarrito" class="comprar-btn" :disabled="cantidad > stockRestante || stockRestante === 0">Agregar al Carrito</button>
        </div>
        <br>
        
        <router-link to="/carrito" @click.native="agregarAlCarrito" class="comprar-btn" :disabled="cantidad > stockRestante || stockRestante === 0">Comprar</router-link>
     </div>
    </div>
  </main>
</template>

<script>
import axios from '../axios';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      articulo: [],
      cantidad: 1, // Inicialmente la cantidad es 1
      props: ['articulo'],
    };
  },
  computed: {
    // Obtener el stock restante desde Vuex
    ...mapGetters(['stockDisponible']),
    stockRestante() {
      return this.stockDisponible(this.articulo.id);
    }
  },
  mounted() {
    const id = this.$route.params.id;
    axios.get(`/detalleArticulo/${id}`)
      .then(response => {
        this.articulo = response.data;
        // Inicializar el stock disponible en Vuex
        this.inicializarStock({ articuloId: this.articulo.id, stock: this.articulo.stock });
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Error al obtener detalles del artículo:', error);
      });
  },
  methods: {
    // Métodos para incrementar y decrementar la cantidad
    incrementarCantidad() {
      if (this.cantidad < this.stockRestante) {
        this.cantidad++;
      }
    },
    decrementarCantidad() {
      if (this.cantidad > 1) {
        this.cantidad--;
      }
    },
    agregarAlCarrito() {
      if (this.cantidad <= this.stockRestante) {
        this.$store.dispatch('agregarAlCarrito', { articulo: this.articulo, cantidad: this.cantidad });
        // eslint-disable-next-line no-console
        console.log('Agregando artículo al carrito...', this.articulo, this.cantidad);
      } else {
        // eslint-disable-next-line no-console
        console.error('No se puede agregar más de la cantidad disponible en stock');
      }
    },
    ...mapActions(['inicializarStock'])
  }
};
</script>

<style scoped>
.detalle-articulo {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 68px;
}

.imagen-container {
  width: 300px;
  height: 300px;
  overflow-x: auto;
  border: 1px solid #ccc; /* Borde para el contenedor de imágenes */
}

.imagenes {
  display: flex;
}

.imagenes img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  margin-right: 10px;
}

.info-articulo {
  max-width: 400px;
}

.cantidad-container {
  display: flex;
  justify-content: center;
}

.cantidad {
  display: flex;
  align-items: center;
}

.cantidad-btn {
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.cantidad-btn:hover {
  background-color: #0056b3;
}

.cantidad-input {
  width: 50px;
  margin: 0 10px;
  text-align: center;
}

.comprar-btn {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-left: 3px;
}

.comprar-btn:hover {
  background-color: #0056b3;
}

</style>
