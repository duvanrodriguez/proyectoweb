<template>
    <div class="carrito">
      <h1>Carrito de Compras</h1>
      <div v-if="carrito.length === 0">
        <p>No hay artículos en el carrito.</p>
      </div>
      <div v-else>
        <ul>
          <li v-for="(item, index) in carrito" :key="index">
            {{ item.nombre }} - Cantidad: {{ item.cantidad }}
          </li>
        </ul>
        <button @click="vaciarCarrito">Vaciar Carrito</button>
      </div>
    </div>
  </template>
  
<script>
  export default {
    data() {
      return {
        carrito: []
      };
    },
    methods: {
    // Método para manejar el evento de agregar al carrito
    agregarAlCarrito(articulo) {
        // eslint-disable-next-line no-console
        console.log('Recibido artículo:', articulo);
      // Verificar si el artículo ya está en el carrito
      const index = this.carrito.findIndex(item => item.id === articulo.id);
      if (index !== -1) {
        // Si el artículo ya está en el carrito, incrementar la cantidad
        this.carrito[index].cantidad += articulo.cantidad;
      } else {
        // Si el artículo no está en el carrito, agregarlo
        this.carrito.push({ ...articulo});
      }
    },
    vaciarCarrito() {
      this.carrito = [];
    }
  }
};
</script>
  
  <style scoped>
  /* Estilos CSS aquí */
  </style>
  