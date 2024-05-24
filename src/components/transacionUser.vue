<template>
    <div class="transacciones">
      <h1>Detalle de Transacciones</h1>
  
      <!-- Pre-factura -->
      <div class="prefactura"> 
        <h2>Pre-factura</h2>
        <p>Factura #: {{  }}</p>
        <p>Fecha de Emisión: {{ }}</p>
        <p>Monto Total: {{  }}</p>
        <p>Descuento: {{  }}</p>
        <p>Método de Pago: {{  }}</p>
        <p>Estado: {{  }}</p>
      </div>
  
      <!-- Detalle de Pedido -->
      <div class="detalle-pedido">
        <h2>Detalle de Pedido</h2>
        <p>Fecha de Pedido: {{ pedido.fecha_pedido }}</p>
        <p>Estado: {{ pedido.estado }}</p>
        <h3>Detalle de Pedidos</h3>
        <ul>
          <li v-for="(detalle, index) in detalles" :key="index">
            Cantidad: {{ detalle.cantidad }} | Precio Unitario: {{ detalle.precio_unitario }} | ID Producto: {{ detalle.idproductos }}
          </li>
        </ul>
      </div>
  
      <!-- Transacciones -->
      <div class="transacciones">
        <h2>Transacciones</h2>
        <p>Monto Total: {{ transaccion.monto_total }}</p>
        <p>Método de Pago: {{ transaccion.metodo_pago }}</p>
        <p>Estado: {{ transaccion.estado }}</p>
        <p>Fecha: {{ transaccion.fecha }}</p>
      </div>
  
      <!-- Botón para finalizar la compra -->
      <button @click="finalizarCompra">Finalizar Compra</button>
    </div>
  </template>
  
<script>
import axios from 'axios';
import { decode } from 'jsonwebtoken'; 

export default {
  data() {
    return {
      transacciones: [], // Aquí almacenaremos las transacciones del usuario
      error: null // Aquí almacenaremos cualquier error que ocurra durante la solicitud
    };
  },
  mounted() {
    // Realizar la solicitud al backend para obtener las transacciones del usuario
    this.obtenerTransaccionesUsuario();
  },
  methods: {
    async obtenerTransaccionesUsuario() {
      try {
        // Obtener el token de autenticación almacenado en el frontend
        const token = localStorage.getItem('token');
        // Decodificar el token para obtener la información del usuario, incluido su ID
        const usuario = decode(token);

        // Realizar la solicitud al backend para obtener las transacciones del usuario
        const response = await axios.get(`/trasaccionUser/${usuario.id}`);

        // Asignar las transacciones recibidas del backend a la variable 'transacciones'
        this.transacciones = response.data;
      } catch (error) {
        // Manejar cualquier error que ocurra durante la solicitud
        this.error = error.message || 'Error al obtener las transacciones del usuario';
      }
    }
  }
};
  </script>
  
  <style scoped>
  .transacciones {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
  }
  
  .prefactura, .detalle-pedido, .transacciones {
    margin-bottom: 20px;
  }
  </style>
  