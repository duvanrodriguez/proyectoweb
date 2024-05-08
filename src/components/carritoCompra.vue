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
              <button class="cantidad-btn" @click="decrementarCantidad(item)">-</button>
              <input class="cantidad-input" type="number" v-model="item.cantidad" :min="1" :max="item.articulo.stock">
              <button class="cantidad-btn" @click="incrementarCantidad(item)">+</button>
            </div>
          </div>
        </div>

      <!-- Sección de prefactura -->
      <div class="prefactura">
        <div class="subtotal">
          Subtotal: ${{ calcularSubtotal() }}
        </div>
        <div class="descuento" v-if="descuentoTotal() > 0">
            Descuento: ${{ descuentoTotal() }}
          </div>
        <div class="total">
          Total: ${{ calcularTotal() }}
        </div>
      </div>
      <br>
      <button class="btn-primary" @click="checkout">Comprar ahora</button>
    </div>  
    <br>
      <button @click="vaciarCarrito">Vaciar Carrito</button>
    </div>

    <!-- Alerta de éxito -->
    <div v-if="mensajeExitoso" class="alert alert-success" role="alert">
          {{ mensajePedido }}
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
import axios from '../axios';
import { decode } from "jsonwebtoken";
import router from '../routes';


  export default {
    mensajeExitoso: false,
    mensajePedido: '',
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
    descuentoTotal() {
      let descuento = 0;
      let totalItems = this.carrito.reduce((total, item) => {
        return total + item.cantidad;
      }, 0);

      // si el subtotal es mayor a $300 y la cantidad total de elementos en el carrito es mayor a 3
      if (this.calcularSubtotal() > 300 && totalItems > 3) {
        // Calcular el descuento como el 15% del subtotal
        descuento = this.calcularSubtotal() * 0.15;
      }
      return descuento;
    },
    calcularTotal() {
      return this.calcularSubtotal() - this.descuentoTotal();
    },
    incrementarCantidad(item){
        item.cantidad++;
    },
    decrementarCantidad(item){
      if(item.cantidad > 1){
        item.cantidad--;
      }
    },//procesar la compra
    async checkout() {
      // Obtener el token de autenticación almacenado en el frontend
    const token = localStorage.getItem('token');
    // Decodificar el token para obtener la información del usuario, incluido su ID
    const usuario = decode(token);

     // Crear objetos de pedido y detalle de pedido
      const pedido = {
        fecha_pedido: new Date(),
        estado: 'pendiente',
        idusuario: usuario.id,
      };

      const detallePedido = this.carrito.map(item => ({
        cantidad: item.cantidad,
        precio_unitario: item.articulo.precio,
        idproducto: item.articulo.id,
      }));

      const factura = {
        numero_factura: Math.floor(Math.random() * 1000000), // Genera un número de factura único
        fecha_emision: new Date(),
        monto_total: this.calcularTotal(),
        descuento: this.descuentoTotal(),
        metodo_pago: 'pendiente', // o cualquier otro método de pago
        estado: 'pendiente', // o cualquier otro estado predeterminado
      };

  // se hace solicitudes al backend para guardar pedido y detalle de pedido
  try {
        const pedidoResponse = await axios.post('/guardarpedido', pedido);
        const detallePedidoResponse = await axios.post('/guardarDetalle', detallePedido);
        const facturaResponse = await axios.post('/guardarFactura', factura);

        if(pedidoResponse === 201 || detallePedidoResponse === 201 || facturaResponse === 201){
          setTimeout(() => {
            this.mensajeExitoso = true;
            this.mensajePedido = 'se proceso su pedido, te llevaremos a pagar!!';
            router.push('/transacion');
          }, 4000);
        } else{
          setTimeout(() => {
            this.mensajeExitoso = false;
            this.mensajePedido = 'Error al registrar usuario';
          }, 4000);
          // eslint-disable-next-line no-console
          console.error('Error al registrar usuario. Estado:', pedidoResponse.status, detallePedidoResponse.status);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error al procesar el pedido:', error);
      }
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
  