<template>
    <main>
    <div class="login">
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="iniciarSesion" class="formulario">
        <div class="campo">
          <label for="email">Correo electrónico:</label>
          <input type="email" id="email" v-model="usuarios.email" required>
        </div>
        <div class="campo">
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="usuarios.password" required>
        </div>
        <div class="botones">
          <button type="submit" class="boton-iniciar">Iniciar Sesión</button>
        </div>
      </form>
    </div>
</main>
  </template>
  
<script>
import axios from '../axios';

export default {
  data() {
    return {
      usuarios: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    iniciarSesion() {
      // Hacer una solicitud POST al endpoint de inicio de sesión en el backend
      axios.post('/login', this.usuarios)
        .then(response => {
          // Manejar la respuesta del servidor
          console.log(response.data);
        })
        .catch(error => {
          // Manejar errores de la solicitud
          console.error(error);
        });
    }
  }
};
  </script>
  
  <style scoped>
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .formulario {
    width: 300px;
    background-color: #f3f3f3;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .campo {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s;
  }
  
  input:focus {
    border-color: #007bff;
  }
  
  .boton-iniciar {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .boton-iniciar:hover {
    background-color: #0056b3;
  }
  </style>
  