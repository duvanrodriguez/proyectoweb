<template>
  <main>
    <h1>Lista de Artículos de Tecnología</h1>
    <div id="articulos-lista">
      <div v-for="producto in productos" :key="producto.id" class="boton-articulo" @click="redirectToDetalleArticulo(producto.idproductos)">
        <div class="articulo-card">
          <img :src="producto.imagen" :alt="'Imagen de ' + producto.nombre">
          <div class="articulo-info">
            <p class="nombre">{{ producto.nombre }}</p>
            <p class="descripcion">{{ producto.descripcion }}</p>
            <p class="precio">$ {{ producto.precio }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
  </template>
  
  <script>
  
  import axios from '../axios';
  //import router from '../routes';
  
  export default {
    data() {
      return {
        productos: []
      };
    },
    methods: {
    redirectToDetalleArticulo(id) {
      this.$router.push({ name: 'detalleArticulo', params: { id: id } });
    }
  },
    mounted(){
      // Realizar GET al backend para obtener los datos de los productos
      axios.get('/listaProductos')
          .then(response => {
            // eslint-disable-next-line no-console
            console.log('Respuesta del servidor:', response);
        
  
            // Asignar los datos de los productos recibidos del backend al array productos
            // eslint-disable-next-line no-console
            this.productos = response.data;
  
            // Imprimir los datos recibidos en la consola
            // eslint-disable-next-line no-console
        console.log('Datos recibidos del backend:', this.productos);
          })
          .catch(error => {
            // Manejar errores de la solicitud
            // eslint-disable-next-line no-console
            console.error('Error al obtener productos:', error);
          });
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para la lista de artículos de tecnología como tarjetas */
  #articulos-lista {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
    margin-bottom: 68px;
  }
  
  .articulo-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    overflow: hidden; /* Oculta cualquier desbordamiento */
  }
  
  .articulo-card img {
    width: 100%;
    height: auto;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  
  .articulo-info {
    padding: 15px;
  }
  
  .articulo-info p {
    margin: 5px 0;
  }
  
  .articulo-info .nombre {
    font-weight: bold;
  }
  
  .articulo-info .precio {
    font-weight: bold;
    color: #007bff;
  }
  
  .articulo-info .disponible {
    color: #28a745;
  }
  
  .articulo-info .no-disponible {
    color: #dc3545;
  }
  </style>
  