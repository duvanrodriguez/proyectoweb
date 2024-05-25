<template>
  <main>
  <div class="transacciones">
    <h1>Detalle de Transacciones</h1>

    <!-- Pre-factura -->
    <div class="prefactura">
        <h2>Pre-factura</h2>
        <p>Factura #: {{ nextFacturaNumero }}</p>
        <p>Fecha de Emisión: {{ currentDate }} </p>
        <!--<p>Fecha de Emisión: {{ new Date(transacciones.fecha_pedido).toLocaleDateString() }}</p>-->
        
      </div>

    <!-- Iterar sobre los pedidos -->
    <h2>Detalle de Pedido</h2>
      <div v-for="(detalle, i) in transacciones" :key="i" class="details">
            <p> fecha de pedido: {{ new Date(detalle.fecha_pedido).toLocaleDateString()  }}</p>
            <h3>{{ detalle.nombre }}</h3>
            <p>{{ detalle.descripcion }}</p>
            <p>Precio: ${{ detalle.precio_unitario }}</p>
            <p>Cantidad: {{ detalle.cantidad }}</p>
      </div>

    

    <!-- Transacciones -->
    <div class="transacciones">
        <h2>Transacciones</h2>
        <p>Subtotal: {{ calcularSubtotal() }}</p>
        <p>Descuento: {{ descuentoTotal() }}</p>
        <p>Total a Pagar: {{ calcularTotal() }}</p>
        <p>Método de Pago:
          <select v-model="transacciones.metodo_pago" class="metodo-pago-select">
            <option value="pse">PSE</option>
            <option value="tarjeta_debito_credito">Tarjeta Débito/Crédito</option>
            <option value="consignacion_corresponsal">Consignación Corresponsal</option>
          </select>
        </p>
        <p>Estado: EN PROCESO</p>
        <p>Fecha: {{ currentDate }}</p>
      </div>

    <!-- Botón para finalizar la compra -->
    <button @click="finalizarCompra" class="btn-finalizar-compra">Finalizar Compra</button>
  </div>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
</main>
</template>
  
  <script>
  import axios from 'axios';
  import jsPDF from 'jspdf';  // Importamos jsPDF para generar el PDF
  import { saveAs } from 'file-saver';
  import { decode } from 'jsonwebtoken'; 
  
  export default {
    data() {
      return {
        transacciones: [], // Aquí almacenaremos las transacciones del usuario
        error: null, // Aquí almacenaremos cualquier error que ocurra durante la solicitud
        facturas: []
      };
    },
    mounted() {
      // Realizar la solicitud al backend para obtener las transacciones del usuario
      this.obtenerTransaccionesUsuario();
      // Realizar GET al backend para obtener las facturas
      this.obtenerFacturas();
      },
      computed: {
        // Computed property para obtener el siguiente id de factura
        nextFacturaNumero() {
          if (this.facturas.length === 0) {
            return 1; // Si no hay facturas, el número de factura será 1
          }
          const lastFactura = Math.max(...this.facturas.map(factura => factura.numero_factura));
          return lastFactura + 1;
        },
        currentDate() {
          return new Date().toLocaleDateString();
        }
      },
      methods: {
        async obtenerTransaccionesUsuario() {
          try {
            const idUsuario = this.$route.params.id;
            
            // Realizar la solicitud al backend para obtener las transacciones del usuario
            const response = await axios.get(`http://localhost:4000/transacionUser/${idUsuario}`);
    
            // Asignar las transacciones recibidas del backend a la variable 'transacciones'
            this.transacciones = response.data;
            // eslint-disable-next-line no-console
            console.log('datos entregados por el back: ', this.transacciones);
          } catch (error) {
            // Manejar cualquier error que ocurra durante la solicitud
            this.error = error.message || 'Error al obtener las transacciones del usuario';
            // eslint-disable-next-line no-console
            console.error('error a obtener la transacion:', error);
          }
        },
        async obtenerFacturas() {
          try {
            const response = await axios.get('http://localhost:4000/listaFactura');
            this.facturas = response.data;
            // eslint-disable-next-line no-console
            console.log('facturas recibidas del backend:', this.facturas);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error al obtener facturas:', error);
          }
        },
        transformData(data) {
          // Transformar los datos en una estructura adecuada para la vista
          const pedidosMap = new Map();

          data.forEach(item => {
            if (!pedidosMap.has(item.idpedidos)) {
              pedidosMap.set(item.idpedidos, {
                idpedidos: item.idpedidos,
                fecha_pedido: item.fecha_pedido,
                estado: item.estado,
                detalles: []
              });
            }

            pedidosMap.get(item.idpedidos).detalles.push({
              cantidad: item.cantidad,
              precio_unitario: item.precio_unitario,
              idproductos: item.idproductos,
              nombre: item.nombre,
              descripcion: item.descripcion,
            });
          });

          return Array.from(pedidosMap.values());
        },
        async finalizarCompra() {
          // Obtener el token del almacenamiento local
          const token = localStorage.getItem('token');
          if (!token) {
            alert('No se encontró el token de usuario.');
            return;
          }
          // Decodificar el token para obtener la información del usuario
          const user = decode(token);

          const facturaData = {
            numero_factura: this.nextFacturaNumero,
            fecha_emision: this.currentDate,
            monto_total: this.calcularTotal(),
            descuento: this.descuentoTotal(),
            metodo_pago: this.transacciones.metodo_pago,
            estado: 'CANCELADO',
            idpedidos: this.transacciones.length > 0 ? this.transacciones[0].idpedidos : null // Asumiendo que todos los items tienen el mismo idpedidos        
          };
          try {
              // Enviar la factura al backend
              await axios.post('http://localhost:4000/guardarFactura', facturaData);
              // eslint-disable-next-line no-console
              console.log('Factura guardada exitosamente');

              // Generar el PDF
              const doc = new jsPDF();
              doc.text(`DARTEC DIGITAL`, 10, 10);
              doc.text(`Tu puente hacia el futuro digital`, 10, 20);
              doc.text(`Factura #: ${facturaData.numero_factura}`, 10, 30);
              doc.text(`Fecha de Emisión: ${facturaData.fecha_emision}`, 10, 40);

              // Información del cliente
              doc.text(`CLIENTE:`, 10, 50);
              doc.text(`Nombre del Usuario: ${user.nombres} ${user.apellidos}`, 10, 60);
              doc.text(`Dirección: ${user.direccion}, ${user.ciudad}`, 10, 70);

               // Agregar los detalles de las transacciones
              let yPosition = 90;
              doc.text(`Detalle de Pedido:`, 10, yPosition);
              yPosition += 10;
              this.transacciones.forEach((detalle, index) => {
                doc.text(`Detalle ${index + 1}:`, 10, yPosition);
                yPosition += 10;
                doc.text(`Nombre: ${detalle.nombre}`, 10, yPosition);
                yPosition += 10;
                doc.text(`Descripción: ${detalle.descripcion}`, 10, yPosition);
                yPosition += 10;
                doc.text(`Precio Unitario: $${detalle.precio_unitario}`, 10, yPosition);
                yPosition += 10;
                doc.text(`Cantidad: ${detalle.cantidad}`, 10, yPosition);
                yPosition += 10;
              });

              // Información de la transacción
              yPosition += 10;
              doc.text(`Transacción:`, 10, yPosition);
              yPosition += 10;
              doc.text(`Monto Total: $${facturaData.monto_total}`, 10, yPosition);
              yPosition += 10;
              doc.text(`Descuento: $${facturaData.descuento}`, 10, yPosition);
              yPosition += 10;
              doc.text(`Método de Pago: ${facturaData.metodo_pago}`, 10, yPosition);
              yPosition += 10;
              doc.text(`Estado: ${facturaData.estado}`, 10, yPosition);

              // Guardar el PDF en la ruta especificada
              const pdfBlob = doc.output('blob');
              saveAs(pdfBlob, `factura_${facturaData.numero_factura}.pdf`);

              // Alerta de éxito y redirección
              alert('Muchas gracias por tu compra');
              setTimeout(() => {
                this.$router.push('/');
              }, 4000);
            } catch (error) {
              // eslint-disable-next-line no-console
              console.error('Error al finalizar la compra:', error);
            }
          },        
        calcularSubtotal() {
        return this.transacciones.reduce((total, item) => {
          return total + (item.precio_unitario * item.cantidad);
        }, 0);
        },
        descuentoTotal() {
          let descuento = 0;
          let totalItems = this.transacciones.reduce((total, item) => {
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
      }
    }
  };
  </script>
  
  <style scoped>
  .transacciones {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .pedido {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
}
.prefactura, .detalle-pedido {
  margin-bottom: 20px;
}

.metodo-pago-select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.btn-finalizar-compra {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-finalizar-compra:hover {
  background-color: #218838;
}

.details {
  flex: 1;
    padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}
  </style>
  