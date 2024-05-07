<template>
  <main>
  <div class="carrito">
    <h1>Carrito de Compras</h1>
    <div v-if="carrito.length === 0">
      <p>No hay artículos en el carrito.</p>
    </div>
    <div v-else>
      <div v-for="(item, index) in carrito" :key="index" class="cart-item">
        <div class="image-container">
          <img :src="item.articulo.imagen" :alt="item.articulo.nombre">
        </div>
        <div class="details">
          <h3>{{ item.articulo.nombre }}</h3>
          <p>{{ item.articulo.descripcion }}</p>
          <p>Precio: ${{ item.articulo.precio }}</p>
          <p>Cantidad: {{ item.cantidad }}</p>
        </div>
        <div class="actions">
          <div class="cantidad">
            <button class="cantidad-btn" >-</button>
            <input class="cantidad-input" type="number" >
            <button class="cantidad-btn" >+</button>
          </div>
        </div>
      </div>

      <!-- Sección de prefactura -->
      <div class="prefactura">
        <div class="subtotal">
          Subtotal: ${{ calcularSubtotal() }}
        </div>
        <div class="total">
          Total: ${{ calcularTotal() }}
        </div>
      </div>

      <button class="btn-primary" @click="checkout">Comprar ahora</button>
    </div>  
    <br>
      <button @click="vaciarCarrito">Vaciar Carrito</button>
    </div>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>  
</main>
</template>
  
<script>
  export default {
    computed: {
    carrito() {
      return this.$store.state.carrito;
    }
  },
  methods: {
    vaciarCarrito() {
      this.$store.dispatch('vaciarCarrito');
    },
    calcularSubtotal() {
      return this.carrito.reduce((total, item) => {
        return total + (item.articulo.precio * item.cantidad);
      }, 0);
    },
    calcularTotal() {
      return this.calcularSubtotal();
      // Aquí puedes agregar lógica adicional para calcular impuestos, envío, etc., y sumarlo al subtotal.
    }
  }
};
</script>
  
  <style scoped>
  .cart-item {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 10px;
}

.image-container {
  flex: 0 0 100px; /* Ajusta el tamaño de la imagen según tus necesidades */
}

.image-container img {
  max-width: 100%;
  height: auto;
}

.details {
  flex: 1;
  margin-left: 20px;
}

.actions {
  flex: 0 0 auto;
}
  </style>
  