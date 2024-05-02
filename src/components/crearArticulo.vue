<template>
    <main>
    <div class="product-form">
      <h2>Nuevo Producto</h2>
      <form @submit.prevent="crearProducto">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" v-model="nombre" required>
        </div>
        <div class="form-group">
          <label for="descripcion">Descripción:</label>
          <textarea id="descripcion" v-model="descripcion" required></textarea>
        </div>
        <div class="form-group">
          <label for="precio">Precio:</label>
          <input type="number" id="precio" v-model="precio" min="0.01" step="0.01" required>
        </div>
        <div class="form-group">
          <label for="stock">Stock:</label>
          <input type="number" id="stock" v-model="stock" min="0" required>
        </div>
        <div class="form-group">
          <label for="imagen">Imagen:</label>
          <input type="file" id="imagen" @change="handleImagenUpload" accept="image/*">
        </div>
        <button type="submit">Crear Producto</button>
      </form>

      <!-- Alerta de éxito -->
      <div v-if="registoproducto" class="alert alert-success" role="alert">
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
        nombre: '',
        descripcion: '',
        precio: 0,
        stock: 0,
        imagen: null,
        registoproducto: false,
        mensajeProducto: ''
      };
    },
    methods: {
        async crearProducto() {
        // Aquí puedes enviar los datos del producto al servidor para crearlo
        // eslint-disable-next-line no-console
        console.log('Datos del producto:', {
          nombre: this.nombre,
          descripcion: this.descripcion,
          precio: this.precio,
          stock: this.stock,
          imagen: this.imagen
        });

        const formData = new FormData();
        formData.append('nombre', this.nombre);
        formData.append('descripcion', this.descripcion);
        formData.append('precio', this.precio);
        formData.append('stock', this.stock);
        formData.append('imagen', this.imagen);


        const response = await axios.post('/registrarProductos', formData);

        if(Response.status === 201){
            setTimeout(() => {
                this.registoproducto = true;
                this.mensajeProducto = '!producto registrado!!!';
                router.push('/');
            }, 4000);
        }else {
            setTimeout(() => {
                this.registoproducto = false;
                this.mensajeProducto = 'error al registras el producto';
            }, 4000);
            // eslint-disable-next-line no-console
            console.log('error al registrar el producto estado: ', response.status);
        }
      },
      handleImagenUpload(event) {
        // Manejar la subida de la imagen
        this.imagen = event.target.files[0];
      }
    }
  };
  </script>
  
  <style>
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
  