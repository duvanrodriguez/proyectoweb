<template>
    <main>
    <div class="product-form">
      <h2>Nuevo Producto</h2>
      <form @submit.prevent="crearProducto">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" v-model="productos.nombre" required>
        </div>
        <div class="form-group">
          <label for="descripcion">Descripción:</label>
          <textarea id="descripcion" v-model="productos.descripcion" required></textarea>
        </div>
        <div class="form-group">
          <label for="precio">Precio:</label>
          <input type="number" id="precio" v-model="productos.precio" min="0.01" step="0.01" required>
        </div>
        <div class="form-group">
          <label for="stock">Stock:</label>
          <input type="number" id="stock" v-model="productos.stock" min="0" required>
        </div>
        <!--<div class="form-group">
          <label for="imagen">Imagen:</label>
          <input type="file" id="imagen" @change="handleImagenUpload" accept="imagen/*">
        </div>-->
        <button type="submit">Crear Producto</button>
      </form>

      <!-- Alerta de éxito -->
      <div v-if="registroExitoso" class="alert alert-success" role="alert">
          {{ mensajeProducto }}
        </div>

    </div>
    <br>
    <br>
    <br>
    <br>
</main>
  </template>
  
  <script>
  import axios from '../axios';
  import router from '../routes';

  export default {
    data() {
      return {
        productos:{
          nombre: '',
          descripcion: '',
          precio: '',
          stock: ''
          //imagen: null
        },
        registroExitoso: false,
        mensajeProducto: ''
      };
    },
    methods: {
        async crearProducto() {
          try {
          // Aquí puedes enviar los datos del producto al servidor para crearlo
          // eslint-disable-next-line no-console
          console.log('Datos del producto:', this.productos);

          //const formData = new FormData();
          //formData.append('nombre', this.productos.nombre);
          //formData.append('descripcion', this.productos.descripcion);
          //formData.append('precio', this.productos.precio);
          //formData.append('stock', this.productos.stock);
          //formData.append('imagen', this.productos.imagen);

          const response = await axios.post('/registrarProductos', this.productos);

          if (response.status === 201) {
            this.registroExitoso = true;
            this.mensajeRegistro = 'producto registrado exitosamente!';
              setTimeout(() => {
                  this.registroExitoso = true;
                  this.mensajeRegistro = '';
                  router.push('/');
              }, 4000);
                } else {
                    setTimeout(() => {
                        this.registroExitoso = false;
                        this.mensajeRegistro = 'error al registras el producto';
                    }, 4000);
                    // eslint-disable-next-line no-console
                    console.log('error al registrar el producto estado: ', response.status);
                }
            } catch (error) {
                // Manejo de errores
                // eslint-disable-next-line no-console
                console.error('Error al enviar datos del producto al servidor:', error);
              }
        }/*,
        handleImagenUpload(event) {
        // Manejar la subida de la imagen
        this.productos.imagen = event.target.files[0];
      }*/
    }
  };
  </script>
  
  <style scoped>
  .alert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #28a745; /* Color de fondo verde para la alerta de éxito */
  color: #ffffff; /* Color de texto blanco */
  text-align: center;
  padding: 10px 0;
  z-index: 9999; /* Asegura que la alerta esté por encima de otros elementos */
}

.alert-success {
  background-color: #28a745; /* Color de fondo verde para la alerta de éxito */
}
  .product-form {
    max-width: 400px;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 80px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="number"],
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  textarea {
    height: 100px;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  